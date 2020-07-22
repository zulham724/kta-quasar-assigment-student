<template>
    <q-layout>
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
    </q-layout>
</template>

<script>
export default {
    props:{
        assigment: null,
        // assigmentId: null
    },
    data(){
        return {
            loading:false,
            item: {},
            score: null,
            sum_selectOptions : 0,
            value_temp: null,
            isKeterangan: false
        }
    },
    computed: {
      // ...mapState(["Auth"])
    },
    mounted(){
      this.loading=true;
      this.$store.dispatch('AssigmentSession/store',this.assigment).then(res=>{
          this.score=res.data.score.value;
          this.isKeterangan=res.data.score.isTemporary;
      }).finally(err=>{
          this.loading=false;
      });
      
     
      if(this.score > 60){
          this.item.color = "green"
      } else {
          this.item.color = "red"
      }
    },
    created(){
        this.$store.dispatch('Auth/getAuth').then(res=>{

        });
    },
    methods: {
      sendNotif(){
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
}
</script>

<style>

</style>