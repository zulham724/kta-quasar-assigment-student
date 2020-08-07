<template>
  <div class="bg-grey-5">
    <q-header elevated>
      <q-toolbar class="text-primary bg-teal">
        <q-btn
          color="white"
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <q-toolbar-title>
          <div class="text-body1 text-white text-bold">Home</div>
        </q-toolbar-title>

        <q-btn
          flat
          round
          icon="search"
          color="white"
          @click="$router.push({ name: 'usersearch' })"
        />
        <q-btn
          flat
          round
          icon="favorite_outline"
          color="white"
          @click="$q.notify('Dalam kontruksi')"
        />
      </q-toolbar>
    </q-header>
    <q-page>
      <q-pull-to-refresh @refresh="refresh" color="teal">
        <q-infinite-scroll @load="onLoad" :offset="250">
          <div class="q-pt-sm row items-start q-gutter-sm">
            <div v-if="!MediaPost.posts.data" style="width:100%">
              <q-card
                flat
                bordered
                class="q-mt-sm"
                style="width:100%"
                v-for="n in 3"
                :key="`loading-${n}`"
              >
                <q-item>
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" animation="fade" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <q-skeleton type="text" animation="fade" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" animation="fade" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-skeleton height="200px" square animation="fade" />

                <q-card-section>
                  <q-skeleton
                    type="text"
                    class="text-subtitle2"
                    animation="fade"
                  />
                  <q-skeleton
                    type="text"
                    width="50%"
                    class="text-subtitle2"
                    animation="fade"
                  />
                </q-card-section>
              </q-card>
            </div>
            <q-intersection
              v-for="post in MediaPost.posts.data"
              :key="post.id"
              :style="
                `min-height: ${
                  post.size
                    ? `${post.size.height}`
                    : post.files.length
                    ? '80vh'
                    : '30vh'
                };width: 100vw`
              "
            >
              <item-component :post="post"></item-component>
            </q-intersection>
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="teal" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-pull-to-refresh>
    </q-page>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    ItemComponent: () => import("components/post/ItemComponent.vue")
  },
  computed: {
    ...mapState(["MediaPost", "Setting", "Auth"])
  },
  created() {
    if (!this.MediaPost.posts.data) {
      this.$store.dispatch("MediaPost/index").catch(res => {
        if (res.response.data.errors["profile.educational_level_id"]) {
          this.$router.push({
            name: "accountedit",
            params: { message: "Silahkan mengisi jenjang terlebih dahulu" }
          });
          //this.$q.notify("Harus memilih jenjang terlebih dahulu");
        }
      });
    }
  },
  methods: {
    onLoad(index, done) {
      this.MediaPost.posts.next_page_url
        ? this.$store.dispatch("MediaPost/next").then(res => done())
        : done();
    },
    refresh(done) {
      this.$store.dispatch("MediaPost/index").then(res => {
        done();
      });
    }
  }
};
</script>

<style></style>
