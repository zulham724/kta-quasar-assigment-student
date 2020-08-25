<template>
  <div>
    <q-card>
      <q-card-section class="q-pb-none">
        <q-item class="q-pa-none">
          <q-item-section avatar>
            <q-avatar size="2.5rem">
              <q-skeleton
                type="QAvatar"
                size="100%"
                style="position:absolute"
              />
              <q-img
                style="z-index:1"
                no-default-spinner
                :src="`${Setting.storageUrl}/${post.author_id.avatar}`"
              ></q-img>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <div class="text-weight-bold" style="font-size:14px">
                {{ post.author_id.name }}
              </div>
            </q-item-label>
            <q-item-label caption>
              <div>{{ post.created_at | moment("from", "now") }}</div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-py-xs">
        <div>{{ post.body }}</div>
      </q-card-section>

      <q-card-section class="q-pa-none" v-if="post.files.length">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          :navigation="post.files.length > 1"
          control-color="teal"
          swipeable
          class="rounded-borders q-pa-none"
        >
          <q-carousel-slide
            style="q-pa-none"
            v-for="(file, f) in post.files"
            :key="file.id"
            :name="f"
            class="column no-wrap flex-center"
          >
            <q-img
              v-if="file.type.includes('image')"
              :src="`${Setting.storageUrl}/${file.src}`"
              ratio="1"
              @click="zoom(file)"
            >
              <template v-slot:loading>
                <div class="bg-grey-2" style="height:100%;width:100%"></div>
              </template>
            </q-img>
            <vue-plyr v-if="file.type.includes('video')" style="width:100vw">
              <video
                preload="none"
                :poster="`${Setting.storageUrl}/${file.value}`"
                :src="`${Setting.storageUrl}/${file.src}`"
              ></video>
            </vue-plyr>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>

      <q-card-section class="q-pt-xs q-pb-sm">
        <div class="row full-width" style="color:rgba(0, 0, 0, 0.54)">
          <div class="col-3">
          <div class="row">
            <span
              class="material-icons"
              :style="`font-size:20px;${post.liked_count ? 'color:red' : null}`"
              clickable
              @click="post.liked_count ? dislike() : like()"
            >
              {{post.liked_count ? 'favorite' : 'favorite_border'}}
            </span>
            <span @click="$router.push(`/post/like/${post.id}`)">{{ post.likes_count }} Suka</span>
          </div>
          </div>
          <div
            class="col-4"
            clickable
            @click="$router.push(`/theory/media/comment/${post.id}`)"
          >
            <span class="material-icons" style="font-size:20px">
              comment
            </span>
            {{ post.comments.length }} Komentar
          </div>
          <div class="col-5 text-right">
            <span
              v-if="true"
              class="material-icons"
              style="font-size:20px"
              clickable
              @click="$q.notify('Dalam konstruksi')"
            >
              turned_in
            </span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ImageZoomer from "components/ImageZoomerComponent.vue";

export default {
  props: {
    post: null
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      slide: 0,
      isReadMore: false,
      dialog: false,
      file: null
    };
  },
 methods:{
    sendNotif() {
      const payload = {
        title: `AGPAII DIGITAL`,
        body: `Postingan anda disukai oleh ${this.Auth.auth.name}`,
        params: {
          sender_id: this.Auth.auth.id,
          target_id: this.post.id,
          target_type: `Post`,
          text: `Postingan anda disukai oleh ${this.Auth.auth.name}`
        },
        to: `/topics/user_${this.post.author_id.id}_post_${this.post.id}_like`
      };
      this.$store.dispatch("Notif/send", payload).then(res => {
        console.log(res);
      });
    },
    zoom(file) {
      this.$q
        .dialog({
          component: ImageZoomer,
          parent: this,
          src: file.src
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
    like() {
    this.$store.dispatch("MediaPost/like", this.post.id).then(res => {
      if (this.post.author_id.id != this.Auth.auth.id) this.sendNotif();
      this.$forceUpdate();
    });
  },
  dislike() {
    this.$store.dispatch("MediaPost/dislike", this.post.id).then(res => {
      this.$forceUpdate();
    });
  }
 }
};
</script>
