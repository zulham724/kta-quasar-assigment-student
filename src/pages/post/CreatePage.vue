<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-teal">
        <q-btn
          flat
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <q-toolbar-title>
          <div class="text-body1 text-bold">Buat Diskusi</div>
        </q-toolbar-title>
        <q-space />
        <q-btn flat label="Posting" @click="store()" :loading="loading" :disable="loading" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <q-form ref="form" @submit="onSubmit" class="q-gutter-md">
          <div class="row">
            <div class="col-2 self-center">
              <q-avatar size="lg">
                <img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" />
              </q-avatar>
            </div>
            <div class="col=10 self-center">
              {{ Auth.auth.name }}
            </div>
          </div>
          <q-input
            color="teal"
            v-model="post.body"
            type="textarea"
            outlined
            autogrow
            label="Diskusi hari ini*"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
        </q-form>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  props:{
    postToEdit:null,
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      loading: false,
      post: {},
      files: [],
      images: []
    };
  },
  created:function(){
    console.log('cok')
    console.log(this.postToEdit)
  },
  mounted() {},
  methods: {
    onSubmit() {},
    check() {
      this.files.map(file => {
        this.toBase64(file).then(res => {
          this.images.push(res);
          this.$forceUpdate();
          return file;
        });
      });
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    store() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.loading = true;
          this.$q.notify('Tunggu sebentar')
          this.$router.back();
          let formData = new FormData();
          this.files.forEach(file => {
            formData.append("files[]", file);
          });
          formData.append("title", "KTA POST");
          formData.append("body", this.post.body);
          formData.append("status", "PUBLISHED");
          formData.append("featured", 0);

          this.$store
            .dispatch("Post/store", formData)
            .then(res => {
              this.sendNotif(res.data);
              this.$store.dispatch('Auth/getAuth')
              this.$q.notify("Berhasil");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    sendNotif(post){
      const payload = {
        title: `AGPAII DIGITAL`,
        body: `Postingan baru dari ${this.Auth.auth.name} - ${this.post.body}`,
        params:{
          sender_id: this.Auth.auth.id,
          target_id: post.id,
          target_type: `Post`,
          text: `Postingan baru dari ${this.Auth.auth.name} - ${this.post.body}`,
        },
        to: `/topics/posts`
      }
      this.$store.dispatch('Notif/send',payload).then(res=>{
        console.log(res)
      })
    }
  }
};
</script>

<style></style>
