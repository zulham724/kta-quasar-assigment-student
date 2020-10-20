<template>
<div style="height:100vh;background-color:#009688;background-image:url('statics/bg-login.png');background-repeat: no-repeat;background-position: center;background-size:cover">

    <q-toolbar class="text-primary">
        <q-btn color="white" flat round dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
            <div class="text-body1 text-bold text-white">Registrasi</div>
        </q-toolbar-title>
    </q-toolbar>

    <div class="full-width" style="position:relative;top:48vh;height:52vh" id="rcorners1">
        <div class="row q-pb-xs">
            <div class="col-12 text-center text-h4">
                Registrasi
            </div>
        </div>

        <!-- <div style="background-color:gray;opacity:0.5"></div> -->
        <div class="full-height row">
            <div class="align-center content-center full-height full-width">
                <!-- <q-form @submit="onSubmit" ref="form" class="q-gutter-md"> -->
                <q-form @submit="onSubmit" ref="form" style="margin-left: 20px;margin-right: 20px;">
                    <q-input v-model="credential.name" style="opacity:0.9" label="Nama lengkap anda" lazy-rules dense :rules="[val => (!!val && val.length > 0) || 'Data harus diisi']" />
                    <q-input v-model="credential.email" style="opacity:0.9" label="Email anda" lazy-rules dense :rules="[val => !!val || 'Data harus diisi']" />
                    <q-input v-model="credential.password" style="opacity:0.9" label="Password" type="password" lazy-rules dense :rules="[
                  val => !!val || 'Password tidak boleh kosong'
                ]" />
                    <q-input v-model="credential.password_confirmation" style="opacity:0.9" label="Con Password" type="password" dense lazy-rules :rules="[
                  val => (!!val && val == credential.password) || 'Password tidak sama',
                ]" />

                </q-form>

                <div class="row">
                    <div class="col-12 text-center text-weight-bold">
                        <q-btn @click="onSubmit()" rounded type="submit" color="primary" :loading="loading" :disable="loading">
                            <div style="margin-right:20px;margin-left:20px">Register</div>
                        </q-btn>

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
} from "vuex";
export default {
    data() {
        return {
            credential: {
                role_id: 8
            },
            password: null,
            loading: false
        };
    },
    computed: {
        ...mapState(["Auth"])
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if (success) {
                    this.loading = true;
                    this.$store
                        .dispatch("Auth/register", this.credential)
                        .then(res => {
                            this.$router.push("/");
                            window.history.pushState(null, null, window.location.href);
                        })
                        .catch(err => {
                            //this.$q.notify(err.response.data.errors);
                            let key = Object.keys(err.response.data.errors)[0]
                            this.$q.notify(err.response.data.errors[key][0]);
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
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
