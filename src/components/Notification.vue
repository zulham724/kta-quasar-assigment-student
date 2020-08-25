<template>
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
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    components: {
        //NotFinishedAssigment: () => import("components/assigment/NotFinishedAssigment.vue"),
        AnnouncementItemList: () => import('components/announcement/AnnouncementList.vue'),
    },
    data() {
        return {

        };
    },
    created() {
        this.initNotification();
    },
    computed: {
        ...mapState(["Auth", 'EchoNotification'])
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
        }
    }
};
</script>
