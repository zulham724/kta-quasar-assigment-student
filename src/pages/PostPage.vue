<template>
<div>
    <q-pull-to-refresh @refresh="onRefresh">
        <q-header>
            <q-toolbar style="background-color:#9EC646">
                <div class="q-pa-sm" style="color:white;font-size:26px" clickable @click="$emit('navigation-toggle')">
                    <span class="material-icons">
                        menu
                    </span>
                </div>
                <q-toolbar-title> </q-toolbar-title>
                <q-space />
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
            <q-toolbar class="q-pa-none q-pb-none" inset>
                <q-img no-default-spinner src="~assets/diskusi.png" style="width:100%"></q-img>
            </q-toolbar>
            <q-toolbar class="q-px-none" style="background-color:white;min-height:0px;align-items:none">
                <div class="full-width" style="height:100%">
                    <q-tabs v-model="tab" dense switch-indicator class="" active-color="white" indicator-color="transparent" align="justify">
                        <div class="row full-width text-weight-medium">
                            <div class="col-6" :style="
                    `${
                      tab == 'forum'
                        ? 'background-color:#9EC646;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white'
                        : 'background-color:white;color:#9EC646'
                    }`
                  ">
                                <q-tab class="q-px-sm q-py-sm" no-caps name="forum" label="Forum Diskusi" />
                            </div>
                            <div class="col-6" :style="
                    `${
                      tab == 'discuss'
                        ? 'background-color:#9EC646;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white'
                        : 'background-color:white;color:#9EC646'
                    }`
                  ">
                                <q-tab class="q-px-sm q-py-sm" no-caps name="discuss" label="Diskusi Anda" />
                            </div>
                        </div>
                    </q-tabs>
                </div>
            </q-toolbar>
        </q-header>

        <q-page>
            <q-infinite-scroll @load="onLoadCheck" :offset="250" ref="scrollGan">
                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel class="q-pt-sm q-px-none" name="forum" style="background-color:white">
                        <div class="q-px-sm q-pb-xs full-width">
                            <q-item class="q-pa-none">
                                <q-item-section top avatar>
                                    <q-avatar size="3rem">
                                        <q-skeleton type="QAvatar" style="position:absolute" />
                                        <q-img style="z-index:1" :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" no-default-spinner />
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section top>
                                    <q-form ref="form">
                                        <q-item-label>
                                            <q-input v-model="post.body" outlined clearable autogrow style="max-width:100vh" color="teal" placeholder="Ada pertanyaan? Coba tanya di sini" />
                                        </q-item-label>
                                        <q-item-label class="text-right q-pt-none">
                                            <q-btn class="q-px-lg text-center" dense no-caps flat rounded style="color:white;font-size:14px;background-color:#009688" @click="store()" :loading="loading" :disable="loading">
                                                Kirim
                                            </q-btn>
                                        </q-item-label>
                                    </q-form>
                                </q-item-section>
                            </q-item>
                        </div>
                        <div v-if="!this.Post.posts.data" style="width:100%">
                            <q-card flat bordered class="q-mt-sm" style="width:100%" v-for="n in 3" :key="`loading-${n}`">
                                <q-item>
                                    <q-item-section avatar>
                                        <q-skeleton type="QAvatar" animation="fade" />
                                    </q-item-section>

                                    <q-item-section>
                                        <q-item-label>
                                            <q-skeleton type="text" animation="fade" />
                                        </q-item-label>
                                        <q-item-label caption>
                                            <q-skeleton type="text" animation="fade" />
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-skeleton height="200px" square animation="fade" />

                                <q-card-section>
                                    <q-skeleton type="text" class="text-subtitle2" animation="fade" />
                                    <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
                                </q-card-section>
                            </q-card>
                        </div>

                        <q-intersection class="q-pa-xs" style="min-height:10vh;width:100%" v-for="post in Post.posts.data" :key="`forum-${post.id}`">
                            <item-component :post="post"></item-component>
                        </q-intersection>

                        <template v-slot:loading>
                            <div class="row justify-center q-my-md">
                                <q-spinner-dots color="primary" size="40px" />
                            </div>
                        </template>
                    </q-tab-panel>

                    <q-tab-panel class="q-pt-sm q-px-none" name="discuss" style="background-color:white">
                        <div class="q-px-sm q-pb-md full-width">
                            <q-item class="q-pa-none">
                                <q-item-section top avatar>
                                    <q-avatar size="3rem">
                                        <q-skeleton type="QAvatar" style="position:absolute" />
                                        <q-img style="z-index:1" :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" no-default-spinner />
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section top style="width:100">
                                    <q-form ref="form">
                                        <q-item-label>
                                            <q-input v-model="post.body" outlined clearable autogrow style="max-width:100%" color="teal" label="Ada pertanyaan? Coba tanya sama teman-teman lainnya" />
                                        </q-item-label>
                                        <q-item-label class="q-pt-xs text-right">
                                            <q-btn @click="store()" class="q-px-lg text-center" dense no-caps flat rounded style="color:white;font-size:14px;background-color:#009688">
                                                Kirim
                                            </q-btn>
                                        </q-item-label>
                                    </q-form>
                                </q-item-section>
                            </q-item>
                        </div>
                        <!--postingan sendiri-->
                        <q-intersection class="q-pa-xs" style="min-height:10vh;width:100%" v-for="post in Post.ownedposts.data" :key="`forum-${post.id}`">
                            <item-component :post="post"></item-component>
                        </q-intersection>
                    </q-tab-panel>
                </q-tab-panels>
                <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                        <q-spinner-dots color="teal" size="40px" />
                    </div>
                </template>
            </q-infinite-scroll>
        </q-page>

        <!-- <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-bold">Diskusi</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-pull-to-refresh @refresh="onRefresh" color="teal">
      	<q-card>
          <q-card-section>
            <div class="row">
              <div class="col-2 self-center">
                <q-avatar size="lg">
                  <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" no-default-spinner />
                </q-avatar>
              </div>
              <div class="col-10" @click="$router.push('/post/create')">
                <q-input
                  rounded
                  dense
                  outlined
                  label="Diskusi hari ini"
                  readonly
                >
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-infinite-scroll @load="onLoad" :offset="250">
          <div class="q-pt-sm row items-start q-gutter-sm">
            <div v-if="!this.Post.posts.data" style="width:100%">
              <q-card flat bordered class="q-mt-sm" style="width:100%" v-for="n in 3" :key="`loading-${n}`">
                <q-item>
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" animation="fade" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <q-skeleton type="text" animation="fade" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" animation="fade" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-skeleton height="200px" square animation="fade" />

                <q-card-section>
                  <q-skeleton
                    type="text"
                    class="text-subtitle2"
                    animation="fade"
                  />
                  <q-skeleton
                    type="text"
                    width="50%"
                    class="text-subtitle2"
                    animation="fade"
                  />
                </q-card-section>
              </q-card>
            </div>
            <q-intersection
              v-for="post in Post.posts.data"
              :key="post.id"
              :style="
                `min-height: 30vh;width: 100vw`"
            >
              <item-component :post="post"></item-component>
            </q-intersection>
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="teal" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-pull-to-refresh>
    </q-page> -->
    </q-pull-to-refresh>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: "PostPage",
    components: {
        ItemComponent: () => import("components/post/ItemComponent.vue"),
        AnnouncementItemList: () => import('components/announcement/AnnouncementList.vue'),
    },
    data() {
        return {
            editDialog: false,
            maximizedToggle: true,
            tab: "forum",
            random: null,
            navigation: false,
            post: {},
            editPost: {},
            files: [],
            images: [],
            loading: false
        };
    },
    computed: {
        ...mapState(["Auth", "Setting", "Post", 'EchoNotification'])
    },
    created() {
        this.initNotification();
        if (!this.Post.posts.data) this.$store.dispatch("Post/index");
        if (!this.Post.ownedposts.data) this.$store.dispatch("Post/index2");
    },
    methods: {
        store() {
            //alert('asdsa')
            this.$refs.form.validate().then(success => {
                if (success) {
                    this.loading = true;
                    this.$q.notify("Tunggu sebentar");

                    //this.$router.back();
                    let formData = new FormData();
                    this.files.forEach(file => {
                        formData.append("files[]", file);
                    });
                    formData.append("title", "KTA POST");
                    formData.append("body", this.post.body);
                    formData.append("status", "PUBLISHED");
                    formData.append("featured", 0);

                    this.$store
                        .dispatch("Post/store", formData)
                        .then(res => {
                            //this.sendNotif(res.data);
                            this.$store.dispatch("Auth/getAuth");
                            this.$q.notify("Berhasil");
                            this.post.body = "";
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
        },
        onLoad(index, done) {

            this.Post.posts.next_page_url ?
                this.$store.dispatch("Post/next").then(res => done()) :
                done();
        },
        onLoad2(index, done) {
            this.Post.ownedposts.next_page_url ?
                this.$store.dispatch("Post/next2").then(res => done()) :
                done();
        },
        onLoadCheck(index, done) {
            if (this.tab == "discuss") {
                this.onLoad2(index, done);
            } else if (this.tab == "forum") {
                this.onLoad(index, done);
            } else {
                done();
            }
        },
        onRefresh(done) {
            this.$store.dispatch("Post/index").then(res => {
                this.$store.dispatch("Post/index2").then(res => {
                    done();
                })

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

<style lang="css" scoped></style>
