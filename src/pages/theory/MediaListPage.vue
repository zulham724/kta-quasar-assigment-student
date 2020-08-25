<template>
<div>
    <q-pull-to-refresh @refresh="refresh" color="teal">
        <q-header>
            <q-toolbar style="background-color:#009688">
                <div class="q-pa-sm" style="color:white;font-size:26px" clickable @click="$emit('navigation-toggle')">
                    <span class="material-icons">
                        menu
                    </span>
                </div>
                <q-toolbar-title shrink>
                    <div class="text-weight-medium" style="font-size:18px;color:white">Media Pembelajaran</div>
                </q-toolbar-title>
                <q-space />
                <div class="q-pa-sm" style="color:white;font-size:26px " clickable @click="$q.notify('Dalam konstruksi')/*$router.push('/theory/media/save')*/">
                    <span class="material-icons">
                        archive
                    </span>
                </div>
                <div class="q-pa-sm" style="color:white;font-size:26px " clickable>
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
            <q-toolbar style="background-color:#009688">
                <div class="row q-px-sm q-pb-md q-pt-sm full-width">
                    <div class="col-10">
                        <q-input outlined rounded dense no-caps disable label="Dalam konstruksi" bg-color="white">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-2 text-center">
                        <span class="material-icons" style="color:white;font-size:38px">
                            tune
                        </span>
                    </div>
                </div>
            </q-toolbar>
        </q-header>
        <q-page style="background-color:#009688">
            <q-infinite-scroll @load="onLoad" :offset="250">
                <q-intersection class="q-pb-sm" v-for="post in MediaPost.posts.data" :key="post.id">

                    <media-list-item :post="post"></media-list-item>

                </q-intersection>
            </q-infinite-scroll>
        </q-page>
    </q-pull-to-refresh>

</div>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    components: {
        AnnouncementItemList: () => import('components/announcement/AnnouncementList.vue'),
        MediaListItem: () => import('components/media/MediaListItem.vue')
    },
    computed: {
        ...mapState(["MediaPost", "Setting", "Auth", 'EchoNotification'])
    },
    data() {
        return {
            navigation: false
        }
    },
    created() {
        this.initNotification();
        if (!this.MediaPost.posts.data) {
            this.$store.dispatch("MediaPost/index").catch(res => {
                if (res.response.data.errors["profile.educational_level_id"]) {
                    this.$router.push({
                        name: "accountedit",
                        params: {
                            message: "Silahkan mengisi jenjang terlebih dahulu"
                        }
                    });
                    //this.$q.notify("Harus memilih jenjang terlebih dahulu");
                }
            });
        }
    },
    methods: {
        onLoad(index, done) {
            this.MediaPost.posts.next_page_url ?
                this.$store.dispatch("MediaPost/next").then(res => done()) :
                done();
        },
        refresh(done) {
            this.$store.dispatch("MediaPost/index").then(res => {
                done();
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

}
</script>
