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
      <q-page-container>
         <div class="q-pa-md text-center text-weight-light" style="font-size:30px">
          Skor Anda: 
        </div>
        
        <q-inner-loading :showing="!session">
        <q-spinner
        color="primary"
        size="3em"
        :thickness="10"
      />
      </q-inner-loading>

        <div class="row justify-center full-height full-width text-center q-pt-sm" v-if="session">
            <q-btn round outline bold size="60px" :color="session.assigments[0].pivot.total_score>60 ? 'green' : 'red'">{{session.assigments[0].pivot.total_score}}</q-btn>
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
            session:null
        }
    },
    computed: {
      // ...mapState(["Auth"])
    },
    mounted(){
      //console.log(this.assigment);
      this.$store.dispatch('AssigmentSession/checkAndStore',this.assigment).then(res=>{
        
        this.session=res.data;
      });
     
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