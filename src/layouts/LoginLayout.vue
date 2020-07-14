<template>
  <div
    style="height:100vh;background-color:#009688;background-image:url('statics/bg-login.png');background-repeat: no-repeat;background-position: center;background-size:cover"
  >
    <div class="full-height" >
      <div
        class="row full-width" style="position:absolute;top:48vh;height:52vh" id="rcorners1" 
      >
        <div class="col-12">
        
          <div class="row q-pb-xs">
            <div class="col-12 text-center text-h5 text-weight-bold">
            Hello!
            </div>
          </div>
          
          <q-form @submit="onSubmit" ref="form" class="justify-center" style="margin-left: 20px;margin-right: 20px;" >
            <q-input
              dense
              label="Email anda"
              v-model="credential.username"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
            <q-input
              dense
              label="Password"
              v-model="credential.password"
              type="password"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Please type something']"
            />
          </q-form>

          <div class="row">
            <div class="col-12 text-center text-h5 text-weight-bold">
              <q-btn
                @click="onSubmit()"
                rounded
                type="submit"
                color="primary"
                :loading="loading"
                :disable="loading"
              ><div style="margin-right:20px;margin-left:20px">Masuk</div></q-btn>
              
            </div>
          </div>

        </div>

        <div class="col-12">
        <div class="row q-pt-lg">
             <div class="col-4">
               <q-btn flat color="primary" @click="$router.push('/register')" label="Buat Akun" />

           </div>
            <div class="col-6 offset-2">
              <q-btn flat color="primary" label=" Lupa Kata Sandi" />
              
            </div>
          </div>
        </div>
        
      </div>

      
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      credential:{},
      loading: false
    }
  },
  computed:{
    ...mapState(['Auth'])
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success=>{
        if(success){
          this.loading = true
          this.$store.dispatch('Auth/login',this.credential).then(res=>{
              this.$router.push('/')
              window.history.pushState(null, null ,window.location.href)
          }).catch(err=>{
            this.$q.notify(err.response.data.message)
          }).finally(()=>{
              this.loading = false
          })
        }
      })
    }
  }
};
</script>

<style>
#rcorners1 {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: #fff;
  padding: 20px;

}
</style>
