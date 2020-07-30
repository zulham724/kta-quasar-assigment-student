<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:white">
        <div class="q-pa-sm" style="color:#009688;font-size:26px" clickable @click="navigation = !navigation">
          <span class="material-icons">
            menu
          </span>
        </div>
        <q-toolbar-title>
          <div class="text-body1 text-bold">Home</div>
        </q-toolbar-title>
        <q-space />
        <div class="q-pa-sm" style="color:#009688;font-size:26px " clickable>
            <span class="material-icons">
              notifications
            </span>
            <q-menu 
              anchor="bottom right"
              self="top right"
              auto-close 
              transition-show="scale"
              transition-hide="scale"
            >
              <q-list style="width:250px;border:2px solid #80CBC4; border-radius:5px">
                <q-item>
                  <q-item-section class="text-center">
                    <div 
                      class="text-weight-bold" 
                      style="font-size:15px"
                    >
                      Pemberitahuan
                    </div>
                  </q-item-section>
                </q-item>
                <div v-for="n in 3" :key="n" class="q-py-xs" style="background-color:#E0F2F1">
                  <announcement-list></announcement-list>
                </div>
                <q-item>
                  <q-item-section class="text-center">
                    <div 
                      class="text-weight-bold" 
                      style="color:#009688;font-size:13px"
                      clickable
                      @click="$router.push('/announcement')"
                    >
                      Lihat Semua
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="navigation"
      :width="270"
      :breakpoint="500"
      overlay
      bordered
      content-class="bg-white"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item class="q-pa-md">
            <q-item-section avatar top>
              <q-avatar size="3.6rem">
                <q-img no-default-spinner src="~assets/grass-pattern.jpg"></q-img>
              </q-avatar>
            </q-item-section>
            <q-item-section top>
              <q-item-label>
                <div class="text-weight-medium" style="font-size:14px">
                  John nono
                </div>
              </q-item-label>
              <q-item-label style=" color:#F2C94C">
                <span class="material-icons" style="font-size:18px">
                  emoji_events
                </span> 100 points
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                home
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Beranda</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/account')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                person
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Profil</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/assigment')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                assignment
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Kerjakan Soal</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/traininglist')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                edit
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Latihan Mandiri</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/theory')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                class
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Materi</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/post')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                forum
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Diskusi</div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="$router.push('/setting')">
            <q-item-section avatar>
              <span class="material-icons" style="font-size:30px;color:#009688">
                settings
              </span>
            </q-item-section>
            <q-item-section>
              <div style="font-size:15px">Pengaturan Akun</div>
            </q-item-section>
          </q-item>
          <div class="q-pa-lg text-center">
            <q-btn 
              class="text-weight-regular"
              flat
              rounded
              no-caps
              style="width:90%;font-size:18px;background-color:#4DB6AC;color:white"
              @click="onLogout()"
            >
              <span class="material-icons" style="font-size:30px;color:white;padding-right:5px">
                exit_to_app
              </span> Keluar
            </q-btn>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page class="q-pa-lg">
      <q-item class="q-pa-none">
        <q-item-section avatar top>
          <q-avatar size="6rem">
            <q-img no-default-spinner src="~assets/man.png"></q-img>
          </q-avatar>
        </q-item-section>
        <q-item-section top>
          <q-item-label>
            <div class="text-weight-bold text-h6">John nono</div>
          </q-item-label>
          <q-item-label style="color:#F2C94C;font-size:17px;margin-top:0px">
            <span class="material-icons" style="font-size:26px">
              emoji_events
            </span> 100 points
          </q-item-label>
          <q-item-label>
            <q-btn
              class="q-px-sm" 
              dense
              flat
              no-caps
              style="background-color:#E0E0E0"
            >
              <span class="material-icons" style="color:#4F4F4F;font-size:20px;padding-right:4px">
                camera_alt
              </span> Ubah Foto Profil
            </q-btn> 
          </q-item-label>
        </q-item-section>
      </q-item>
      <div  shrink class="q-pt-lg q-pb-xs">
        <q-btn
          class="q-py-xs" 
          dense
          no-caps
          style="background-color:#4DB6AC;width:100%;border-radius:10px"
          @click="$router.push('/dailytask')"
        > 
          <div class="row full-width">
            <div class="col-2 text-left">
              <span class="q-pl-sm material-icons" style="font-size:30px;color:#FFD03E">
                extension
              </span>
            </div>
            <div class="q-pt-xs text-weight-regular col-8 text-left" style="font-size:16px;color:white">
              Lihat Tantangan Harian
            </div>
            <div class="col-2 text-right">
              <span class="q-pr-sm material-icons" style="font-size:30px;color:white">
                chevron_right
              </span>
            </div>
          </div>
        </q-btn>
      </div>
      <div  shrink class="q-pt-sm q-pb-xs">
        <q-btn
          class="q-py-xs" 
          dense
          no-caps
          style="background-color:#4DB6AC;width:100%;border-radius:10px"
          @click="$router.push('/statistic')"
        > 
          <div class="row full-width">
            <div class="col-2 text-left">
              <span class="q-pl-sm material-icons" style="font-size:30px;color:#FFD03E">
                show_chart
              </span>
            </div>
            <div class="q-pt-xs text-weight-regular col-8 text-left" style="font-size:16px;color:white">
              Lihat Statistik
            </div>
            <div class="col-2 text-right">
              <span class="q-pr-sm material-icons" style="font-size:30px;color:white">
                chevron_right
              </span>
            </div>
          </div>
        </q-btn>
      </div>
      <div  shrink class="q-pt-sm q-pb-xs">
        <q-btn
          class="q-py-xs" 
          dense
          no-caps
          style="background-color:#4DB6AC;width:100%;border-radius:10px"
          @click="$router.push('/ranking')"
        > 
          <div class="row full-width">
            <div class="col-2 text-left">
              <span class="q-pl-sm material-icons" style="font-size:30px;color:#FFD03E">
                emoji_events
              </span>
            </div>
            <div class="q-pt-xs text-weight-regular col-8 text-left" style="font-size:16px;color:white">
              Lihat Ranking
            </div>
            <div class="col-2 text-right">
              <span class="q-pr-sm material-icons" style="font-size:30px;color:white">
                chevron_right
              </span>
            </div>
          </div>
        </q-btn>
      </div>
      <div  shrink class="q-pt-sm q-pb-xs">
        <q-btn
          class="q-py-xs" 
          dense
          no-caps
          style="background-color:#4DB6AC;width:100%;border-radius:10px"
          @click="$router.push('/theory/modul/save')"
        > 
          <div class="row full-width">
            <div class="col-2 text-left">
              <span class="q-pl-sm material-icons" style="font-size:30px;color:#FFD03E">
                class
              </span>
            </div>
            <div class="q-pt-xs text-weight-regular col-8 text-left" style="font-size:16px;color:white">
              Modul Tersimpan
            </div>
            <div class="col-2 text-right">
              <span class="q-pr-sm material-icons" style="font-size:30px;color:white">
                chevron_right
              </span>
            </div>
          </div>
        </q-btn>
      </div>
      <div  shrink class="q-pt-sm q-pb-xs">
        <q-btn
          class="q-py-xs" 
          dense
          no-caps
          style="background-color:#4DB6AC;width:100%;border-radius:10px"
          @click="$router.push('/theory/media/save')"
        > 
          <div class="row full-width">
            <div class="col-2 text-left">
              <span class="q-pl-sm material-icons" style="font-size:30px;color:#FFD03E">
                airplay
              </span>
            </div>
            <div class="q-pt-xs text-weight-regular col-8 text-left" style="font-size:16px;color:white">
              Media Pembelajaran Tersimpan
            </div>
            <div class="col-2 text-right">
              <span class="q-pr-sm material-icons" style="font-size:30px;color:white">
                chevron_right
              </span>
            </div>
          </div>
        </q-btn>
      </div>
      <q-card class="q-mt-xl" style="border-radius:10px">
        <q-card-section class="q-pb-xs">
          <div class="text-h6 text-weight-bold">Data Pribadi</div>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div class="q-pb-xs text-weight-medium" style="font-size:15px;color:#4DB6AC">Nama</div>
          <q-input
            flat
            outlined
            bg-color="white"
            no-caps
            dense
            label="Nama"
            color="teal-3"
          >
          </q-input>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div class="q-pb-xs text-weight-medium" style="font-size:15px;color:#4DB6AC">Email</div>
          <q-input
            flat
            outlined
            bg-color="grey-2"
            no-caps
            dense
            disable
            label="Johnnono@gmail.com"
            color="teal-3"
          >
          </q-input>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div class="q-pb-xs text-weight-medium" style="font-size:15px;color:#4DB6AC">Tanggal Lahir</div>
          <q-input
            flat
            outlined
            bg-color="white"
            no-caps
            dense
            style="width:50%"
            filled type="date"
            label="Tanggal Lahir"
            color="teal-3"
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div class="text-weight-medium" style="font-size:15px;color:#4DB6AC">Jenis Kelamin</div>
            <q-radio v-model="gender" val="Laki-Laki" label="Laki-Laki" color="teal-3" />
            <q-radio v-model="gender" val="Perempuan" label="Perempuan" color="teal-3" />
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div class="q-pb-xs text-weight-medium" style="font-size:15px;color:#4DB6AC">Alamat</div>
          <q-input
            flat
            outlined
            bg-color="white"
            no-caps
            dense
            autogrow
            label="Alamat"
            color="teal-3"
          >
          </q-input>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div class="q-pb-xs text-weight-medium" style="font-size:15px;color:#4DB6AC">Nomor Telepon</div>
          <q-input
            flat
            outlined
            bg-color="white"
            no-caps
            type="number"
            dense
            label="Nomor Telepon"
            color="teal-3"
          >
          </q-input>
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn
            class="q-px-xs text-weight-regular"
            flat
            no-caps
            rounded
            label="Simpan"
            style="font-size:16px;color:white;background-color:#009688">

          </q-btn>
        </q-card-section>
      </q-card>
      <q-card class="q-mt-xl" style="border-radius:10px">
        <q-card-section class="q-pb-xs">
          <div class="text-h6 text-weight-bold">Sekolah</div>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div class="row full-width">
            <div class="col-5 q-pr-sm">
              <div class="q-pb-xs text-weight-medium" style="font-size:15px;color:#4DB6AC">Jenjang</div>
              <q-select 
                outlined  
                dense 
                color="teal-3"
                bg-color="white"
                v-model="model" 
                style="width:100%"
                :options="options"
                map-options
                label="Jenjang"
              >
              </q-select>
            </div>
            <div class="col-7 q-pl-sm">
              <div class="q-pb-xs text-weight-medium" style="font-size:15px;color:#4DB6AC">Kelas</div>
              <q-input
                flat
                outlined
                bg-color="white"
                no-caps
                dense
                label="Kelas"
                color="teal-3"
              >
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-py-xs">
          <div class="q-pb-xs text-weight-medium" style="font-size:15px;color:#4DB6AC">Sekolah</div>
          <q-input
            flat
            outlined
            bg-color="white"
            no-caps
            dense
            label="Sekolah"
            color="teal-3"
          >
          </q-input>
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn
            class="q-px-xs text-weight-regular"
            flat
            no-caps
            rounded
            label="Simpan"
            style="font-size:16px;color:white;background-color:#009688">

          </q-btn>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
  <!-- <div style="background-color:white ">
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
                <span class="material-icons" style="font-size:60px; color:white">
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
                <span class="material-icons md-light" style="font-size:60px; color:white">comment</span>
                <div style="color:white;margin-top:5px"><b>
                  {{ this.Achievement.achievements_account.total_post }}
                </b></div>
              </div>
            </div>
          </div>
        </div>
      </q-pull-to-refresh>
    </q-page>
  </div> -->
</template>
<script>
import { mapState } from "vuex";
import AchievementStore from '../store/modules/Achievement.store';
export default {
  components: {
    AnnouncementList: () =>import('components/announcement/AnnouncementList.vue')
  },
  name: "AccountPage",

  data() {
    return {
      options:null,
      navigation:false
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
