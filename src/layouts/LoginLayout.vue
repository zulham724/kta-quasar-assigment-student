<template>
<div style="height:100vh;width:100%;background-color:#009688;background-image:url('statics/bg-login.png');background-repeat: no-repeat;background-position: center;background-size:cover">
    <div class="full-height">
        <div class="row" style="position:relative;top:48vh;height:52vh;width:100%" id="rcorners1">
            <div class="col-12">

                <div class="row q-pb-xs">
                    <div class="col-12 text-center text-h5 text-weight-bold">
                        Hello!
                    </div>
                </div>

                <q-form @submit="onSubmit" ref="form" class="justify-center" style="margin-left: 20px;margin-right: 20px;">
                    <q-input dense label="Email anda" v-model="credential.username" lazy-rules :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]" />
                    <q-input dense label="Password" v-model="credential.password"  :type="show_password?'text':'password'" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" >
                        <template v-slot:append>
                            <q-btn flat round color="teal" :icon="show_password?'visibility':'visibility_off'" @click="show_password=!show_password" />
                        </template>
                    </q-input>
                </q-form>

                <div class="row">
                    <div class="col-12 text-center text-weight-bold">
                        <q-btn @click="onSubmit()" rounded type="submit" color="primary" :loading="loading" :disable="loading">
                            <div style="margin-right:20px;margin-left:20px">Masuk</div>
                        </q-btn>

                    </div>
                </div>

                <div class="row q-pt-lg">
                    <div class="col-6">
                        <q-btn flat color="primary" @click="register" label="Buat Akun" />

                    </div>
                    <div class="col-6 text-right">
                        <q-btn flat color="primary" type="a" label=" Lupa Kata Sandi" href="https://agpaiidigital.org/password/reset" />

                    </div>
                </div>

            </div>

        </div>

    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
export default {
    data() {
        return {
            show_password:false,
            credential: {},
            loading: false
        }
    },
    computed: {
        ...mapState(['Auth'])
    },
    methods: {
        register() {
            this.$router.push('/register'); //window.history.pushState(null, null ,window.location.href)
        },
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if (success) {
                    this.loading = true
                    this.$store.dispatch('Auth/login', this.credential).then(res => {
                        this.$store.dispatch('EchoNotification/index');
                        this.$router.push('/')
                        window.history.pushState(null, null, window.location.href)
                    }).catch(err => {
                        //this.$q.notify('Email atau Password salah')
                        if(err.response.status==400)this.$q.notify('Email atau Password salah')
                        else this.$q.notify(err.response.data.message)
                    }).finally(() => {
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
