<template>
  <div style="background-color:white ">
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-bold">Profil</div>
        </q-toolbar-title>
        <q-avatar square color="cyan-7" size="43px">
          <q-img src="~assets/Logo-Siswa-1.png"/>
        </q-avatar>
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
                <q-btn color="red" flat icon="exit_to_app" size="md" @click="onLogout()"><span class="q-pl-sm">Logout</span></q-btn>
              </div>
        </q-img>
        <div class="q-pa-md">
          <div class="row" >        
            <div class="col-3 text-center float-left">
              <div class="float-left">
                
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
            <div class="row q-mt-xl">
              <div class="col-4 text-center" style="border-bottom:1">
                <div class="text-weight-medium" style="font-size:12px; margin-bottom:5px"><b>Soal selesai</b></div>
                <span class="material-icons" style="font-size:60px; color:#006652">
                  assignment
                </span>
                <div style="margin-top:10px"><b>
                  {{ this.Achievement.Soal_selesai }}
                </b></div>
              </div>
              <div class="col-4 text-center">
               <div class="text-weight-medium" style="font-size:12px; margin-bottom:5px"><b>Skor Sempurna</b></div>
                <span class="material-icons" style="font-size:60px; color: #ffa31a">whatshot</span>
                <div style="margin-top:10px"><b>
                  {{ this.Achievement.Skor_sempurna }}
                </b></div>
              </div>
              <div class="col-4 text-center">
                <div class="text-weight-medium" style="font-size:12px; margin-bottom:5px"><b>Jumlah Post</b></div>
                <span class="material-icons md-light" style="font-size:60px; color:#006652">comment</span>
                <div style="margin-top:10px"><b>
                  {{ this.Achievement.Jumlah_post }}
                </b></div>
              </div>
            </div>
          </div>
          <!-- <div class="q-pa-md text-center">
            <div class="text-weight-medium" style="font-size:12px; margin-bottom:5px">Jumlah Post</div>
            <q-icon name="thumb_up" style="color:#006652;font-size:60px" />
            <div style="margin-top:10px">
                  30
            </div>
          </div> -->
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
import AchievementStore from '../store/modules/Achievement.store';
export default {
  name: "AccountPage",

  data() {
    return {
      SkorSempurna: null,
      SoalSelesai: null,
      TotalPost: null
    };
  },
  computed: {
    ...mapState(["Auth", "Setting", "Achievement"])
  },
  created() {
    
      this.$store.dispatch('Auth/getAuth').then(res=>{
        this.$store.dispatch('Achievement/calculateAchievement').then(res=>{
          // console.log("resdata nya amna: ", res)
          // this.SkorSempurna = res.data.Skor_sempurna,
          // this.TotalPost = res.data.Jumlah_post,
          // this.SoalSelesai = res.data.Soal_selesai
          // console.log("cek : ",this.SkorSempurna,this.TotalPost, this.SoalSelesai )
        });
      });
  },
  methods: {
    onRefresh(done) {
      this.$store.dispatch('Auth/getAuth').then(res=>{
        this.$store.dispatch('Achievement/calculateAchievement').then(res=>{
          this.SkorSempurna = res.data.Skor_sempurna,
          this.TotalPost = res.data.Jumlah_post,
          this.SoalSelesai = res.data.Soal_selesai
        });
      });
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
