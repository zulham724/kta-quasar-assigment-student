<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section>
        <q-form>
          <q-item style="padding-left:0px; padding-right:0px">
            <q-item-section>
              <q-input color="teal" type="text" v-model="code" label="Masukan kode soal" />
            </q-item-section>
            <q-item-section :style="`${this.code1 == true? 'visibility:visible' : 'visibility:hidden'}`" side>
              <span class="material-icons" style="color:teal; font-size:22px">done</span>
            </q-item-section>
          </q-item>
          <q-item style="padding-left:0px; padding-right:0px">
            <q-item-section>
              <q-input color="teal" type="text" v-model="KTAID" label="Masukan KTA ID guru" />
            </q-item-section>
            <q-item-section :style="`${this.code2 == true? 'visibility:visible' : 'visibility:hidden'}`" side>
              <span class="material-icons" style="color:teal; font-size:20px">done</span>
            </q-item-section>
          </q-item> 
        </q-form>
      </q-card-section>
      <q-card-section style="" align="center" v-if="isBiodata">
         <div style="padding-top:10px">
            <q-avatar size="30vw">
              <q-img
                :src="`${Setting.storageUrl}/${user.avatar}`"
                no-default-spinner
              />
            </q-avatar>
         </div>
         <div class="text-h6 q-mt-md" style="background-color:#ffffe6">
           {{ user.name }}
         </div>
         <div class="" style="background-color:#ffffe6">
           {{ user.kta_id }}
         </div>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions v-if="isMasuk" align="center">
        <q-btn
          color="teal"
          label="Masuk"
          @click="onMasukClick"
        />
      </q-card-actions>
      <q-card-actions v-if="!isMasuk" align="right">
        <q-btn flat label="Batal" @click="onCancelClick" />
        <q-btn
          color="teal"
          label="Cari"
          @click="onOKClick"
          :loading="loading"
          :disable="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    // ...your custom props
  },
  data() {
    return {
      code: "",
      KTAID:"",
      code1: false,
      code2: false,
      isSearch: true,
      isMasuk: false,
      isBiodata: false,
      user:{
      },
      assigment:{

      },
      loading: false
    };
  },
  computed: {
    ...mapState(["Auth","Setting",'EducationalLevel'])
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })
    //   like().then(o=>{
    //     like2().then(o=>{
    //         like().
    //     })
    // })

      // this.verifikasiCode().then( i => {
      //   this.verifikasiKTAID().then(i => {
      //     if ((this.code1 == true) && (this.code2 == true)){
      //       this.isMasuk = true;
      //       console.log("ismasuk: ", this.isMasuk)
      //     } else {
      //       console.log("ga masuk")
      //     }
      //   });
      // });
      this.loading = true;
      this.$store
        .dispatch("Assigment/search", { code: this.code })
        .then(res => {
          if(res.data.id){
            this.code1 = true
          } else {
            this.$q.notify("Kode soal tidak ditemukan")
          }
          this.assigment = res.data
          if ((this.code1 == true) && (this.code2 == true)){
            this.isMasuk = true;
          } else {
            null;
          }
        })
        .catch(err => {
          this.$q.notify(err.response.message);
        })
        .finally(() => {
          this.loading = false;
        });

        this.$store
        .dispatch("User/searchUserAssigment", { code: this.KTAID })
        .then(res => {
          if(res.data.id){
            this.code2 = true;
            this.user = res.data
            this.isBiodata = true;
            this.$q.notify("KTA ID Ditemukan");
          } else {
            this.$q.notify("KTA ID Tidak ditemukan")
          }
          if ((this.code1 == true) && (this.code2 == true)){
            this.isMasuk = true;
          } else {
            null;
        }
        })
        .catch(err => {
          this.$q.notify(err.response.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    verifikasiCode() {
      this.loading = true;
      this.$store
        .dispatch("Assigment/search", { code: this.code })
        .then(res => {
          if(res.data.id){
            this.code1 = true
          } else {
            this.$q.notify("Kode soal tidak ditemukan")
          }
          this.assigment = res.data
        })
        .catch(err => {
          this.$q.notify(err.response.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    verfikasiKTAID() {
      this.$store
        .dispatch("User/searchUserAssigment", { code: this.KTAID })
        .then(res => {
          if(res.data.id){
            this.code2 = true;
            this.user = res.data
            this.isBiodata = true;
            this.$q.notify("KTA ID Ditemukan");
          } else {
            this.$q.notify("KTA ID Tidak ditemukan")
          }
        })
        .catch(err => {
          this.$q.notify(err.response.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    onMasukClick() {
      // this.$router.push(`/quiz/${this.assigment.id}`);
      this.$router.push({
            path:`/quiz/${this.assigment.id}/${this.user.id}`
          });
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  }
};
</script>
