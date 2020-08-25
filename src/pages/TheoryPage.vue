<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#FFD03E">
            <div class="q-pa-sm" style="color:#009688;font-size:26px" clickable @click="$emit('navigation-toggle')">
                <span class="material-icons">
                    menu
                </span>
            </div>
            <q-toolbar-title>
            </q-toolbar-title>
            <q-space />
            <div class="q-pa-sm" style="color:#009688;font-size:26px " clickable>
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
        <q-toolbar class="q-pa-none q-pb-md" style="height:85px;background-color:#FFD03E" inset>
            <q-img no-default-spinner src="~assets/materi.png" style="width:100%"></q-img>
        </q-toolbar>
    </q-header>

    <q-page class="q-pa-lg">
        <q-card flat class="my-card q-ma-sm" style="margin-right:0px; margin-top:0px;border-radius:10px" clickable @click="$q.notify('Dalam konstruksi')/*$router.push('/theory/modul')*/">
            <q-img no-default-spinner src="~assets/modul-button.png"></q-img>
        </q-card>
        <q-card flat class="my-card q-ma-sm q-pt-sm" style="margin-right:0px; margin-top:0px;border-radius:10px" clickable @click="$router.push('/theory/media')">
            <q-img no-default-spinner src="~assets/media-button.png"></q-img>
        </q-card>
    </q-page>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    components: {
        AnnouncementItemList: () => import('components/announcement/AnnouncementList.vue'),
    },
    computed: {
        ...mapState(["Auth", 'EchoNotification'])
    },
    data() {
        return {
            navigation: false
        }
    },
    created() {
        this.initNotification();
    },
    methods: {
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
        },

    }
}
</script>
