<template>
<q-infinite-scroll @load="onLoad" :offset="250">
    <div v-if="announcementList">
        <div v-for="(item, n) in announcementList" :key="`announcement-${n}`" class="q-py-xs" style="background-color:#E0F2F1">

            <q-intersection style="min-height:50px" v-if="item.type=='App\\Notifications\\CommentedPostNotification' || item.type=='CommentedPostEvent'">
                <announcement-item-post-comment :item="item"></announcement-item-post-comment>
            </q-intersection>
            <q-intersection style="min-height:50px" v-else-if="item.type=='App\\Notifications\\LikedCommentNotification' || item.type=='LikedCommentEvent'">
                <announcement-item-comment-like :item="item"></announcement-item-comment-like>
            </q-intersection>
            <q-intersection style="min-height:50px" v-else-if="item.type=='App\\Notifications\\LikedPostNotification' || item.type=='LikedPostEvent'">
                <announcement-item-post-like :item="item"></announcement-item-post-like>
            </q-intersection>
            <q-intersection style="min-height:50px" v-else-if="item.type=='App\\Notifications\\AssigmentNotification' || item.type=='AssigmentStudentEvent'">
                <announcement-item-assigment :item="item"></announcement-item-assigment>
            </q-intersection>

        </div>
    </div>
    <template v-slot:loading>
        <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
        </div>
    </template>
</q-infinite-scroll>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    components: {
        AnnouncementItemPostComment: () => import('components/announcement/postcomment/AnnouncementItem.vue'),
        AnnouncementItemCommentLike: () => import('components/announcement/commentlike/AnnouncementItem.vue'),
        AnnouncementItemPostLike: () => import('components/announcement/postlike/AnnouncementItem.vue'),
        AnnouncementItemAssigment: () => import('components/announcement/assigment/AnnouncementItem.vue'),
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapState(["Auth", "Setting", "EchoNotification"]),
        announcementList: function () {
            return this.EchoNotification.items.data ? this.EchoNotification.items.data.filter(item => {
                return item.data != '';
            }) : null;
        }
    },
    created() {

    },
    mounted() {
        this.$store.dispatch("EchoNotification/markAsRead");
    },
    methods: {
        onLoad: function (index, done) {
            //alert(this.EchoNotification.items.next_page)
            if (this.EchoNotification.items.next_page_url) {
                this.$store.dispatch("EchoNotification/next").then(res => {
                    done();
                });
            } else done();
        },
    }
}
</script>
