<template>
  <div v-if="assigment != null">
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-bold">Quiz</div>
        </q-toolbar-title>
        <div class="caption text-bold">Waktu anda {{ timer ? timer : `${assigment.timer} menit` }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
        <div class="row justify-center">
          <q-btn outline rounded color='teal' @click="onStart()" v-if="isStart == false">Mulai</q-btn>
        </div>
        <q-form @submit="onSubmit" ref="form" class="full-height" v-if="isStart">
          <q-stepper
            v-model="step"
            vertical
            color="primary"
            animated
            class="full-height"
          >
            <q-step
              v-for="(question_list, ql) in assigment.question_lists"
              :key="question_list.id"
              :name="ql + 1"
              :title="`Soal nomor ${ql + 1}`"
              icon="settings"
              :done="step > 1"
            >
              <div class="text-body1">{{ question_list.name }}</div>

              <div
                v-if="
                  question_list.pivot.assigment_type.description ==
                  'selectoptions'
                "
              >
                <q-input
                  disable
                  class="q-pa-sm"
                  rounded
                  outlined
                  dense
                  v-for="answer_list in question_list.answer_lists"
                  :key="answer_list.id"
                  v-model="answer_list.name"
                  :rules="[(val) => !!val || 'Harus diisi']"
                >
                  <template v-slot:after>
                    <div>
                      <q-btn
                        round
                        icon="check"
                        :flat="
                          question_list.answer.id != answer_list.id ? true : false
                        "
                        :color="
                          question_list.answer.id == answer_list.id
                            ? 'green-4'
                            : null
                        "
                        @click="
                          () => {
                            question_list.answer = answer_list;
                            $forceUpdate();
                          }
                        "
                      />
                    </div>
                  </template>
                </q-input>
              </div>

              <div
                v-if="
                  question_list.pivot.assigment_type.description == 'textfield'
                "
              >
                <q-input
                  class="q-pa-sm"
                  rounded
                  outlined
                  dense
                  v-model="question_list.answer"
                  :rules="[(val) => !!val || 'Harus diisi']"
                />
              </div>

              <div
                v-if="
                  question_list.pivot.assigment_type.description == 'textarea'
                "
              >
                <q-input
                  class="q-pa-sm"
                  type="textarea"
                  rounded
                  outlined
                  dense
                  v-model="question_list.answer"
                  :rules="[(val) => !!val || 'Harus diisi']"
                />
              </div>

              <q-stepper-navigation class="row justify-end">
                <q-btn
                  v-if="ql != 0"
                  flat
                  @click="step = step - 1"
                  color="primary"
                  label="Kembali"
                  class="q-ml-sm"
                />
                <q-btn
                  v-if="ql + 1 != assigment.question_lists.length"
                  outline
                  rounded
                  @click="step++"
                  color="primary"
                  label="Lanjut"
                />
                <q-btn
                  v-if="ql + 1 == assigment.question_lists.length"
                  outline
                  rounded
                  @click="onSubmit"
                  color="primary"
                  label="Selesai"
                  :loading="loading"
                  :disable="loading"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-form>
      </q-page-container>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
export default {
  props:{
    assigmentId: null
  },
  data(){
    return {
      assigment: null,
      loading: false,
      step: 1,
      isStart: false,
      timer: null,
      session: {}
    }
  },
  computed:{
    ...mapState(['Setting'])
  },
  created(){
    if(this.assigmentId) this.init();
  },
  methods:{
    init(){
      this.$store.dispatch('Assigment/show',this.assigmentId).then(res=>{
        this.assigment = res.data = {
          ...res.data,
          question_lists:[
            ...res.data.question_lists.map(item=>{
              item.answer = {}
              return item
            })
          ]
        }
        this.session = {
          questions: this.assigment.question_lists
        }
      })
    },
    onStart(){
      this.isStart = true
      const start = moment().add(25,'minutes')
      setInterval(()=>{
        this.timer = `${start.diff(moment(),'minutes')} Menit ${start.diff(moment(),'seconds')} Detik`
      },1000)
    },
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (
          success &&
          this.assigment.question_lists.filter((item) =>
            !item.answer ? item : null
          ).length == 0
        ) {
          this.$router.push({
            name: "quizresult",
            params: {
              assigment: this.assigment,
            },
          });
        } else {
          this.$q.notify("Periksa apakah semua telah terisi dengan benar");
        }
      });
    },
  }
}
</script>

<style>

</style>
