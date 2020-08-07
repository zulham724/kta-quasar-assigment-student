<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius:15px;">
      <q-card-section class="q-py-md">
        <div class="row full-width items-center justify-between">
          <div class="col-6 text-body1 text-weight-bold">
            Nomor Soal
          </div>
          <div class="col-2 text-center">
            <q-btn flat dense size="16px" @click="hide">
              <span class="material-icons">
                clear
              </span>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="row full-width">
          <div
            class="q-pa-sm q-mx-auto"
            v-for="(question_list, n) in assigmentForSubmit.question_lists"
            :key="question_list.id"
          >
            <div
              class="col-2 text-center q-pa-md cursor-pointer" @click="onOKClick(n) "
              :style="
                `border: 1px solid #80CBC4;border-radius: 5px;${
                  question_list.answer.name
                    ? 'background-color:#6FCF97;color:white'
                    : 'background-color:white;color:black'
                }`
              "
            >
              {{ n + 1 }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    assigmentForSubmit: null,
    questionListIndex:null,
  },
  data() {
    return {
      done: false
    };
  },
  created() {
    // console.log("ntl");
    // console.log(this.assigmentForSubmit);
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },
     onOKClick (n) {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', {questionListIndex:n})
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },
    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },
  }
};
</script>
