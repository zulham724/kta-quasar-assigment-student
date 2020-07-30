<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#9EC646">
        <div class="q-pa-sm" style="color:white;font-size:26px" clickable @click="navigation = !navigation">
          <span class="material-icons">
            menu
          </span>
        </div>
        <q-toolbar-title>
        </q-toolbar-title>
        <q-space />
          <div class="q-pa-sm" style="color:white;font-size:26px " clickable>
            <span class="material-icons">
              notifications
            </span>
            <q-menu 
              anchor="bottom right"
              self="top right"
              auto-close 
              transition-show="scale"
              transition-hide="scale"
            >
              <q-list style="width:250px;border:2px solid #80CBC4; border-radius:5px">
                <q-item>
                  <q-item-section class="text-center">
                    <div 
                      class="text-weight-bold" 
                      style="font-size:15px"
                    >
                      Pemberitahuan
                    </div>
                  </q-item-section>
                </q-item>
                <div v-for="n in 3" :key="n" class="q-py-xs" style="background-color:#E0F2F1">
                  <announcement-list></announcement-list>
                </div>
                <q-item>
                  <q-item-section class="text-center">
                    <div 
                      class="text-weight-bold" 
                      style="color:#80CBC4;font-size:13px"
                      clickable
                      @click="$router.push('/announcement')"
                    >
                      Lihat Semua
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
      </q-toolbar>
      <q-toolbar class="q-pa-none q-pb-md" style="height:85px;background-color:#9EC646" inset>
        <q-img no-default-spinner src="~assets/diskusi.png" style="width:100%"></q-img>
      </q-toolbar>
      <q-toolbar class="q-px-none" style="background-color:white;min-height:0px;align-items:none">
        <div class="full-width" style="height:100%">
        <q-tabs
          v-model="tab"
          dense
          switch-indicator
          class=""
          active-color="white"
          indicator-color="transparent"
          align="justify"
        >
          <div class="row full-width text-weight-medium">
            <div
              class="col-6"
              style=""
              :style="`${tab == 'forum'? 
                        'background-color:#9EC646;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white': 
                        'background-color:white;color:#9EC646'}`"
            >
              <q-tab
                class="q-px-sm q-py-sm"
                no-caps
                name="forum"
                label="Forum Diskusi"
              />
            </div>
            <div
              class="col-6"
              style=""
              :style="`${tab == 'discuss'? 
                        'background-color:#9EC646;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white': 
                        'background-color:white;color:#9EC646'}`"
            >
              <q-tab
                class="q-px-sm q-py-sm"
                no-caps
                name="discuss"
                label="Diskusi Anda"
              />
            </div>
          </div>
        </q-tabs>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="navigation"
      :width="270"
      :breakpoint="500"
      overlay
      bordered
      content-class="bg-white"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item class="q-pa-md">
            <q-item-section avatar top>
              <q-avatar size="3.6rem">
                <q-img src="~assets/grass-pattern.jpg"></q-img>
              </q-avatar>
            </q-item-section>
            <q-item-section top>
              <q-item-label>
                <div class="text-weight-medium" style="font-size:14px">
                  John nono
                </div>
              </q-item-label>
              <q-item-label style=" color:#F2C94C">
                <span class="material-icons" style="font-size:18px">
                  emoji_events
                </span> 100 points
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                home
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Beranda</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/account')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                person
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Profil</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/assigment')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                assignment
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Kerjakan Soal</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/traininglist')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                edit
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Latihan Mandiri</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/theory')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                class
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Materi</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/post')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                forum
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Diskusi</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/setting')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                settings
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Pengaturan Akun</div>
            </q-item-section>
          </q-item>
          <div class="q-pa-lg text-center">
            <q-btn 
              class="text-weight-regular"
              flat
              rounded
              no-caps
              style="width:90%;font-size:18px;background-color:#4DB6AC;color:white"
              @click="onLogout()"
            >
              <span class="material-icons" style="font-size:30px;color:white;padding-right:5px">
                exit_to_app
              </span> Keluar
            </q-btn>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page class="q-pa-md">
      <q-tab-panels
        v-model="tab"
        animated
        style="height:-webkit-fill-available"
      >
        <q-tab-panel
          class="q-pt-sm q-px-none"
          name="forum"
          style="height:100%;background-color:white"
        >
          <div class="q-px-sm q-pb-md full-width">
            <q-item class="q-pa-none">
              <q-item-section top avatar>
                <q-avatar size="3rem">
                  <q-img no-default-spinner src="~assets/man.png"></q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section top style="width:100">
                <q-item-label>
                  <q-input
                    v-model="random"
                    outlined
                    clearable
                    autogrow
                    style="max-width:100%"
                    color="teal"
                    label="Ada pertanyaan? Coba tanya sama teman-teman lainnya"
                  />
                </q-item-label>
                <q-item-label class="q-pt-xs text-right">
                  <q-btn
                    class="q-px-lg text-center"
                    dense
                    no-caps
                    flat
                    rounded
                    style="color:white;font-size:14px;background-color:#009688"
                  >
                    Kirim
                  </q-btn>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="q-pa-sm" v-for="n in 5" :key="n">
            <item-component></item-component>
          </div>
        </q-tab-panel>
        <q-tab-panel
          class="q-pt-sm q-px-none"
          name="discuss"
          style="height:100%;background-color:white"
        >
          <div class="q-px-sm q-pb-md full-width">
            <q-item class="q-pa-none">
              <q-item-section top avatar>
                <q-avatar size="3rem">
                  <q-img no-default-spinner src="~assets/man.png"></q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section top style="width:100">
                <q-item-label>
                  <q-input
                    v-model="random"
                    outlined
                    clearable
                    autogrow
                    style="max-width:100%"
                    color="teal"
                    label="Ada pertanyaan? Coba tanya sama teman-teman lainnya"
                  />
                </q-item-label>
                <q-item-label class="q-pt-xs text-right">
                  <q-btn
                    class="q-px-lg text-center"
                    dense
                    no-caps
                    flat
                    rounded
                    style="color:white;font-size:14px;background-color:#009688"
                  >
                    Kirim
                  </q-btn>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="q-pa-sm" v-for="n in 5" :key="n">
            <item-component></item-component>
          </div>
        </q-tab-panel>
      </q-tab-panels>
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
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {

  name: 'PostPage',
  components: {
    ItemComponent: () => import("components/post/ItemComponent.vue"),
    AnnouncementList: () =>import('components/announcement/AnnouncementList.vue')
  },
  data() {
    return {
      tab:"forum",
      random:null,
      navigation:false
    };
  },
  computed:{
  	...mapState(['Auth','Setting','Post'])
  },
  created(){
  	if (!this.Post.posts.data) this.$store.dispatch("Post/index");
  },
  methods:{
  	onLoad(index, done) {
      this.Post.posts.next_page_url
        ? this.$store.dispatch("Post/next").then(res => done())
        : done();
    },
    onRefresh(done) {
      this.$store.dispatch("Post/index").then(res => {
        done();
      });
    }
  }
};

</script>
<style lang="css" scoped>
</style>
