<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#2F3E86">
        <div class="q-pa-sm" style="color:#E0E0E0;font-size:26px" clickable @click="navigation = !navigation">
          <span class="material-icons">
            menu
          </span>
        </div>
        <q-toolbar-title>
        </q-toolbar-title>
        <q-space />
          <div class="q-pa-sm" style="color:#E0E0E0;font-size:26px " clickable>
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
                      style="color:#80CBC4;font-size:13px"
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
      <q-toolbar class="q-pa-none q-pb-md" style="height:85px;background-color:#2F3E86" inset>
        <q-img no-default-spinner src="~assets/kerjakan-soal.png" style="width:100%"></q-img>
      </q-toolbar>
      <q-toolbar class="q-px-none" style="background-color:white;min-height:0px;align-items:none">
        <div class="full-width" style="height:100%">
        <q-tabs
          v-model="tab"
          dense
          switch-indicator
          class=""
          active-color="white"
          indicator-color="transparent"
          align="justify"
        >
          <div class="row full-width text-weight-medium">
            <div
              class="col-6"
              style=""
              :style="`${tab == 'notfinished'? 
                        'background-color:#2F3E86;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white': 
                        'background-color:white;color:#2F3E86'}`"
            >
              <q-tab
                class="q-px-sm q-py-sm"
                no-caps
                name="notfinished"
                label="Belum Selesai"
              />
            </div>
            <div
              class="col-6"
              style=""
              :style="`${tab == 'finished'? 
                        'background-color:#2F3E86;border-bottom-left-radius:30px;border-bottom-right-radius:30px;color:white': 
                        'background-color:white;color:#2F3E86'}`"
            >
              <q-tab
                class="q-px-sm q-py-sm"
                no-caps
                name="finished"
                label="Selesai"
              />
            </div>
          </div>
        </q-tabs>
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

    <q-page class="q-pa-md">
      <q-tab-panels
        v-model="tab"
        animated
        style="height:-webkit-fill-available"
      >
        <q-tab-panel
          class="q-pt-sm q-px-none"
          name="notfinished"
          style="height:100%;background-color:white"
        >
          <div class="text-center q-pb-sm">
            <q-btn 
              rounded 
              flat 
              no-caps 
              class="q-py-xs" 
              style="font-size:16px;background-color:#4DB6AC; color:white"
              @click="search()"
            >
              <span class="material-icons" style="font-size:20px;padding-right:5px">
                add
              </span>
              Tambah Paket Soal
            </q-btn>
          </div>
          <div class="q-pa-sm" v-for="n in 5" :key="n">
            <not-finished-assigment></not-finished-assigment>
          </div>
        </q-tab-panel>
        <q-tab-panel
          class="q-pt-sm q-px-none"
          name="finished"
          style="height:100%;background-color:white"
        >
          <div class="text-center q-pb-sm">
            <q-btn 
              rounded 
              flat 
              no-caps 
              class="q-py-xs" 
              style="font-size:16px;background-color:#4DB6AC; color:white"
              @click="search()"
            >
              <span class="material-icons" style="font-size:20px;padding-right:5px">
                add
              </span>
              Tambah Paket Soal
            </q-btn>
          </div>
          <div class="q-pa-sm" v-for="n in 5" :key="n">
            <finished-assigment></finished-assigment>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-page>
  </div>
</template>

<script>
import SearchComponent from 'components/assigment/SearchComponent'
import {mapState} from 'vuex'
export default {
    components: {
      NotFinishedAssigment: () =>import('components/assigment/NotFinishedAssigment.vue'),
      FinishedAssigment: () =>import('components/assigment/FinishedAssigment.vue'),
      AnnouncementList: () =>import('components/announcement/AnnouncementList.vue')
    },
    data() {
      return {
        tab:"notfinished",
        navigation:false
      }
    },
    methods: {
      search(){
          this.$q.dialog({
          component: SearchComponent,
          parent: this,
          text: 'something',
        }).onOk(() => {
          console.log('OK')
        }).onCancel(() => {
          console.log('Cancel')
        }).onDismiss(() => {
          console.log('Called on OK or Cancel')
        })
      },
      onLogout(){
      this.$router.push("/login").then(() => {
        this.$store.dispatch("Auth/logout");
      });
    },
    }
}
</script>