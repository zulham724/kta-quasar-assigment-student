<template>
<div>
    <q-pull-to-refresh @refresh="onRefresh">
        <q-header>
            <q-toolbar style="background-color:#7A6180">
                <div class="q-pa-sm" style="color:#E0E0E0;font-size:26px" clickable @click="$emit('navigation-toggle')">
                    <span class="material-icons">
                        menu
                    </span>
                </div>
                <q-toolbar-title> </q-toolbar-title>
                <q-space />
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
            </q-toolbar>
            <q-toolbar class="q-pa-none q-pb-md" style="height:85px;background-color:#7A6180" inset>
                <q-img no-default-spinner src="~assets/latihan-mandiri.png" style="width:100%"></q-img>
            </q-toolbar>
            <q-toolbar class="q-px-none" style="background-color:white;min-height:0px;align-items:none">
                <div class="full-width" style="height:100%">
                    <q-tabs v-model="tab" dense switch-indicator class="" active-color="white" indicator-color="transparent" align="justify">
                        <div class="row full-width text-weight-medium">
                            <div class="col-6" style="" :style="
                    `${
                      tab == 'assigmentpaket'
                        ? 'background-color:#7A6180;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white'
                        : 'background-color:white;color:#7A6180'
                    }`
                  ">
                                <q-tab class="q-px-sm q-py-sm" no-caps name="assigmentpaket" label="Paket Soal" />
                            </div>
                            <div class="col-6" style="" :style="
                    `${
                      tab == 'finishedpaket'
                        ? 'background-color:#7A6180;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white'
                        : 'background-color:white;color:#7A6180'
                    }`
                  ">
                                <q-tab class="q-px-sm q-py-sm" no-caps name="finishedpaket" label="Dikerjakan" />
                            </div>
                        </div>
                    </q-tabs>
                </div>
            </q-toolbar>
        </q-header>

        <q-page class="q-pa-md">
            <q-infinite-scroll @load="onLoadCheck" :offset="250" ref="scrollGan">
                <q-tab-panels v-model="tab" animated style="height:-webkit-fill-available">
                    <q-tab-panel class="q-pt-sm q-px-none" name="assigmentpaket" style="height:100%;background-color:white">
                        <div class="row q-px-sm q-pb-md full-width">
                            <div class="col-10">
                                <q-input outlined rounded dense v-model="search" no-caps label="Cari Paket Soal">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-2 text-center">
                                <span class="material-icons" style="color:#828282;font-size:38px">
                                    tune
                                </span>
                            </div>
                        </div>
                        <div v-if="TrainingAssigment.assigments">
                            <q-intersection class="q-px-sm q-py-xs" style="min-height:100px;width:100%" v-for="assigment in getFilteredAssigments" :key="`training-${assigment.id}`">
                                <training-list-item :assigment="assigment"></training-list-item>
                            </q-intersection>
                        </div>
                        <div v-else class="q-gutter-y-sm">
                            <div v-for="n in 4" :key="n">
                                <q-skeleton height="100px" />
                            </div>
                        </div>
                    </q-tab-panel>
                    <q-tab-panel class="q-pt-sm q-px-none" name="finishedpaket" style="height:100%;background-color:white">
                        <div class="row q-px-sm q-pb-md full-width">
                            <div class="col-10">
                                <q-input outlined rounded dense no-caps v-model="search2" label="Cari Paket Soal">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-2 text-center">
                                <span class="material-icons" style="color:#828282;font-size:38px">
                                    tune
                                </span>
                            </div>
                        </div>
                        <div v-if="FinishedTrainingAssigment.assigments">
                            <q-intersection class="q-px-sm q-py-xs" style="min-height:100px;width:100%" v-for="session in getFilteredSession" :key="`session-${session.id}`">
                                <finished-training-list-item :session="session"></finished-training-list-item>
                            </q-intersection>
                        </div>
                        <div v-else class="q-gutter-y-sm">
                            <div v-for="n in 4" :key="n">
                                <q-skeleton height="100px" />
                            </div>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </q-infinite-scroll>
        </q-page>
        <!-- <q-toolbar class="text-primary bg-teal">
      <q-btn color="white" flat round dense icon="arrow_back" @click="$router.back()" />
      <q-toolbar-title>
        <div class="text-body1 text-bold text-white">Latihan Mandiri</div>
      </q-toolbar-title>
    </q-toolbar>

     <div class="bg-teal q-pa-md" style=" border-bottom-left-radius:25px; border-bottom-right-radius:25px">
          <q-input dense dark standout="bg-teal text-white" rounded outlined v-model="search" label="Cari Soal" @input="onSearch">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

     </div>

    <q-page class="q-pa-md">

  <div v-if="!loading">

    <q-infinite-scroll @load="onLoad" :offset="250" v-if="assigments.data.length>0">
     <q-intersection class="q-pa-xs" v-for="(assigment, id) in assigments.data" :key="id">
        <q-card class="my-card" style="border-radius:25px;border-left: 10px solid #008080;" >
          <q-card-section>
            <div class="row">
              <div class="col-3 text-center">
                <div v-if="assigment.latest_auth_session.length==0">
                    <q-icon name="warning" class="text-red" style="font-size: 3rem;" />
                    <div class="text-caption">Belum dikerjakan</div>
                </div>
                <div v-else>
                  <div class="row">
                      <div class="col-12 text-caption">Nilai</div>
                  </div>
                  <div class="row">
                      <div class="col-12 text-h5">{{assigment.latest_auth_session[0].pivot.total_score}}</div>
                  </div>

                </div>
              </div>
              <div class="col-9">
                <div class="text-subtitle2">Paket Soal {{id+1}}</div>
                <div class="text-caption">Kode soal: {{assigment.code}}</div>
                <q-badge color="yellow-6" text-color="black">
                <q-icon
                    name="school"
                    size="14px"
                    class="q-mr-xs"
                  /> {{assigment.grade.description}}
                </q-badge>
              </div>
            </div>

          </q-card-section>

          <q-separator dark />

          <q-card-actions align="right" >
            <q-btn  @click="$router.push({'name':'trainingquizpage', params:{assigmentId:assigment.id}})" flat class="q-pr-md">Kerjakan</q-btn>
          </q-card-actions>
        </q-card>
     </q-intersection>
         <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>

    </q-page> -->
    </q-pull-to-refresh>
</div>
</template>

<script>
import {
    debounce
} from "quasar";
import {
    copyToClipboard
} from "quasar";
import {
    mapState
} from "vuex";
import moment from "moment";
export default {
    components: {
        TrainingListItem: () => import("components/training/TrainingItem.vue"),
        FinishedTrainingListItem: () =>
            import("components/training/FinishedTrainingItem.vue"),
        AnnouncementItemList: () => import('components/announcement/AnnouncementList.vue'),
    },
    props: {
        assigmentId: null,
        userId: null,
        user: null
    },
    data() {
        return {
            search: "",
            search2: "",
            assigments: {
                data: []
            },
            navigation: false,
            tab: "assigmentpaket",
            sessions: [],
            loading: false,
            step: 1,
            isTime: false,
            isStart: false,
            dispMinutes: null,
            dispSeconds: null,
            timer: null,
            session: {},
            questions: null,
            assigmentSession: null,
            // answer_textfield: null,
            // answer_textarea: null,
            teacher: {},
            intervalTime: null
        };
    },
    computed: {
        ...mapState([
            "Setting",
            "AssigmentSession",
            "Auth",
            "TrainingAssigment",
            "FinishedTrainingAssigment",
            "EchoNotification"
        ]),
        getFilteredAssigments: function () {
            if (this.search.trim().length >= 2) {
                return this.TrainingAssigment.assigments.data.filter(item => {
                    //console.log(this.search)
                    return item.topic ? item.topic.toLowerCase().includes(this.search.toLowerCase()) : false;
                });
            } else return this.TrainingAssigment.assigments.data;
        },
        getFilteredSession: function () {
            if (this.search2.trim().length >= 2) {
                return this.FinishedTrainingAssigment.assigments.data.filter(item => {
                    //console.log(this.search)
                    return item.assigments[0].topic ? item.assigments[0].topic.toLowerCase().includes(this.search2.toLowerCase()) : false;
                });
            } else return this.FinishedTrainingAssigment.assigments.data;
        }
    },
    // watch: {
    //   "assigments.data": function(val, oldVal) {
    //     console.log(val);
    //   }
    // },
    created() {
        this.onSearch = debounce(this.onSearch, 1000);
        this.onRefresh();
        this.initNotification();
    },
    methods: {
        init() {
            this.loading = true;
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
        },
        onRefresh(done) {
            this.$store.dispatch("TrainingAssigment/index", this.search).then(res => {
                this.$store.dispatch("FinishedTrainingAssigment/index", this.search).then(res => {
                    if (done) done();
                })
            }).catch(err => {
                this.$q.notify("Silahkan isi jenjang terlebih dahulu di menu edit profile");
                this.$router.push({
                    name: 'account'
                })
                if (done) done();
            });
        },
        onLoadCheck(index, done) {
            if (this.tab == "assigmentpaket") {
                this.onLoad(index, done);
            } else if (this.tab == "finishedpaket") {
                this.onLoad2(index, done);
            } else {
                done();
            }
        },
        onLoad(index, done) {
            this.TrainingAssigment.assigments.next_page_url ?
                this.$store.dispatch("TrainingAssigment/next").then(res => done()) :
                done();
        },
        onLoad2(index, done) {
            this.FinishedTrainingAssigment.assigments.next_page_url ?
                this.$store.dispatch("FinishedTrainingAssigment/next").then(res => done()) :
                done();
        },
        onSearch() {
            // this.loading = true;
            // this.$store
            //   .dispatch("TrainingAssigment/setKeywordSearch", this.search)
            //   .then(res => {
            //      this.$store.dispatch("TrainingAssigment/filterAssigments", this.search)
            //   })
            //   .finally(() => {
            //     this.loading = false;
            //   });
        },
        onCountdown() {
            const time = moment().add(this.assigment.timer, "minutes");
            this.intervalTime = setInterval(() => {
                let now = moment();
                let distance = time - now;
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                this.dispMinutes = minutes;
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                this.dispSeconds = seconds;
                let timeDisplay = minutes + " Menit" + seconds + " Detik";
                // console.log( "menit: ", minutes, "detik ", seconds)
                if (distance < 2) {
                    clearInterval(intervalTime);
                    this.$router.push({
                        name: "result",
                        params: {
                            assigment: this.assigment
                        }
                    });
                } else {
                    null;
                }
            }, 1000);
        },
        onTextarea(payload) {
            if (payload.pivot.assigment_type.description == "textarea") {
                payload.answer_lists[0].name = payload.answer_lists.name;
                payload.answer = payload.answer_lists[0];
                payload.answer.value = null;
                this.$forceUpdate();
            }
        },
        onTextfield(payload) {
            if (payload.pivot.assigment_type.description == "textfield") {
                payload.answer_lists[0].name = payload.answer_lists.name;
                payload.answer = payload.answer_lists[0];
                payload.answer.value = null;
                this.$forceUpdate();
            }
        },
        onStart() {
            this.assigment.timer ? this.onCountdown() : null;
        },
        onSubmit() {
            // console.log("ini assigment: ", this.assigment)
            let indikator = 0;
            this.assigment.question_lists.forEach(item => {
                if (item.answer.name == null) {
                    indikator = 1;
                }
            });
            this.$refs.form.validate().then(success => {
                if (
                    success &&
                    // this.assigment.question_lists.filter(item => item.pivot.assigment_type.description == 'selectoptions' ? item.answer.id : item.answer).length == this.assigment.question_lists.length
                    indikator == 0
                ) {
                    clearInterval(this.intervalTime);
                    this.sendNotif();
                    this.$router.push({
                        name: "result",
                        params: {
                            assigment: this.assigment
                        }
                    });
                } else {
                    this.$q.notify("Periksa apakah semua telah terisi dengan benar");
                }
            });
        },
        sendNotif() {
            const payload = {
                title: `AGPAII DIGITAL`,
                // body: `Postingan anda dikomentari oleh ${this.Auth.auth.name}: ${this.comment.value}`,
                body: `Soal telah selesai dikerjakan oleh ${this.Auth.auth.name}`,
                params: {
                    sender_id: this.Auth.auth.id,
                    target_id: this.userId,
                    target_type: `Post`,
                    text: `${this.Auth.auth.name} telah melakukan submit jawaban`
                },
                to: `/topics/user_${this.userId}_assigment_${this.assigmentId}_quiz`
                // `/topics/user_${this.Auth.auth.id}_post_${this.Auth.auth.posts.id}_comment`
            };
            this.$store.dispatch("Notif/send", payload).then(res => {
                console.log(res);
            });
        },
        onLogout() {
            this.$router.push("/login").then(() => {
                this.$store.dispatch("Auth/logout");
            });
        }
    }
};
</script>

<style></style>
