<template>
  <q-page style="background-color:#ebebe0">
    <div v-if="assigment != null">
      <q-header elevated>
        <q-toolbar style="background-color:teal">
          <q-btn flat dense icon="arrow_back" @click="$router.back()" />
          <q-toolbar-title>
            <div class="text-body1 text-bold">Quiz Latihan</div>
          </q-toolbar-title>
          <div class="caption text-bold" v-if="isStart && assigment.timer">
            Waktu anda {{ this.dispMinutes}} menit {{ this.dispSeconds }} detik
            <!-- waktu {{ assigment.created_at | moment('LLLL') }} -->
          </div>
        </q-toolbar>
      </q-header>
      <div class="">
        <q-img 
          src="https://agaybarho.files.wordpress.com/2016/11/maxresdefault.jpg?w=1080"
          :ratio="4 / 1.5"
          native-context-menu
          style="width:100%"
          no-default-spinner
        >
        </q-img>
      </div>
      <q-page-container style="padding-top:0px">
        <div class=" q-gutter-md">
          <!-- <q-btn outline rounded color='teal' @click="onStart()" v-if="isStart == false">Mulai</q-btn> -->
          <q-card
            bordered
            elevated
            class="my-card bg-white-1"
            v-if="!isStart"
            @click="isStart = true"
          >
            <q-item v-ripple class="row justify">
              <q-item-section avatar>
                <q-avatar>
                  <q-img :src="`${Setting.storageUrl}/${user.avatar}`"></q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section style="align-items:center">
                <q-item-label
                  class="text-weight-regular text-subtitle2"
                  style="font-size:12px"
                  >{{ user.name }}</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <!-- <q-item clickable>
                        <q-item-section>gunting</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>batu</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>kertas</q-item-section>
                      </q-item> -->
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
            <q-item style="padding-top:0px">
              <q-item-section>
                <div
                  class="text-subtitle2 text-weight-regular"
                  style="font-size:12px"
                >
                  {{ assigment.note }}
                </div>
              </q-item-section>
            </q-item>
            <q-item v-if="isStart == false">
              <q-item-section class="text-center">
                <div class="text-center no-wrap q-pa-xl">
                  <div class="q-pb-lg">
                    <div class="text-subtitle1 " style="font-size:20px">
                      {{ assigment.topic }}
                    </div>
                    <div class="q-pt-sm text-h8 text-weight-light">
                      {{ assigment.subject }}
                    </div>
                  </div>
                </div>
                <q-btn @click="onStart()" style="color:white;background-color:#009999">
                    Mulai
                </q-btn>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <q-form
          @submit="onSubmit"
          ref="form"
          class="full-height q-pt-md"
          v-if="isStart"
        >
          <q-stepper
            v-model="step"
            vertical
            header-nav
            color="primary"
            animated
            class="full-height"
          >
            <q-step
              v-for="(question_list, ql) in assigment.question_lists"
              :key="question_list.id"
              :name="ql + 1"
              :title="`Soal nomor ${ql + 1}`"
              icon="settings"
              :done="step > 1"
            >
              <div class="text-body2">{{ question_list.name }}</div>

                <q-input
                  disable
                  class="q-pa-sm text-body2"
                  outlined
                  dense
                  autogrow
                  v-for="answer_list in question_list.answer_lists"
                  :key="answer_list.id"
                  v-model="answer_list.name"
                  :rules="[val => !!val || 'Harus diisi']"
                >
                  <template v-slot:after>
                    <div>
                     <q-btn
                        round
                        icon="check"
                        :flat="question_list.answer.id==answer_list.id?false:true"
                       :color="question_list.answer.id == answer_list.id? 'green-4': null"
                        @click="onSelectAnswer(question_list, answer_list)"
                      /> 
                    </div>
                  </template>
                </q-input>
             


              <q-stepper-navigation class="row justify-end">
                <q-btn
                  v-if="ql != 0"
                  flat
                  @click="step = step - 1"
                  color="primary"
                  label="Kembali"
                  class="q-ml-sm"
                />
                <q-btn
                  v-if="ql + 1 != assigment.question_lists.length"
                  outline
                  rounded
                  @click="step++"
                  color="primary"
                  label="Lanjut"
                />
                <q-btn
                  v-if="ql + 1 == assigment.question_lists.length"
                  outline
                  rounded
                  @click="onSubmit()"  
                  color="primary"
                  label="Selesai"
                  :loading="loading"
                  :disable="loading"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-form>
      </q-page-container>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  props: {
    assigmentId: null,
    userId: null,
    user:null
  },
  data() {
    return {
      assigment: null,
      loading: false,
      step: 1,
      isTime: false,
      isStart: false,
      dispMinutes :  null,
      dispSeconds : null,
      timer: null,
      session: {},
      questions: null,
      assigmentSession: null,
      // answer_textfield: null,
      // answer_textarea: null,
      intervalTime: null
    };
  },
  computed: {
    ...mapState(["Setting","AssigmentSession","Auth"])
  },
  created() {
    //alert(this.assigmentId)
    if (this.assigmentId) this.init();
    
    //console.log(this.user);
    //console.log(this.assigmentId+' '+this.userId)
  },
  methods: {
    init() {
      this.$store.dispatch("Assigment/showSelectOptionsOnly", {assignmentId:this.assigmentId }).then(res => {
          //console.log(res.data)
          this.user= res.data.user;
        this.assigment = {
          ...res.data,
          question_lists: [
            ...res.data.question_lists.map(item => {
              item.answer = {};
              return item;
            })
          ]
        };
               console.log("cek assigment :",this.assigment)

       // console.log(this.assigment);
        this.session = {
          questions: this.assigment.question_lists
        };
      });
    },
    onSelectAnswer(question_list, answer_list){
      question_list.answer=answer_list;
      //console.log(this.assigment)
    },
    onCountdown() {
      const time = moment().add(this.assigment.timer,'minutes')
      this.intervalTime = setInterval(()=>{
        let now = moment()
        let distance = time - now
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.dispMinutes = minutes
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.dispSeconds = seconds
        let timeDisplay = minutes + " Menit" + seconds + " Detik"
        // console.log( "menit: ", minutes, "detik ", seconds)
        if  (distance < 2) {
          clearInterval(intervalTime);
          this.$router.push({
            name: "result",
            params: {
              assigment: this.assigment
            }
          });
        } else {
          null
        }
      }, 1000);
      
    },
    onStart() {
      this.assigment.timer? this.onCountdown() : null
    },
    onSubmit() {
      // console.log("ini assigment: ", this.assigment)
      let indikator = 0
      this.assigment.question_lists.forEach(item => {
        if (item.answer.name == null) {
          indikator = 1
        }
      });
      this.$refs.form.validate().then(success => {
        if (
          success &&
          // this.assigment.question_lists.filter(item => item.pivot.assigment_type.description == 'selectoptions' ? item.answer.id : item.answer).length == this.assigment.question_lists.length
          indikator == 0
        ) {
          clearInterval(this.intervalTime);
          this.sendNotif()
          this.$router.push({
            name: "trainingresult",
            params: {
              assigment: this.assigment,
            }
          });
        } else {
          this.$q.notify("Periksa apakah semua telah terisi dengan benar");
        }
      });
    },
    sendNotif(){
        const payload = {
          title: `AGPAII DIGITAL`,
          // body: `Postingan anda dikomentari oleh ${this.Auth.auth.name}: ${this.comment.value}`,
          body: `Soal telah selesai dikerjakan oleh ${this.Auth.auth.name}`,
          params:{
            sender_id: this.Auth.auth.id,
            target_id: this.userId,
            target_type: `Post`,
            text: `${this.Auth.auth.name} telah melakukan submit jawaban`,
          },
          to: `/topics/user_${this.userId}_assigment_${this.assigmentId}_quiz`
          // `/topics/user_${this.Auth.auth.id}_post_${this.Auth.auth.posts.id}_comment`
          
        }
        this.$store.dispatch('Notif/send',payload).then(res=>{
          console.log(res)
        })
      }
  }
};
</script>

<style></style>
