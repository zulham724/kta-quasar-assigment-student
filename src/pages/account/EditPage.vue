<template>
  <q-layout>
      <div style="background-color:white ">
        <q-header elevated>
          <q-toolbar style="background-color:teal">
            <q-btn flat dense icon="arrow_back" @click="$router.back()" />
            <q-toolbar-title>
              <div class="text-body1 text-bold">{{ "Kembali" }}</div>
            </q-toolbar-title>
          </q-toolbar>
        </q-header>
        <q-page>
          <q-pull-to-refresh @refresh="onRefresh" color="teal">
            <div class="q-mt-xl">
              <q-img no-default-spinner src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1
              &amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=750&amp;q=80 750w"
                  :ratio="4/3"
                  native-context-menu
                  style="width:100%">
                    <div class="absolute-top text-subtitle2 flex flex-top">Edit Profil
                    </div>
              </q-img>
            </div>
            <div class="q-pa-md" style="padding-bottom:0px">
              <div class="self-center text-center" style="margin-top:-200px">
                <div>
                  <q-avatar size="30vw">
                    <q-img
                      :src="`${Setting.storageUrl}/${Auth.auth.avatar}`"
                      no-default-spinner
                    />
                  </q-avatar>
                </div>
                <q-btn dense size="sm" color="teal" flat label="Ubah foto profil" @click="$refs.inputFile.pickFiles()"/>
                <q-file v-show="false" v-model="file" ref="inputFile" @input="file=>$router.push({
                  name:'accountchangeavatar',
                  params:{
                    file:file
                  }
                })"></q-file>
                <!-- <q-btn outline size="10px" 
                style="margin-top:10px" 
                color="teal" 
                label="ubah foto"
                @click="$refs.inputFile.pickFiles()">
                </q-btn>
                <q-file
                v-show="false"
                v-model="credential.avatar"
                ref="inputFile"
                >
                </q-file> -->
              </div>       
            </div>
            <div class="q-px-md">
              <q-form ref="form">
                <q-input
                  v-model="credential.name"
                  style="opacity:0.9"
                  label="Nama lengkap"
                />
                <q-select 
                  v-model="credential.profile.educational_level" 
                  :options="educationallevels"
                  label="Jenjang" 
                  option-label="name"
                  option-value="id"
                  @input="item=>credential.profile.educational_level_id = item.id"
                />
                <q-input
                  v-model="credential.email"
                  :disable="true"
                  style="opacity:0.9"
                  label="email"
                >
                </q-input>
                <div class="q-py-md" style="padding-bottom:0px">
                  <q-radio v-model="credential.profile.gender" val="Laki-Laki" label="Laki-Laki" color="teal" />
                  <q-radio v-model="credential.profile.gender" val="Perempuan" label="Perempuan" color="teal" />
                </div> 
                <p style="color: gray;margin-left:2px; 
                  margin-bottom: 6px; margin-top:16px; font-size:16px">
                  Tanggal lahir:
                </p>
                <q-input v-model="credential.profile.birthdate" 
                  filled type="date"
                  style="opacity:0.8"/>
                <q-input v-model="credential.profile.school_place" 
                  style="opacity:0.8" 
                  label="Sekolah"/>

                <q-input v-model="credential.profile.home_address" 
                  filled autogrow 
                  label="Alamat"/>
                <q-input v-model ="credential.profile.contact" 
                  style="margin-bottom:10px"
                  label="Nomor Telepon"/>
              </q-form>
              <div class="q-py-md">
                <q-btn class="float-right"
                  style=""
                  label="Submit"
                  @click="onSubmit()"
                  rounded
                  outline
                  type="submit"
                  color="teal"
                  :loading="loading"
                  :disable="loading"
                />
              </div>
            </div>     
          </q-pull-to-refresh>
        </q-page>
      </div>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      credential: {
        profile:{
        },
      },
      file: null,
      loading: false,
      educationallevels: [{
        "name": null,
        "id": null
      }]
    };
  },
  computed: {
    ...mapState(["Auth","Setting",'EducationalLevel'])
  },
  created(){
    // this.$store.commit('Auth/merubah_token',{asd:'asd'})
    this.getEducationalLevels()
  },
  mounted() {
    this.onRefresh()
  },
  methods: {
    getEducationalLevels(){
      this.$store.dispatch('EducationalLevel/index').then(res=>{
        this.educationallevels = res.data
      })
    },
    onRefresh(done) {
      this.$store.dispatch('Auth/getAuth').then(res=>{
        this.credential = {
          ...this.Auth.auth,
          profile: {
            ...this.Auth.auth.profile
          }
        }
        if(done)done()
      })
    },
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.loading = true;
          this.$store
            .dispatch("Auth/updateProfile", this.credential)
            .then(res => {
              this.$router.push("/account");
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


}
</script>
<style lang="css" scoped></style>
