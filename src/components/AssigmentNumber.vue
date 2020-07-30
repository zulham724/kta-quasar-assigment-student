<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius:15px;">
      <q-card-section class="q-py-md">
        <div class="row full-width items-center justify-between">
          <div class="col-6 text-body1 text-weight-bold">
            Nomor Soal
          </div>
          <div class="col-2 text-center">
            <q-btn flat dense size="16px">
              <span class="material-icons">
                clear
              </span>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="row full-width">
          <div class="q-pa-sm q-mx-auto" v-for="n in 16" :key="n">
            <div 
              class="col-2 text-center q-pa-md" 
              style="border: 1px solid #80CBC4;border-radius: 5px"
              :style="`${done == true ? 'background-color:#6FCF97;color:white' : 
              'background-color:white;color:black'}`"
              >
                12
              </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data(){
    return{
      done:false
    }
  },
  methods:{
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
  }
}
</script>