<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section>
        <q-form>
          <q-input color="teal" type="text" v-model="code" label="Masukan kode" />
        </q-form>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
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
export default {
  props: {
    // ...your custom props
  },
  data() {
    return {
      code: "",
      loading: false
    };
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
      this.loading = true;
      this.$store
        .dispatch("Assigment/search", { code: this.code })
        .then(res => {
          if(res.data.id){
            this.$router.push(`/quiz/${res.data.id}`);
            this.$q.notify("Ditemukan");
          } else {
            this.$q.notify("Tidak ditemukan")
          }
        })
        .catch(err => {
          this.$q.notify(err.response.message);
        })
        .finally(() => {
          this.loading = false;
        });
      // then hiding dialog
      // this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  }
};
</script>
