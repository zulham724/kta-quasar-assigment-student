<template>
<q-layout view="hHh Lpr fFf">
    <q-header>
        <q-toolbar style="background-color:#009688">
            <q-btn flat dense icon="arrow_back" style="font-size:20px" @click="$router.back()" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:20px">
                    Komentar
                </div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page-container v-if="post != null">
        <q-page>
            <div style="background-color:#009688;border-radius: 0px 0px 20px 20px;">
                <q-item>
                    <q-item-section top avatar>
                        <q-avatar size="3.5rem">
                            <img :src="`${Setting.storageUrl}/${post.author_id.avatar}`" />
                            <q-skeleton type="circle" size="100%" />
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label class="text-white">
                            {{ post.author_id.name}}
                        </q-item-label>
                        <q-item-label caption class="text-white">
                            {{ post.author_id.role ? post.author_id.role.display_name : null }} {{post.author_id.profile ? post.author_id.profile.school_place : null}}
                        </q-item-label>
                    </q-item-section>
                </q-item>

                <div class="q-px-md">
                    <div style="overflow-wrap:break-word; white-space:pre-line" class="text-white text-body1 q-pt-md" v-html="post.body"></div>
                    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated :navigation="post.files.length > 1" control-color="teal" swipeable class="rounded-borders q-pa-none">
                        <q-carousel-slide style="q-pa-none" v-for="(file, f) in post.files" :key="file.id" :name="f" class="column no-wrap flex-center">
                            <q-img v-if="file.type.includes('image')" :src="`${Setting.storageUrl}/${file.src}`" ratio="1" @click="zoom(file)">
                                <template v-slot:loading>
                                    <div class="bg-grey-2" style="height:100%;width:100%"></div>
                                </template>
                            </q-img>
                            <vue-plyr v-if="file.type.includes('video')" style="width:100vw">
                                <video preload="none" :poster="`${Setting.storageUrl}/${file.value}`" :src="`${Setting.storageUrl}/${file.src}`"></video>
                            </vue-plyr>
                        </q-carousel-slide>
                    </q-carousel>
                    <div caption class="q-py-sm">
                        <div class="row justify-between">
                            <div class="col-4">
                                <span class="material-icons" :style="`font-size:20px;color:${post.liked_count ? 'red' : '#BDBDBD'}`" clickable @click="post.liked_count ? dislike(post.id) : like(post.id)">
                                    {{post.liked_count ? 'favorite' : 'favorite_border'}}
                                </span>
                            </div>
                            <div class="col-8 text-right text-caption text-blue-grey-1">
                                {{post.created_at | moment('from','now')}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="background-color:white;min-height:inherit;">
                <div class="column" style="min-height:0px">
                    <div class="q-py-md q-px-lg col">
                        <div class="q-py-xs" v-for="comment in post.comments" :key="comment.id">
                            <item-component :comment="comment"></item-component>
                        </div>
                    </div>
                </div>
            </div>
        </q-page>
    </q-page-container>

    <q-footer style="padding:5px;background-color:white">
        <q-input dense label="Tulis sesuatu" v-model="comment.value" flat borderless color="teal" bg-color="white" ref="keyboard">
            <template v-slot:after>
                <div>
                    <q-btn flat round icon="send" :loading="loading" :disable="loading" @click="store()" />
                </div>
            </template>
        </q-input>
    </q-footer>
</q-layout>
<!-- <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-teal text-bold">Komentar</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container v-if="post != null">
      <div class="q-pa-md">
        <div class="row q-pb-md">
          <div class="col-2 self-center">
            <q-avatar>
              <q-img :src="`${Setting.storageUrl}/${post.author_id.avatar}`" no-default-spinner />
            </q-avatar>
          </div>
          <div class="col-10 self-center">
            <div class="text-caption text-black text-bold">{{ post.author_id.name }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div
              class="text-caption"
              style="overflow-wrap:break-word; white-space:pre-line"
              v-html="post.body"
              v-linkified
            >
            </div>
          </div>
        </div>
        <div class="row justify-start q-pt-md">
          <div class="text-caption text-grey">
            {{ post.created_at | moment("from", "now") }}
          </div>
        </div>
      </div>
      <q-list bordered class="rounded-borders">
        <q-item-label header>Komentar</q-item-label>

        <item-component
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
        ></item-component>
      </q-list>
    </q-page-container>

    <q-footer style="padding:5px;background-color:white">
      <q-input
        dense
        label="Tulis sesuatu"
        v-model="comment.value"
        flat
        borderless
        color="teal"
        bg-color="white"
        ref="keyboard"
      >
        <template v-slot:after>
          <div>
            <q-btn
              flat
              round
              icon="send"
              :loading="loading"
              :disable="loading"
              @click="store()"
            />
          </div>
        </template>
      </q-input>
    </q-footer>
  </q-layout> -->
</template>

<script>
import ImageZoomer from "components/ImageZoomerComponent.vue";

import {
    mapState
} from "vuex";
export default {
    components: {
        ItemComponent: () => import("components/post/comment/ItemComponent.vue")
    },
    props: {
        postId: null
    },
    computed: {
        ...mapState(["Setting", "Auth", "Post"])
    },
    data() {
        return {
            slide: 0,
            post: null,
            comment: {
                value: ""
            },
            loading: false
        };
    },
    created() {
        // console.log('njir')
        //console.log(this.Auth.auth)
    },
    mounted() {
        this.$store.dispatch("Post/show", this.postId).then(res => {
            this.post = res.data;
        });
        // this.post == null ? this.getPost() : null;
        // this.post.comments ? this.getComment() : null

        this.$refs.keyboard.focus();
    },
    methods: {
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
            this.$store.dispatch("Post/like", this.post.id).then(res => {
                this.post.liked_count = res.data.liked_count
                if (this.post.author_id.id != this.Auth.auth.id) this.sendNotif();
                this.$forceUpdate();
            });
        },
        dislike() {
            this.$store.dispatch("Post/dislike", this.post.id).then(res => {
                this.post.liked_count = res.data.liked_count
                this.$forceUpdate();
            });
        },
        sendLikedNotif() {
            const payload = {
                title: `AGPAII DIGITAL`,
                body: `Komentar anda disukai oleh ${this.Auth.auth.name}`,
                params: {
                    sender_id: this.Auth.auth.id,
                    target_id: this.post.id,
                    target_type: `Post`,
                    text: `Komentar anda disukai oleh ${this.Auth.auth.name}`,
                },
                to: `/topics/user_${this.post.user_id}_post_${this.post.id}_like`
            }
            this.$store.dispatch('Notif/send', payload).then(res => {
                console.log(res)
            })
        },
        getPost() {
            this.$store.dispatch("Post/show", this.postId).then(res => {
                this.post = res.data;
            });
        },
        // getComment() {
        //   this.$store.dispatch("PostComment/index", this.postId).then(res => {
        //     this.comment = res.data.comments
        //     console.log("res data comment: ",this.comment)
        //   });
        // },
        store() {
            this.loading = true;
            const payload = {
                post_id: this.post.id,
                user_id: this.Auth.auth.id,
                value: this.comment.value
            };
            this.$store
                .dispatch("PostComment/store", payload)
                .then(res => {
                    if (this.post.author_id.id != this.Auth.auth.id) this.sendNotif();
                    this.getPost();
                    // this.post.comments.splice(0, 0, res.data);
                    // this.post.comments_like += 1;
                    this.comment.value = "";
                })
                .catch(err => {})
                .finally(() => {
                    this.loading = false;
                });
        },
        sendNotif() {
            const payload = {
                title: `AGPAII DIGITAL`,
                body: `Postingan anda dikomentari oleh ${this.Auth.auth.name}: ${this.comment.value}`,
                params: {
                    sender_id: this.Auth.auth.id,
                    target_id: this.post.id,
                    target_type: `Post`,
                    text: `Postingan anda dikomentari oleh ${this.Auth.auth.name}: ${this.comment.value}`
                },
                to: `/topics/user_${this.post.author_id.id}_post_${this.post.id}_comment`
            };
            this.$store.dispatch("Notif/send", payload).then(res => {
                console.log(res);
            });
        }
    }
};
</script>

<style></style>
