<template>
  <q-drawer
    v-model="Setting.navigation"
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
              <q-img
                no-default-spinner
                :src="`${Setting.storageUrl}/${Auth.auth.avatar}`"
              ></q-img>
            </q-avatar>
          </q-item-section>
          <q-item-section top>
            <q-item-label>
              <div class="text-weight-medium" style="font-size:14px">
                {{ Auth.auth.name }}
              </div>
            </q-item-label>
            <q-item-label style=" color:#F2C94C">
              <span class="material-icons" style="font-size:18px">
                emoji_events
              </span>
              100 points
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          style="border-bottom:1px solid #E0E0E0"
          @click="$router.push('/')"
        >
          <q-item-section avatar>
            <span class="material-icons" style="font-size:30px;color:#009688">
              home
            </span>
          </q-item-section>
          <q-item-section>
            <div style="font-size:15px">Beranda</div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          style="border-bottom:1px solid #E0E0E0"
          @click="$router.push('/account')"
        >
          <q-item-section avatar>
            <span class="material-icons" style="font-size:30px;color:#009688">
              person
            </span>
          </q-item-section>
          <q-item-section>
            <div style="font-size:15px">Profil</div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          style="border-bottom:1px solid #E0E0E0"
          @click="$router.push('/assigment')"
        >
          <q-item-section avatar>
            <span class="material-icons" style="font-size:30px;color:#009688">
              assignment
            </span>
          </q-item-section>
          <q-item-section>
            <div style="font-size:15px">Kerjakan Soal</div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          style="border-bottom:1px solid #E0E0E0"
          @click="$router.push('/traininglist')"
        >
          <q-item-section avatar>
            <span class="material-icons" style="font-size:30px;color:#009688">
              edit
            </span>
          </q-item-section>
          <q-item-section>
            <div style="font-size:15px">Latihan Mandiri</div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          style="border-bottom:1px solid #E0E0E0"
          @click="$router.push('/theory')"
        >
          <q-item-section avatar>
            <span class="material-icons" style="font-size:30px;color:#009688">
              class
            </span>
          </q-item-section>
          <q-item-section>
            <div style="font-size:15px">Materi</div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          style="border-bottom:1px solid #E0E0E0"
          @click="$router.push('/post')"
        >
          <q-item-section avatar>
            <span class="material-icons" style="font-size:30px;color:#009688">
              forum
            </span>
          </q-item-section>
          <q-item-section>
            <div style="font-size:15px">Diskusi</div>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          style="border-bottom:1px solid #E0E0E0"
          @click="$router.push('/setting')"
        >
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
            <span
              class="material-icons"
              style="font-size:30px;color:white;padding-right:5px"
            >
              exit_to_app
            </span>
            Keluar
          </q-btn>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "SideBarlayout",
  computed: {
    ...mapState(["Auth", "AssigmentSession", "Setting", "Achievement"])
  },
  components: {},
  data() {
    return {
      //navigation: false
    };
  },
  computed:{
      navigation:{
          get(){
              return this.Setting.navigation;
          },
          set(newValue){
              return this.$store.dispatch("Setting/toggleNavigation");
          }
      }
  },
  methods: {
      toggleNavigation(){
          this.$store.dispatch("Setting/toggleNavigation");
      }
  }
};
</script>
