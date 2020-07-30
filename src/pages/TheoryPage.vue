<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#FFD03E">
        <div class="q-pa-sm" style="color:#009688;font-size:26px" clickable @click="navigation = !navigation">
          <span class="material-icons">
            menu
          </span>
        </div>
        <q-toolbar-title>
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
      <q-toolbar class="q-pa-none q-pb-md" style="height:85px;background-color:#FFD03E" inset>
        <q-img no-default-spinner src="~assets/materi.png" style="width:100%"></q-img>
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
      <q-card 
        flat 
        class="my-card q-ma-sm" 
        style="margin-right:0px; margin-top:0px;border-radius:10px"
        clickable
        @click="$router.push('/theory/modul')"
      >
        <q-img no-default-spinner src="~assets/modul-button.png"></q-img>
      </q-card>
      <q-card 
        flat 
        class="my-card q-ma-sm q-pt-sm" 
        style="margin-right:0px; margin-top:0px;border-radius:10px"
        clickable
        @click="$router.push('/theory/media')"
      >
        <q-img no-default-spinner src="~assets/media-button.png"></q-img>
      </q-card>
    </q-page>
  </div>
</template>

<script>
export default {
    components: {
      AnnouncementList: () =>import('components/announcement/AnnouncementList.vue')
    },
    data() {
      return{
        navigation:false
      }
    }
}
</script>