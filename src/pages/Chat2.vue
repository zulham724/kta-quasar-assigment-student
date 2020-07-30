<template>
  <q-page>
    <div class="q-pa-md" style="max-height:100%;background-color:#f7e6b7"
    >
      <p class="nomessages text-secondary" v-if="messages.length == 0">
        [No messages yet!]
      </p>
      <div class="q-py-sm text-center">
        <q-spinner
            color="primary"
            size="1em"
            :thickness="2"
            v-if="loading"
        />
      </div>
      <q-scroll-area style="height: 200px; max-width: 100%" ref="scrollC">
        <div id="top"></div>
        <div class="q-py-sm" v-for="message in messages" :key="message.id">
          <span class="text-info">[{{ message.name }}]: </span>
          <span>{{ message.message }}</span>
          <span class="text-secondary time">{{ message.timestamp }}</span>
        </div>
        <div id="bottom" ref="bottom"></div>
        <q-scroll-observer @scroll="onScroll" />
      </q-scroll-area>
    </div>
    <q-btn @click="onScroll">load</q-btn>
    <q-btn @click="animateScroll">bot</q-btn>
    <q-footer style="padding:5px;background-color:white">
      <div class="card-action q-pl-md" style="">
        <CreateMessage :name="name" />
      </div>
    </q-footer>
  </q-page>
</template>

<script>
import CreateMessage from "components/CreateMessage";
import moment from "moment";
import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;
import { mapState } from "vuex";
export default {
  name: "Chat",
  props: ["name"],
  components: {
    CreateMessage
  },
  data() {
    return {
      messages: [],
      temp_messages: [],
      nama: "tim",
      loading: false,
      consecutive: 20,
      intervalTime: null,
      last_timestamp: null
    };
  },
  computed: {
    ...mapState(["Auth", "AssigmentSession"])
  },
  mounted() {
    this.$store.dispatch("Auth/getAuth").then(res => {});
    this.onLoad()
      .then(res => {
          this.intervalTime = setInterval(()=>{
            setTimeout(() => {
              this.animateScroll()
            }, 500 )
              document.getElementById("bottom") ? clearInterval(this.intervalTime) : console.log("jalan")
          },1000)
      })
      .catch(err => {
        console.log("eror", err);
        this.animateScroll();
      })
  },
  created() {
    
  },
  methods: {
    onSite() {
      console.log("masuk onSie");
    },
    onScroll() {
      const scrollArea = this.$refs.scrollC;
      const scrollTarget = scrollArea.getScrollTarget();
      console.log("ini scroll height: ", scrollTarget.scrollTop);
      if (scrollTarget.scrollTop < 1 ){
          this.loading = true
          setTimeout(() => {
            this.onLoad()
            this.loading = false
            }, 2000 )
      }
      // const ele = document.getElementById('top') // You need to get your element here
      // const target = getScrollTarget(ele)
      // console.log("target: ",target )
      // const offset = ele.offsetTop - ele.scrollHeight
      // console.log("offset : ",ele.offsetTop, ele.scrollHeight )
      // const duration = 300
      // setScrollPosition(target, offset, duration)
      // this.onLoad()
    },
    animateScroll() {
      const ele = document.getElementById("bottom"); // You need to get your element here
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop - ele.scrollHeight;
      const duration = 300;
      const scroll = setScrollPosition(target, offset, duration);
    },
    // animateScroll () {
    //     const scrollArea = this.$refs.scrollC;
    //     const scrollTarget = scrollArea.getScrollTarget();
    //     const duration = 300; // ms - use 0 to instant scroll
    //     scrollArea.setScrollPosition(scrollTarget.scrollHeight, duration);
    // },
    onLoad(done) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            if (this.messages.length == 0) {
              let ref = this.$firebase
                .firestore()
                .collection("messages")
                .orderBy("timestamp", "desc")
                .limit(this.consecutive);
              ref.onSnapshot(snapshot => {
                let temp_messages = [];
                snapshot.docChanges().forEach(change => {
                  if (change.type == "added") {
                    let doc = change.doc;
                    if (this.last_timestamp == null) {
                      this.last_timestamp = doc.data().timestamp;
                    } else if (this.last_timestamp > doc.data().timestamp) {
                      this.last_timestamp = doc.data().timestamp;
                    }
                    temp_messages.push({
                      id: doc.id,
                      name: this.nama,
                      message: doc.data().message,
                      timestamp: moment(doc.data().timestamp).format("LTS")
                    });
                  }
                });
                temp_messages.reverse();
                temp_messages.forEach(item => {
                  this.messages.push({
                    id: item.id,
                    name: item.name,
                    message: item.message,
                    timestamp: item.timestamp
                  });
                });
                this.load = false;
              });
            } else {
              let ref = this.$firebase
                .firestore()
                .collection("messages")
                .orderBy("timestamp", "desc")
                .where("timestamp", "<", this.last_timestamp)
                .limit(this.consecutive);
              ref.onSnapshot(snapshot => {
                let temp_messages = [];
                snapshot.docChanges().forEach(change => {
                  if (change.type == "added") {
                    let doc = change.doc;
                    if (this.last_timestamp > doc.data().timestamp) {
                      this.last_timestamp = doc.data().timestamp;
                    }
                    temp_messages.push({
                      id: doc.id,
                      name: this.nama,
                      message: doc.data().message,
                      timestamp: moment(doc.data().timestamp).format("LTS")
                    });
                  }
                });
                if (temp_messages.length < 2) {
                  temp_messages.reverse();
                  temp_messages.forEach(item => {
                    this.messages.push({
                      id: item.id,
                      name: item.name,
                      message: item.message,
                      timestamp: item.timestamp
                    });
                  });
                  // this.animateScroll()
                } else {
                  // temp_messages.reverse()
                  temp_messages.forEach(item => {
                    this.messages.unshift({
                      id: item.id,
                      name: item.name,
                      message: item.message,
                      timestamp: item.timestamp
                    });
                  });
                  this.load = false;
                }
              });
            }
          } catch (err) {
              reject(err)
          }
          resolve(this.messages)
        }, 10);
      });
    }
  }
};
</script>

<style></style>
