<template>
  <div>
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-bold">Kembali</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-pull-to-refresh @refresh="refresh" color="teal">
        <div class="q-pa-lg">
            <div class="text-h5 text-center text-weight-light" style="color:teal">Riwayat Aktivitas Siswa</div>
        </div>
        <div style="background-color:#ebebe0">
            <q-infinite-scroll :offset="250">
              <div class="q-pa-md">
                <!-- <q-card flat style="width:100%" class="q-mt-md" v-show="!sessions.data" v-for="n in 4" :key="`loading-${n}`">
                  <q-card-section>
                    <q-skeleton type="text" class="text-subtitle1" />
                    <q-skeleton type="text" width="50%" class="text-subtitle1" />
                    <q-skeleton type="text" class="text-caption" />
                  </q-card-section>
                </q-card> -->
                <div v-for="(session, e) in sessions" :key="e">
                  <q-card flat style="width:100%" class="q-mt-md">
                  <div>
                    <q-img src="https://greece.greekreporter.com/files/Safe-1.jpg"
                      :ratio="5/2">
                    </q-img>
                  </div>
                  <q-card-actions>
                    <q-timeline color="teal">
                        <div class="q-px-md">
                          <h4 class="text-weight-bold" style="color:teal; font-size:30px; margin-top:0px"
                            >{{ session.monthyear }}</h4>
                          <q-timeline-entry
                          v-for="item in session.data"
                          :key="item.id"
                          :subtitle="moment(item.created_at).format('LLLL')"
                          >
                          <template v-slot:default>
                              <div class="text-weight-regular q-pt-sm" style="font-size:15px">
                                Anda telah menyelesaikan: 
                                <span class="text-h6 q-pt-sm" style="color:#008055">{{ item.assigments[0].topic }}</span>
                              </div>
                              <div style="overflow-wrap:break-word; white-space:pre-line">
                              <div class="text-body2" v-linkified>{{ item.assigments[0].subject }}</div>
                              <div class="q-pt-md"><b> Score: {{ item.value }} </b></div>
                              </div>
                          </template>
                          </q-timeline-entry>
                        </div>
                    </q-timeline>
                  </q-card-actions>
                  </q-card>
                </div>
              </div>
              <!-- <template v-slot:loading>
                  <div class="row justify-center q-my-md">
                  <q-spinner-dots color="teal" size="40px" />
                  </div>
              </template> -->
            </q-infinite-scroll>
        </div>
      </q-pull-to-refresh>
    </q-page>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      loading: false,
      sessions: [],
    };
  },
  computed: {
    ...mapState(["Setting","Auth"])
  },
  created() {
      this.refresh()
      this.group()
      // this.sessions.data= {score:null}
  },
  methods: {
    moment,
    refresh(done) {
      this.$store.dispatch('Auth/getAuth').then(res=>{
        if(done)done()
      })
    },
    // onLoad(index, done) {
    //   this.Event.events.next_page_url
    //     ? this.$store.dispatch("Event/next").then(res => {
    //         this.group();
    //         done();
    //       })
    //     : done();
    // },
    group() {
      this.sessions = this.Auth.auth.sessions.reduce((r, session) => {
        let dateObj = moment(session.created_at);
        let monthyear = dateObj.format("MMMM YYYY");
        if (!r[monthyear]) r[monthyear] = { monthyear, data: [session] };
        else r[monthyear].data.push(session);
        return r;
      }, {});
    }
  }
};
</script>

<style></style>
