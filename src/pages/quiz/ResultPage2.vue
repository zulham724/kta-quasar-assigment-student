<template>
<div>
    <div style="background-size: cover;background-image:url('statics/star-background.png');min-height:inherit">
        <div v-if="assigmentSession != null" style="min-height:0px; height: -webkit-fill-available;">
            <q-card class="shadow-10 q-mb-xl" style="border-bottom-left-radius:30px;
              border-bottom-right-radius:30px;
              background-color:#005951">
                <q-card-section class="q-px-xl q-py-xl text-center" style="font-size:18px">
                    <div class="text-weight-medium" style="color:#B2DFDB">
                        Soal {{ assigmentSession.assigment.name }}
                    </div>
                    <div class="text-white">
                        {{ assigmentSession.assigment.topic }}
                    </div>
                    <div class="text-weight-light" style="color:white">
                        Oleh: {{ assigmentSession.teacher.name }}
                    </div>

                    <div class="text-weight-light" style="color:white">
                        Kelas: {{ assigmentSession.assigment.grade.description }}
                    </div>
                    <div class="text-weight-light" style="color:white">
                        Semester {{ assigmentSession.assigment.semester }}
                    </div>
                </q-card-section>
            </q-card>

            <div class="text-center">
                <div class="text-h6 text-weight-medium" style="color:#E2E2E2">
                    Selamat kamu sudah menyelesaikan soal ini. Good Job!
                </div>
                <q-item class="q-py-lg">
                    <q-item-section>
                        <q-item-label>
                            <div class="text-subtitle text-weight-regular" style="font-size:18px;color:#80CBC4">
                                Nilai
                            </div>
                        </q-item-label>
                        <q-item-label class="q-pa-sm text-center">
                            <q-btn :loading="loading" flat round size="64px" :style="
                      `background-color:${getResult.color};border:2px solid white`
                    ">
                                <div :style="
                        `${getResult.isTemporary ? 'font-size:20px' : ''}`
                      ">
                                    {{ getResult.name }}
                                </div>
                            </q-btn>
                        </q-item-label>
                        <q-item-label>
                            <div class="text-subtitle text-weight-regular" style="font-size:16px;color:#80CBC4">
                                {{ getResult.description }}
                            </div>
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-item class="q-px-lg q-py-lg">
                    <q-item-section class="q-px-sm">
                        <q-btn class="q-py-xs text-weight-regular" rounded flat no-caps color="black" style="background-color:#E0E0E0; font-size:16px" @click="$router.push('/')">
                            Beranda
                        </q-btn>
                    </q-item-section>
                    <!-- <q-item-section>
                    <q-btn 
                      class="q-py-xs text-weight-regular"
                      rounded 
                      flat
                      no-caps
                      color="white"
                      style="background-color:#F2994A; font-size:16px"
                      @click="$router.push('/review')"
                    >
                      Review Nilai 
                    </q-btn>
                  </q-item-section>-->
                </q-item>
            </div>
        </div>
    </div>
</div>
<!-- <q-layout>
      <div style="background-color:#ebebe0">
        <q-header elevated>
          <q-toolbar style="background-color:teal">
            <q-toolbar-title>
              <div class="text-body1 text-bold">{{ "Hasil Score" }}</div>
            </q-toolbar-title>
          </q-toolbar>
        </q-header>
      </div>
      <q-page-container v-if="score>=0">
        <div class="q-pa-md text-center text-weight-light" style="font-size:30px" v-if="isKeterangan">
          Skor Sementara: 
        </div>
         <div class="q-pa-md text-center text-weight-light" style="font-size:30px" v-if="!isKeterangan">
          Skor Anda: 
        </div>
        <div class="row justify-center full-height full-width text-center q-pt-sm">
            <q-btn round outline bold size="60px" :color="item.color ? item.color : null">{{score}} </q-btn>
        </div>
        <div class="q-pa-md text-center text-weight-light" v-if="isKeterangan">
          Skor akhir dapat dilihat melalui menu <span style="color:#00b377"><b>riwayat</b></span> setelah tugas sudah dinilai oleh guru penilai 
        </div>
        <div class="q-pt-lg row justify-center">
            <q-btn outline color="teal" size:6px @click="$router.push('/') && sendNotif()"> KEMBALI</q-btn>
        </div>
      </q-page-container>
    </q-layout> -->
</template>

<script>
export default {
    props: {
        assigmentSessionId: null
        // assigmentId: null
    },
    data() {
        return {
            assigmentSession: null,
            loading: true,
            item: {},
            score: null,
            sum_selectOptions: 0,
            value_temp: null,
            scoretest: 0
        };
    },
    computed: {
        // ...mapState(["Auth"]),
        getResult() {
            if (this.assigmentSession == null)
                return {
                    isTemporary: true,
                    color: "#F2C94C",
                    description: "Silahkan tunggu",
                    name: "Tunggu"
                };
            else {
                if (this.assigmentSession.total_score >= 75) {
                    return {
                        isTemporary: false,
                        color: "#00b377",
                        name: this.assigmentSession.total_score,
                        description: "Keren!!"
                    };
                } else {
                    return {
                        isTemporary: false,
                        color: "#fa5339",
                        name: this.assigmentSession.total_score,
                        description: "Jangan menyerah. Belajar lebih rajin lagi yaa, semangat!"
                    };
                }
            }
        }
    },
    mounted() {
        //console.log(this.assigmentForSubmit)
        //return "asu";
    },
    created() {
        this.loading = true;
        this.$store
            .dispatch("AssigmentSession/show", this.assigmentSessionId)
            .then(res => {
                this.assigmentSession = res.data;
                this.loading = false;
            }).catch(err => {
                this.$q.notify("Data tidak ditemukan");
                this.$router.back();
            });
    },
    methods: {
        sendNotif() {
            // const payload = {
            //   title: `AGPAII DIGITAL`,
            //   // body: `Postingan anda dikomentari oleh ${this.Auth.auth.name}: ${this.comment.value}`,
            //   body: `Postingan anda dikomentari oleh ${this.Auth.auth.name}`,
            //   params:{
            //     sender_id: this.Auth.auth.id,
            //     target_id: this.post.id,
            //     target_type: `Post`,
            //     text: `Postingan anda dikomentari oleh ${this.Auth.auth.name}`,
            //   },
            //   to: `/topics/user_${this.Auth.auth.id}_post_${this.Auth.auth.post.id}_comment`
            // }
            // this.$store.dispatch('Notif/send',payload).then(res=>{
            //   console.log(res)
            // })
        }
    }
};
</script>

<style></style>
