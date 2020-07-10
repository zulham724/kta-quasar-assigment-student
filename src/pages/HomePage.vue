<template>
  <div>
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-icon name="home" style="font-size:1.5em" />

        <q-toolbar-title>
          <div class="text-body1 text-bold">Home</div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      autoplay
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      height="25vh"
    >
      <q-carousel-slide
        :name="1"
        img-src="~assets/1.png"
        
      />
      <q-carousel-slide
        :name="2"
        img-src="~assets/3.png"

      />
      <q-carousel-slide
        :name="3"
        img-src="~assets/2.png"
      />
      <!-- <q-carousel-slide
        :name="4"
        img-src="https://serangkab.info/wp-content/uploads/2019/03/maxresdefault-1.jpg"
      /> --> --> -->
    </q-carousel>

    <div class="q-pa-md">
      <div class="row q-mb-md">
        <div class="col-12">
          <q-btn-group style="width:100%" spread>
            <q-btn dense push>
              <template v-slot:default>
                <div>
                  <div class="text-caption text-teal"><q-icon name="timeline" /> Ranking</div>
                </div>
              </template>
            </q-btn>
            <q-btn dense push>
              <template v-slot:default>
                <div>
                  <div class="text-caption text-teal"><q-icon name="visibility" /> Analisis</div>
                </div>
              </template>
            </q-btn>
            <q-btn dense push>
              <template v-slot:default>
                <div>
                  <div class="text-caption text-teal"><q-icon name="update" /> Jadwal</div>
                </div>
              </template>
            </q-btn>
          </q-btn-group>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh" @click="search()">
            <q-icon name="mdi-puzzle" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Kerjakan soal
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh" @click="$router.push('/post')">
            <q-icon name="mdi-feather" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Ruang diskusi
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh">
            <q-icon name="mdi-timer" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Latihan mandiri
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh">
            <q-icon name="mdi-magnify" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Cari Materi
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh" @click="$router.push('/account')">
            <q-icon name="mdi-account" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Profil
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh" @click="$router.push('/history')">
            <q-icon name="mdi-poll" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Riwayat
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="text-body1">Tantangan harian</div>
        </div>
        <div class="col-12">
          <q-list bordered separator>
            <div v-for="(daily, e) in items" :key="e">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon :style="daily.value == daily.limit ? 'color:#ffcc00' : 'color:teal'" name="emoji_events" style="font-size:4em" />
                </q-item-section>
                <q-item-section>
                  <div class="row justify-between">
                    <div class="text-subtitle2" style="font-size:12px">{{ daily.description}}</div> 
                    <div :style="`${daily.value == daily.limit? 'visibility:visible' : 'visibility:hidden'}`">
                      <span class="material-icons" style="color:teal">done</span>
                    </div>
                  </div>
                  <q-item-label overline>({{ daily.value }}/{{ daily.limit }})
                    <!-- <span class="material-icons q-mx-xs" style="font-size:13px;color:#ffff66">stars</span>
                    <span style="font-size:11px; color:#cccccc">20</span> -->
                  </q-item-label>
                  <q-item-label>
                    <q-linear-progress color="teal" :value="daily.daily_progress" class="q-mt-md" />
                  </q-item-label>
                  <q-item-label overline>{{ Math.floor((daily.value / daily.limit)*100) }}
                    % Terlampaui</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchComponent from 'components/assigment/SearchComponent'
import {mapState} from 'vuex'
import moment from "moment";
export default {
  data() {
    return {
      slide: 1,
      items:[
      ]

    };
  },
  computed:{
    ...mapState(['Auth','AssigmentSession','Achievement'])
  },
  mounted() {
    this.$store.dispatch('Auth/getAuth').then(res=>{
      this.$store.dispatch("Achievement/calculateDailyTask").then(res=>{
        this.items = this.Achievement.items
        this.items.map(item=>{
          item.daily_progress = item.value / item.limit
          return item
        })
        // console.log("DT1: ",this.Achievement.items[0].value,
        //               " DT2: ",this.Achievement.items[1].value,
        //               " DT3 : ",this.Achievement.items[2].value,
        //               " DT5: ",this.Achievement.items[4].value)
      })
    })
    
  },
  created() {

  },
  methods:{
    search(){
      // console.log("cek : ", this.Auth.auth)
      if (this.Auth.auth != "") {
        this.$q.dialog({
        component: SearchComponent,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this, // becomes child of this Vue node
                      // ("this" points to your Vue component)
                      // (prop was called "root" in < 1.1.0 and
                      // still works, but recommending to switch
                      // to the more appropriate "parent" name)

        // props forwarded to component
        // (everything except "component" and "parent" props above):
        text: 'something',
        // ...more.props...
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
   } else {
     this.$router.push({
            path:`/login`
          });
   }
  }
  }
};
</script>

<style></style>
