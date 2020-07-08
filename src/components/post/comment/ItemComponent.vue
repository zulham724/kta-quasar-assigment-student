<template>
  <div>
    <q-item clickable v-ripple v-if="this.Comment != null">
      <q-item-section avatar @click="$router.push(`/user/profile/${Comment.user.id}`)">
        <q-avatar>
          <q-img :src="`${Setting.storageUrl}/${Comment.user.avatar}`" no-default-spinner />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <div class="text-caption text-black text-bold" @click="$router.push(`/user/profile/${Comment.user.id}`)">{{ comment.user.name }}</div>
        </q-item-label>
        <q-item-label caption>
          <div class="text-caption text-black">{{ Comment.value }}</div>
        </q-item-label>
        <q-item-label caption>
          <div class="row">
            <div class="text-caption text-grey q-pr-md">
              {{Comment.created_at | moment('from','now')}}
            </div>
            <div class="text-caption text-grey text-bold" v-show="Comment.likes_count" @click="$router.push(`/post/comment/like/${comment.id}`)">{{comment.likes_count}} suka</div>
          </div>
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-btn
          flat
          size="sm"
          class="q-pt-md"
          round
          :color="Comment.liked_count ? 'red' : null"
          :icon="Comment.liked_count ? 'favorite' : 'favorite_border'"
          @click="Comment.liked_count ? dislike(Comment.id) : like(Comment.id)"
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
      Comment: null,
    }
  },
  computed: {
    ...mapState(["Setting",'Auth'])
  },
  created() {
    this.Comment = this.comment
  },
  methods: {
    like(commentId) {
      this.$store.dispatch("PostComment/index", commentId).then(res => {
        this.$store.dispatch("PostComment/likeComment", commentId).then(res => {
          this.Comment = res.data
          this.$forceUpdate();
        });
      });
    },
    dislike(commentId) {
      this.$store.dispatch("PostComment/index", commentId).then(res => {
        this.$store.dispatch("PostComment/dislikeComment", commentId).then(res => {
          this.Comment = res.data
          this.$forceUpdate();
        });
      });
    }
  }
};
</script>

<style></style>
