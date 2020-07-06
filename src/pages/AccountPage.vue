<template>
  <div style="background-color:white ">
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-bold">Kembali</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-pull-to-refresh @refresh="onRefresh" color="teal">
        <q-img src="https://s1.1zoom.me/b5050/230/School_Wood_planks_Notepad_Pencils_Ballpoint_pen_556945_3840x2400.jpg"
            :ratio="4/2"
            native-context-menu
            style="width:100%">
              <div class="row full-width justify-between">
                <div class="row text-body1 items-center">{{Auth.auth.profile.school_place}}</div>
                <q-btn color="red" flat icon="exit_to_app" size="md" @click="onLogout()"/>
              </div>
        </q-img>
        <div class="q-pa-md">
          <div class="row" >        
            <div class="col-3 text-center float-left">
              <div class="float-left">
                <q-icon name="thumb_up" color="amber" style="font-size:20px" />
              </div>
            </div>
            <div class="col-6 self-center text-center">
              <div class="q-mt-xl">
                <q-avatar size="30vw" style="margin-top:-150px">
                  <q-img
                    :src="`${Setting.storageUrl}/${Auth.auth.avatar}`"
                    no-default-spinner
                  />
                </q-avatar>
                <div class="q-gutter-md" style="margin-top:-30px">
                  <q-btn color="teal" size:4px @click="$router.push('/account/edit')">
                    <span class="material-icons" style="font-size:20px; margin-right:5px">settings_applications</span>
                    <div> EDIT PROFIL</div>
                  </q-btn>
                </div>
                <!-- <q-btn
                dense
                size="sm"
                color="teal"
                flat
                label="Ubah foto profil"
                @click="$refs.inputFile.pickFiles()"
                style="margin-top: -50px"
              />
              <q-file
                v-show="false"
                v-model="file"
                ref="inputFile"
                @input="
                  file =>
                    $router.push({
                      name: 'accountchangeavatar',
                      params: {
                        file: file
                      }
                    })
                "
              ></q-file> -->
              </div>
            </div>
            <div class="col-3 text-center float-right">
            </div>  
          </div>
          <div class="q-mt-xl">
            <div class="q-pa-md text-weight-light text-center" style="color:teal;font-size:27px">
              {{ Auth.auth.name }}
            </div>
          </div>
        </div>
        <div>
          <div class="q-px-md">
            <div class="row q-mb-md">
              <div class="col-4 text-center" style="border-bottom:1">
                <div class="text-weight-medium" style="font-size:12px; margin-bottom:5px">Soal selesai</div>
                <span class="material-icons" style="font-size:45px; color: #4dff4d">
                  assignment
                </span>
                <div style="margin-top:10px">
                  200
                </div>
              </div>
              <div class="col-4 text-center">
               <div class="text-weight-medium" style="font-size:12px; margin-bottom:5px">Points</div>
                <span class="material-icons" style="font-size:45px; color: yellow">stars</span>
                <div style="margin-top:10px">
                  7
                </div>
              </div>
              <div class="col-4 text-center">
                <div class="text-weight-medium" style="font-size:12px; margin-bottom:5px">Jumlah Komentar</div>
                <span class="material-icons md-light" style="font-size:45px; color:#4da6ff">comment</span>
                <div style="margin-top:10px">
                  30
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="text-center q-my-lg">
          <q-btn color="teal" push size="12px">
            <div class="row items-center no-wrap" @click="search()">
              <q-icon left name="map" />
              <div class="text-center">
              Kerjakan<br>Soal
              </div>
          </div>
          </q-btn>
        </div> -->
      </q-pull-to-refresh>
    </q-page>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "AccountPage",

  data() {
    return {};
  },
  computed: {
    ...mapState(["Auth", "Setting"])
  },
  methods: {
    onRefresh(done) {
      this.$store.dispatch('Auth/getAuth').then(res=>{
        if(done)done()
      })
    },
    onLogout(){
      this.$router.push("/login").then(() => {
        this.$store.dispatch("Auth/logout");
      });
    }
  }
};
</script>
<style lang="css" scoped></style>
