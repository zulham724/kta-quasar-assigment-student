<template>
<div>
    <q-header>
        <q-toolbar style="background-color:white">
            <div class="q-pa-sm" style="color:#009688;font-size:26px" clickable @click="$emit('navigation-toggle')">
                <span class="material-icons">
                    menu
                </span>
            </div>
            <q-toolbar-title>
                <div class="text-body1 text-bold">Home</div>
            </q-toolbar-title>
            <q-space />
            <div class="q-pa-sm" style="color:#009688;font-size:26px " clickable>
                <q-btn dense color="teal" round icon="notifications" class="q-ml-md">
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
    </q-header>

    <q-page class="q-pt-sm q-pb-md">
        <q-item class="q-px-md q-pb-sm" style="padding-top:0px">
            <q-item-section avatar clicable @click="$router.push('/account')">
                <q-avatar round size="5rem" v-if="Auth.auth">
                    <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" no-default-spinner />
                </q-avatar>
            </q-item-section>
            <q-item-section top clicable @click="$router.push('/account')">
                <q-item-label class="q-mt-none">
                    <div class="text-body1 text-weight-regular" style="font-size:20px">
                        Assalamualaikum
                    </div>
                </q-item-label>
                <q-item-label v-if="Auth.auth">
                    <div class="q-mt-none text-h6 text-weight-bold" style="font-size:30px">
                        {{ Auth.auth.name }}
                    </div>
                </q-item-label>
                <q-item-label class="q-mt-none" style="color:#F2C94C">
                    <span class="material-icons" style="font-size:22px">
                        emoji_events
                    </span>
                    0 points
                </q-item-label>
            </q-item-section>
        </q-item>
        <div class="row full-width text-center q-pa-md">
            <div class="col-4 q-pr-sm">
                <q-btn rounded dense class="q-px-sm text-weight-regular" no-caps style="width:100%;font-size:16px;color:white" color="teal" @click="$q.notify('Dalam konstruksi')/*$router.push('/ranking')*/">
                    <span class="material-icons" style="font-size:20px;color:#FFD03E;padding-right:5px">
                        emoji_events
                    </span>
                    Ranking
                </q-btn>
            </div>
            <div class="col-4 q-px-xs">
                <q-btn rounded dense class="q-px-sm text-weight-regular" no-caps style="width:100%;font-size:16px;color:white" color="teal" @click="()=>{
              //$q.notify('Dalam konstruksi')
              $router.push('/statistic')
              }/*$router.push('/statistic')*/">
                    <span class="material-icons" style="font-size:20px;color:#FFD03E;padding-right:5px">
                        show_chart
                    </span>
                    Statistik
                </q-btn>
            </div>
            <div class="col-4 q-pl-sm ">
                <!--<q-select
            outlined
            rounded
            dense
            color="teal"
            bg-color="white"
            v-model="model"
            style="width:100%"
            :options="options"
            map-options
            label="Semua"
          >
          </q-select>-->
            </div>
        </div>
        <div class="row q-px-md">
            <div class="col-6">
                <q-card flat class="my-card q-ma-sm" style="margin-left:0px; margin-top:0px" clickable @click="$router.push('/assigment')">
                    <q-img no-default-spinner src="~assets/kerjakan-soal-button.png"></q-img>
                </q-card>
            </div>
            <div class="col-6">
                <q-card flat class="my-card q-ma-sm" style="margin-right:0px; margin-top:0px" clickable @click="$router.push('/traininglist')">
                    <q-img no-default-spinner src="~assets/latihan-mandiri-button.png"></q-img>
                </q-card>
            </div>
            <div class="col-6">
                <q-card flat class="my-card q-ma-sm" style="margin-left:0px; margin-top:0px" clickable @click="$router.push('/post')">
                    <q-img no-default-spinner src="~assets/diskusi-button.png"></q-img>
                </q-card>
            </div>
            <div class="col-6">
                <q-card flat class="my-card q-ma-sm" style="margin-right:0px; margin-top:0px" clickable @click="$router.push('/theory')">
                    <q-img no-default-spinner src="~assets/materi-button.png"></q-img>
                </q-card>
            </div>
        </div>
        <!--<q-item class="q-py-md">
        <q-item-section>
          <q-item-label>
            <div class="text-h6 text-weight-bold" style="color:#009688">
              Lanjutkan
            </div>
          </q-item-label>
          <q-item-label caption>
            <div>Masih ada soal yang belum kelar, yuk kerjain!</div>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            class="text-weight-regular"
            rounded
            no-caps
            color="teal"
            label="Lihat Semua"
            @click="$router.push('/assigment')"
          >
          </q-btn>
        </q-item-section>
      </q-item>
      <q-item style="padding:0px">
        <q-scroll-area
          horizontal
          style="height: 190px; width: 100%;"
          class="bg-white rounded-borders"
        >
          <div class="row no-wrap q-pa-sm">
            <div v-for="n in 4" :key="n" style="width: 150px" class="">
              <new-assigment></new-assigment>
            </div>
          </div>
        </q-scroll-area>
      </q-item>-->
        <q-item>
            <q-item-section>
                <q-item-label>
                    <div class="text-h6 text-weight-bold" style="color:#009688">
                        Tantangan Harian
                    </div>
                </q-item-label>
                <q-item-label caption>
                    <div>Kerjakan tantangannya, dapatkan pointnya</div>
                </q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-btn class="text-weight-regular" rounded no-caps color="teal" label="Lihat Semua" @click="$router.push('/dailytask')">
                </q-btn>
            </q-item-section>
        </q-item>
        <q-item style="padding:0px">
            <q-scroll-area horizontal style="height: 200px; width: 100%;" class="bg-white rounded-borders">
                <div class="row no-wrap q-pa-sm">
                    <div v-for="(item, n) in Achievement.items" :key="n" style="width: 150px" class="">
                        <daily-task :item="item"></daily-task>
                    </div>
                </div>
            </q-scroll-area>
        </q-item>
    </q-page>

    <!-- <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      autoplay
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      height="25vh"
    >
      <q-carousel-slide
        :name="1"
        img-src="~assets/1.png"

      />
      <q-carousel-slide
        :name="2"
        img-src="~assets/3.png"

      />
      <q-carousel-slide
        :name="3"
        img-src="~assets/2.png"
      />
    </q-carousel> -->

    <!-- <div class="q-pa-md">
      <div class="row q-mb-md">
        <div class="col-12">
          <q-btn-group style="width:100%" spread>
            <q-btn dense push>
              <template v-slot:default>
                <div>
                  <div class="text-caption text-teal"><q-icon name="timeline" /> Ranking</div>
                </div>
              </template>
            </q-btn>
            <q-btn dense push>
              <template v-slot:default>
                <div>
                  <div class="text-caption text-teal"><q-icon name="visibility" /> Analisis</div>
                </div>
              </template>
            </q-btn>
            <q-btn dense push>
              <template v-slot:default>
                <div>
                  <div class="text-caption text-teal"><q-icon name="update" /> Jadwal</div>
                </div>
              </template>
            </q-btn>
          </q-btn-group>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh" @click="search()">
            <q-icon name="mdi-puzzle" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Kerjakan soal
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh" @click="$router.push('/post')">
            <q-icon name="mdi-feather" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Ruang diskusi
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh" @click="$router.push({name:'traininglist'})">
            <q-icon name="mdi-timer" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Latihan mandiri
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh">
            <q-icon name="mdi-magnify" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Cari Materi
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh" @click="$router.push('/account')">
            <q-icon name="mdi-account" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Profil
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh" @click="$router.push('/history')">
            <q-icon name="mdi-poll" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Riwayat
            </q-card-section>
          </q-card>     
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="text-body1">Tantangan harian</div>
        </div>
        <div class="col-12">
          <q-list bordered separator>
            <div v-for="(daily, e) in items" :key="e">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon :style="daily.value == daily.limit ? 'color:#ffcc00' : 'color:teal'" name="emoji_events" style="font-size:4em" />
                </q-item-section>
                <q-item-section>
                  <div class="row justify-between">
                    <div class="text-subtitle2" style="font-size:12px">{{ daily.description}}</div> 
                    <div :style="`${daily.value == daily.limit? 'visibility:visible' : 'visibility:hidden'}`">
                      <span class="material-icons" style="color:teal">done</span>
                    </div>
                  </div>
                  <q-item-label overline>({{ daily.value }}/{{ daily.limit }})
                    <span class="material-icons q-mx-xs" style="font-size:13px;color:#ffff66">stars</span>
                    <span style="font-size:11px; color:#cccccc">20</span> -->
    <!-- </q-item-label>
                  <q-item-label>
                    <q-linear-progress color="teal" :value="daily.daily_progress" class="q-mt-md" />
                  </q-item-label>
                  <q-item-label overline>{{ Math.floor((daily.value / daily.limit)*100) }}
                    % Terlampaui</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </div>
      </div>
    </div> -->
</div>
</template>

<script>
import SearchComponent from "components/assigment/SearchComponent";
import {
    mapState
} from "vuex";
import moment from "moment";
export default {
    components: {
        //NewAssigment: () => import("components/assigment/NewAssigment.vue"),
        DailyTask: () => import("components/daily-task/DailyTask.vue"),
        AnnouncementItemList: () => import('components/announcement/AnnouncementList.vue'),
    },
    data() {
        return {
            navigation: false,
            slide: 1,
            items: [],
            model: null,
            options: []
        };
    },
    computed: {
        ...mapState(["Auth", "AssigmentSession", "Setting", "Achievement", "EchoNotification"]),
        // announcementList: function () {
        //     return this.EchoNotification.items.data ? this.EchoNotification.items.data.filter(item => {
        //         return item.data != '';
        //     }) : null;
        // },
    },
    mounted() {
        /*this.$store.dispatch("Auth/getAuth").then(res => {
          //console.log("cek: ", this.Auth.auth);
          this.$store.dispatch("Achievement/calculateDailyTask").then(res => {
            console.log('suskses calculateDailyTask')
            // console.log('matamu');
            // console.log(this.Achievement);
            // this.Achievement.items.map(item => {
            //   item.daily_progress = (item.value / item.limit).toFixed(2);
            //   return item;
            // });

          }).catch(err=>{
            console.log('gagal achievement');
            console.log(err);
          });
        }).catch(err=>{
           //alert(err)
        });*/
    },
    created() {
        this.initNotification();
        this.$store.dispatch("Auth/getAuth").then(res => {
            //console.log("cek: ", this.Auth.auth);
            this.$store.dispatch("Achievement/calculateDailyTask").then(res => {
                console.log('suskses calculateDailyTask')
                // console.log('matamu');
                // console.log(this.Achievement);
                // this.Achievement.items.map(item => {
                //   item.daily_progress = (item.value / item.limit).toFixed(2);
                //   return item;
                // })
            }).catch(err => {
                console.log('gagal achievement');
                console.log(err);
            });
        }).catch(err => {
            //aler
        });

    },
    methods: {
        onLogout() {
            //alert('asdsa')
            this.$store.dispatch("Auth/logout").then((res) => {
                this.$router.push({
                    name: 'login'
                })
            });
        },
        initNotification: function () {
            this.loading = true;
            if (!this.EchoNotification.items.data) {
                this.onRefresh();
            } else this.loading = false;
        },
        onRefresh: function (done) {
            this.loading = true;
            this.$store.dispatch('EchoNotification/index').finally(() => {
                this.loading = false
                if (done) done();
            })
        },

        toggleNavigation() {
            //this.$store.dispatch("Setting/toggleNavigation");
        },

        search() {
            // console.log("cek : ", this.Auth.auth)
            if (this.Auth.auth != "") {
                this.$q
                    .dialog({
                        component: SearchComponent,

                        // optional if you want to have access to
                        // Router, Vuex store, and so on, in your
                        // custom component:
                        parent: this, // becomes child of this Vue node
                        // ("this" points to your Vue component)
                        // (prop was called "root" in < 1.1.0 and
                        // still works, but recommending to switch
                        // to the more appropriate "parent" name)

                        // props forwarded to component
                        // (everything except "component" and "parent" props above):
                        text: "something"
                        // ...more.props...
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
            } else {
                this.$router.push({
                    path: `/login`
                });
            }
        }
    }
};
</script>

<style></style>
