<template>
  <div>
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-bold">Diskusi</div>
        </q-toolbar-title>
        <q-avatar square color="cyan-7" size="43px">
          <q-img src="~assets/Logo-Siswa-1.png"/>
        </q-avatar>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-pull-to-refresh @refresh="onRefresh" color="teal">
      	<q-card>
          <q-card-section>
            <div class="row">
              <div class="col-2 self-center">
                <q-avatar size="lg">
                  <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" no-default-spinner />
                </q-avatar>
              </div>
              <div class="col-10" @click="$router.push('/post/create')">
                <q-input
                  rounded
                  dense
                  outlined
                  label="Diskusi hari ini"
                  readonly
                >
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-infinite-scroll @load="onLoad" :offset="250">
          <div class="q-pt-sm row items-start q-gutter-sm">
            <div v-if="!this.Post.posts.data" style="width:100%">
              <q-card flat bordered class="q-mt-sm" style="width:100%" v-for="n in 3" :key="`loading-${n}`">
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
              v-for="post in Post.posts.data"
              :key="post.id"
              :style="
                `min-height: 30vh;width: 100vw`"
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
import {mapState} from 'vuex'
export default {

  name: 'PostPage',
  components: {
    ItemComponent: () => import("components/post/ItemComponent.vue")
  },
  data() {
    return {

    };
  },
  computed:{
  	...mapState(['Auth','Setting','Post'])
  },
  created(){
  	if (!this.Post.posts.data) this.$store.dispatch("Post/index");
  },
  methods:{
  	onLoad(index, done) {
      this.Post.posts.next_page_url
        ? this.$store.dispatch("Post/next").then(res => done())
        : done();
    },
    onRefresh(done) {
      this.$store.dispatch("Post/index").then(res => {
        done();
      });
    }
  }
};

</script>
<style lang="css" scoped>
</style>
