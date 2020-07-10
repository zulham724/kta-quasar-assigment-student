<template>
  <div>
    <q-item clickable v-ripple v-if="this.item != null">
      <q-item-section avatar @click="$router.push(`/user/profile/${item.user.id}`)">
        <q-avatar>
          <q-img :src="`${Setting.storageUrl}/${item.user.avatar}`" no-default-spinner />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <div class="text-caption text-black text-bold" @click="$router.push(`/user/profile/${item.user.id}`)">{{ comment.user.name }}</div>
        </q-item-label>
        <q-item-label caption>
          <div class="text-caption text-black">{{ item.value }}</div>
        </q-item-label>
        <q-item-label caption>
          <div class="row">
            <div class="text-caption text-grey q-pr-md">
              {{item.created_at | moment('from','now')}}
            </div>
            <div class="text-caption text-grey text-bold" v-show="item.likes_count" @click="$router.push(`/post/comment/like/${comment.id}`)">{{comment.likes_count}} suka</div>
          </div>
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-btn
          flat
          size="sm"
          class="q-pt-md"
          round
          :color="item.liked_count ? 'red' : null"
          :icon="item.liked_count ? 'favorite' : 'favorite_border'"
          @click="item.liked_count ? dislike(item.id) : like(item.id)"
        />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    comment: null,
  },
  data() {
    return {
      item: null,
    }
  },
  computed: {
    ...mapState(["Setting",'Auth'])
  },
  created() {
    this.item = this.comment
  },
  methods: {
    like(commentId) {
      this.$store.dispatch("PostComment/index", commentId).then(res => {
        this.$store.dispatch("PostComment/likeComment", commentId).then(res => {
          if(this.item.user_id != this.Auth.auth.id) this.sendNotif();
          this.item = res.data
          this.$forceUpdate();
        });
      });
    },
    dislike(commentId) {
      this.$store.dispatch("PostComment/index", commentId).then(res => {
        this.$store.dispatch("PostComment/dislikeComment", commentId).then(res => {
          this.item = res.data
          this.$forceUpdate();
        });
      });
    },
    sendNotif(){
      const payload = {
        title: `AGPAII DIGITAL`,
        body: `Komentar anda disukai oleh ${this.Auth.auth.name}`,
        params:{
          sender_id: this.Auth.auth.id,
          target_id: this.item.id,
          target_type: `Post`,
          text: `Komentar anda disukai oleh ${this.Auth.auth.name}`,
        },
        to: `/topics/user_${this.item.user_id}_post_${this.item.id}_like`
      }
      this.$store.dispatch('Notif/send',payload).then(res=>{
        console.log(res)
      })
    }
  }
};
</script>

<style></style>
