<template>
    <div>
    <q-toolbar class="text-primary bg-teal">
      <q-btn color="white" flat round dense icon="arrow_back" @click="$router.back()" />
      <q-toolbar-title>
        <div class="text-body1 text-bold text-white">Latihan Mandiri</div>
      </q-toolbar-title>
    </q-toolbar>

     <div class="bg-teal q-pa-md" style=" border-bottom-left-radius:25px; border-bottom-right-radius:25px">
          <q-input dark standout="bg-teal text-white" rounded outlined v-model="search" label="Cari Soal" @input="onSearch">
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
                <div v-if="assigment.auth_sessions.length==0">
                    <q-icon name="warning" class="text-red" style="font-size: 3rem;" />
                    <div class="text-caption">Belum dikerjakan</div>
                </div>
                <div v-else>
                ss
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
     
        
    </q-page>
    
    </div>
  
</template>

<script>
import { debounce } from 'quasar'
import { copyToClipboard } from 'quasar'
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
      search:'',
      assigments: {
        data:[]
      },
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
      teacher: {},
      intervalTime: null
    };
  },
  computed: {
    ...mapState(["Setting","AssigmentSession","Auth"])
  },
  created() {
   this.onSearch = debounce(this.onSearch, 1000);
    this.init();
  },
  methods: {
    init(){
      this.loading = true;
      this.$store
          .dispatch("Assigment/getMasterPublish", this.search)
          .then(res => {
            this.assigments = res.data;
          })
          .finally(() => {
            this.loading = false;
      });
    },
    onSearch() {
       this.loading = true;
      this.$store
         .dispatch("Assigment/getMasterPublish", this.search)
         .then(res => {
           this.assigments = res.data;
         })
         .finally(() => {
          this.loading = false;
        });
    },
    onLoad(index, done){
       this.assigments.next_page_url
        ? this.$store.dispatch("Assigment/nextMasterPublish", this.assigments.next_page_url).then(res =>{
          this.assigments.data = [...this.assigments.data, ...res.data.data];
          this.assigments.next_page_url = res.data.next_page_url;
          done();

          //console.log(this.assigments);
        })
        : done();
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
    onTextarea(payload){
      if (payload.pivot.assigment_type.description == "textarea") {
        payload.answer_lists[0].name = payload.answer_lists.name
        payload.answer = payload.answer_lists[0];
        payload.answer.value = null
        this.$forceUpdate();
      }
    },
    onTextfield(payload){
      if (payload.pivot.assigment_type.description == "textfield") {
        payload.answer_lists[0].name = payload.answer_lists.name
        payload.answer = payload.answer_lists[0];
        payload.answer.value = null
        this.$forceUpdate();
      }
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
            name: "result",
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
