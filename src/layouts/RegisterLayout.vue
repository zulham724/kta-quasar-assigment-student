<template>
  <q-layout
    view="hHh lpR fFf"
    style="background-image:url('statics/bg-login.jpg');background-size:cover"
  >
    <q-page-container>
      <div class="q-pa-md">
        <!-- <div style="background-color:gray;opacity:0.5"></div> -->
        <div class="q-pa-md full-height">
          <h2 class="text-center">Registrasi</h2>
          <div class="align-center content-center full-height full-width">
            <!-- <q-form @submit="onSubmit" ref="form" class="q-gutter-md"> -->
            <q-form @submit="onSubmit" ref="form">
              <q-input
                v-model="credential.name"
                style="opacity:0.9"
                label="Nama lengkap anda"
                lazy-rules
                :rules="[val => (!!val && val.length > 0) || 'Data harus diisi']"
              />
              <q-input
                v-model="credential.email"
                style="opacity:0.9"
                label="Email anda"
                lazy-rules
                :rules="[val => !!val || 'Data harus diisi']"
              />
              <q-input
                v-model="credential.password"
                style="opacity:0.9"
                label="Password"
                type="password"
                lazy-rules
                :rules="[
                  val => !!val || 'Password tidak boleh kosong'
                ]"
              />
              <q-input
                v-model="credential.password_confirmation"
                style="opacity:0.9"
                label="Con Password"
                type="password"
                lazy-rules
                :rules="[
                  val => (!!val && val == credential.password) || 'Password tidak sama',
                ]"
              />
              <!-- <div class="q-py-md">
                                <q-radio v-model="shape" val="Laki-Laki" label="Laki-Laki" />
                                <q-radio v-model="shape" val="Perempuan" label="Perempuan" />
                            </div>
                            <p style="color:blue; margin-bottom: 0px; margin-top:16px">Tanggal lahir:</p>
                            <q-input v-model="date" filled type="date" style="opacity:0.8" @click="showing = true">
                                <q-tooltip v-model="showing" offset="[10,10]">
                                    Tanggal lahir
                                </q-tooltip>
                            </q-input>
                            <q-input style="opacity:0.8" label="Sekolah"/>
                            <q-input style="opacity:0.8" label="District id"/>
                            <q-input style="opacity:0.8" label="Provinsi"/>
                            <q-input v-model ="credential.name" filled type="tel" label="Nomor Telepon" />
                            <q-input v-model="text" filled autogrow label="Alamat"/>
                            <q-input style="opacity:0.8" label="NIK"/>
                            <q-input style="opacity:0.8" label="Display name"/> -->
                             <!-- <q-btn color="white" text-color="black" label="Standard" type="submit" /> -->
                            
            </q-form>
          </div>
          <q-btn
            style="position:absolute;bottom:15vh;right:5vw"
            label="Submit"
            @click="onSubmit()"
            rounded
            outline
            type="submit"
            color="primary"
            :loading="loading"
            :disable="loading"
          />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
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
              this.$q.notify(err.response.data.message);
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

<style></style>
