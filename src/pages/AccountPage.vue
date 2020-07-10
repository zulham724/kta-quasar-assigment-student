<template>
  <div style="background-color:white ">
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-bold">Profil</div>
        </q-toolbar-title>
        <q-btn color="white" flat icon="exit_to_app" size="md" @click="onLogout()">
          <span class="q-pl-sm">Logout</span>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-pull-to-refresh @refresh="onRefresh" color="teal">
        <q-img no-default-spinner src="https://s1.1zoom.me/b5050/230/School_Wood_planks_Notepad_Pencils_Ballpoint_pen_556945_3840x2400.jpg"
            :ratio="4/2"
            native-context-menu
            style="width:100%">
              <div class="row full-width justify-between">
                <div class="row text-body1 items-center">{{Auth.auth.profile.school_place}}</div>
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
              </div>
            </div>
            <div class="col-3 text-center float-right">
            </div>  
          </div>
          <div class="q-mt-xl">
            <div class="q-pa-md text-weight-light text-center" style="color:teal;font-size:30px">
              {{ Auth.auth.name }}
            </div>
            <div class=" text-center">
              <b>ID: {{ Auth.auth.id }}</b>
            </div>
          </div>
        </div>
        <div>
          <div class="q-px-md q-pt-lg" >
            <div class="row q-my-xl q-pa-sm" 
            style="background-color:#009999; border-radius:5px" 
            :class="`shadow-5`">
              <div class="col-4 text-center" style="border-bottom:1">
                <div class="text-weight-medium" style="color:white;font-size:12px; margin-bottom:5px">
                  <b>Soal selesai</b>
                </div>
                <span class="material-icons" style="font-size:60px; color:#00cc88">
                  assignment
                </span>
                <div style="color:white;margin-top:5px"><b>
                  {{ this.Achievement.achievements_account.finished_question }}
                </b></div>
              </div>
              <div class="col-4 text-center">
               <div class="text-weight-medium" style="color:white;font-size:12px; margin-bottom:5px">
                 <b>Skor Sempurna</b>
                </div>
                <span class="material-icons" style="font-size:60px; color: #ffa31a">whatshot</span>
                <div style="color:white;margin-top:5px"><b>
                  {{ this.Achievement.achievements_account.perfect_score }}
                </b></div>
              </div>
              <div class="col-4 text-center">
                <div class="text-weight-medium" style="color:white;font-size:12px; margin-bottom:5px">
                  <b>Jumlah Post</b>
                </div>
                <span class="material-icons md-light" style="font-size:60px; color:#00cc88">comment</span>
                <div style="color:white;margin-top:5px"><b>
                  {{ this.Achievement.achievements_account.total_post }}
                </b></div>
              </div>
            </div>
          </div>
        </div>
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
      // perfect_score: null,
      // finished_question: null,
      // total_post: null
    };
  },
  computed: {
    ...mapState(["Auth", "Setting", "Achievement"])
  },
  created() {
    this.onRefresh()
  },
  methods: {
    onRefresh(done) {
      this.$store.dispatch('Auth/getAuth').then(res=>{
        this.$store.dispatch('Achievement/calculateAchievement').then(res=>{
          // this.perfect_score = res.data.achievements_account.perfect_score,
          // this.total_post = res.data.achievements_account.total_post,
          // this.finished_question = res.data.achievements_account.finished_question
          if(done)done()
        });
      });
      console.log()
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
