<template>
<div>
    <q-pull-to-refresh @refresh="onRefresh">
        <q-header>
            <q-toolbar style="background-color:#2F3E86">
                <div class="q-pa-sm" style="color:#E0E0E0;font-size:26px" clickable @click="$emit('navigation-toggle')">
                    <span class="material-icons">
                        menu
                    </span>
                </div>
                <q-toolbar-title> </q-toolbar-title>
                <q-space />
                <div class="q-pa-sm" style="color:#E0E0E0;font-size:26px " clickable>
                    <q-btn dense flat round icon="notifications" class="q-ml-md">
                        <q-badge v-if="EchoNotification.unread_count>0" color="red" floating>{{EchoNotification.unread_count}}</q-badge>
                    </q-btn>
                    <q-menu anchor="bottom right" self="top right" auto-close transition-show="scale" transition-hide="scale">
                        <q-list style="width:250px;border:2px solid #80CBC4; border-radius:5px">
                            <q-item>
                                <q-item-section class="text-center">
                                    <div class="text-weight-bold" style="font-size:15px">
                                        Pemberitahuan
                                    </div>
                                </q-item-section>
                            </q-item>
                            <announcement-item-list></announcement-item-list>
                            <q-item>
                                <q-item-section class="text-center">
                                    <div class="text-weight-bold" style="color:#009688;font-size:13px" clickable @click="$router.push('/announcement')">
                                        Lihat Semua
                                    </div>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </div>
            </q-toolbar>
            <q-toolbar class="q-pa-none q-pb-md" style="height:85px;background-color:#2F3E86" inset>
                <q-img no-default-spinner src="~assets/kerjakan-soal.png" style="width:100%"></q-img>
            </q-toolbar>
            <q-toolbar class="q-px-none" style="background-color:white;min-height:0px;align-items:none">
                <div class="full-width" style="height:100%">
                    <q-tabs v-model="tab" dense switch-indicator class="" active-color="white" indicator-color="transparent" align="justify">
                        <div class="row full-width text-weight-medium">
                            <div class="col-6" style="" :style="
                    `${
                      tab == 'notfinished'
                        ? 'background-color:#2F3E86;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white'
                        : 'background-color:white;color:#2F3E86'
                    }`
                  ">
                                <q-tab class="q-px-sm q-py-sm" no-caps name="notfinished" label="Belum Selesai" />
                            </div>
                            <div class="col-6" style="" :style="
                    `${
                      tab == 'finished'
                        ? 'background-color:#2F3E86;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white'
                        : 'background-color:white;color:#2F3E86'
                    }`
                  ">
                                <q-tab class="q-px-sm q-py-sm" no-caps name="finished" label="Selesai" />
                            </div>
                        </div>
                    </q-tabs>
                </div>
            </q-toolbar>
        </q-header>

        <q-page class="q-pa-md" style="max-height:20%">
            <q-infinite-scroll @load="onLoad2" :offset="250" ref="scrollGan">
                <q-tab-panels v-model="tab" animated style="height:-webkit-fill-available">
                    <q-tab-panel class="q-pt-sm q-px-none" name="notfinished" style="height:100%;background-color:white" ref="scrollTargetRef">
                        <div ref="scrollTargetRef" style="">

                            <div class="text-center q-pb-sm">
                                <q-btn rounded flat no-caps class="q-py-xs" style="font-size:16px;background-color:#4DB6AC; color:white" @click="search()">
                                    <span class="material-icons" style="font-size:20px;padding-right:5px">
                                        add
                                    </span>
                                    Tambah Paket Soal
                                </q-btn>
                            </div>

                            <!--<div class="q-pa-sm" v-for="n in 5" :key="n">
                  <not-finished-assigment></not-finished-assigment>
                </div>-->

                        </div>
                    </q-tab-panel>
                    <q-tab-panel class="q-pt-sm q-px-none" name="finished" style="height:100%;background-color:white">
                        <div ref="scrollTargetRef2" style="">

                            <div class="text-center q-pb-sm">
                                <q-btn rounded flat no-caps class="q-py-xs" style="font-size:16px;background-color:#4DB6AC; color:white" @click="search()">
                                    <span class="material-icons" style="font-size:20px;padding-right:5px">
                                        add
                                    </span>
                                    Tambah Paket Soal
                                </q-btn>

                            </div>
                            <div v-if="FinishedAssigment.assigments">
                                <q-intersection style="width:100%;min-height:100px" class="q-pa-sm" v-for="assigment in FinishedAssigment.assigments.data" :key="`finishedassigment-${assigment.id}`">
                                    <finished-assigment :assigment="assigment"></finished-assigment>
                                </q-intersection>
                            </div>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
                <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                        <q-spinner-dots color="primary" size="40px" />
                    </div>
                </template>
            </q-infinite-scroll>
        </q-page>
    </q-pull-to-refresh>
</div>
</template>

<script>
import SearchComponent from "components/assigment/SearchComponent";
import {
    mapState
} from "vuex";
export default {
    components: {
        //NotFinishedAssigment: () => import("components/assigment/NotFinishedAssigment.vue"),
        FinishedAssigment: () =>
            import("components/assigment/FinishedAssigment.vue"),
        AnnouncementItemList: () => import('components/announcement/AnnouncementList.vue'),
    },
    data() {
        return {
            tab: "notfinished",
            navigation: false
        };
    },
    created() {
        this.onRefresh();
        this.initNotification();
    },
    computed: {
        ...mapState(["Auth", "FinishedAssigment", 'EchoNotification'])
    },
    methods: {
        onRefresh(done) {
            this.$store.dispatch("FinishedAssigment/index").then(res => {
                if (done) done();
            });
        },
        onLoad(index, done) {
            done();
        },
        onLoad2(index, done) {
            if (this.FinishedAssigment.assigments) {
                this.FinishedAssigment.assigments.next_page_url ?
                    this.$store.dispatch("FinishedAssigment/next").then(res => done()) :
                    done();
            } else {
                done();
            }
            //this.$refs.scrollGan.resume();
        },
        search() {
            this.$q
                .dialog({
                    component: SearchComponent,
                    parent: this,
                    text: "something"
                })
                .onOk(() => {
                    console.log("OK");
                })
                .onCancel(() => {
                    console.log("Cancel");
                })
                .onDismiss(() => {
                    console.log("Called on OK or Cancel");
                });
        },
        onLogout() {
            this.$router.push("/login").then(() => {
                this.$store.dispatch("Auth/logout");
            });
        },
        initNotification: function () {
            this.loading = true;
            if (!this.EchoNotification.items.data) {
                this.onRefreshNotification();
            } else this.loading = false;
        },
        onRefreshNotification: function (done) {
            this.loading = true;
            this.$store.dispatch('EchoNotification/index').finally(() => {
                this.loading = false
                if (done) done();
            })
        }
    }
};
</script>
