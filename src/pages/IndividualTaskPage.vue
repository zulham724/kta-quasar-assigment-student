<template>
  <q-page style="background-color:#ebebe0">
    <div v-if="assigment != null">
      <q-header elevated>
        <q-toolbar style="background-color:teal">
          <q-btn flat dense icon="arrow_back" @click="$router.back()" />
          <q-toolbar-title>
            <div class="text-body1 text-bold">Tugas Mandiri</div>
          </q-toolbar-title>
          <div class="caption text-bold" v-if="isStart">
            Waktu anda {{ timer ? timer : `${assigment.timer} menit` }}
          </div>
        </q-toolbar>
      </q-header>
      <div class="">
        <q-img
          src="https://agaybarho.files.wordpress.com/2016/11
/maxresdefault.jpg?w=1080"
          :ratio="4 / 1.5"
          native-context-menu
          style="width:100%"
        >
        </q-img>
      </div>
      <q-page-container style="padding-top:10px">
        <div class=" q-gutter-md">
          <!-- <q-btn outline rounded color='teal' @click="onStart()" v-if="isStart == false">Mulai</q-btn> -->
          <q-card
            bordered
            elevated
            class="my-card bg-white-1"
            v-if="!isStart"
            @click="isStart = true"
          >
            <q-item v-ripple class="row justify">
              <q-item-section avatar>
                <q-avatar>
                  <q-img
                    src=""
                  ></q-img>
                </q-avatar>
              </q-item-section>
              <q-item-section style="align-items:center">
                <q-item-label
                  class="text-weight-regular text-subtitle2"
                  style="font-size:12px"
                  >{{ assigment.user.name }}</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
                        <q-item-section>gunting</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>batu</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>kertas</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
            <q-item style="padding-top:0px">
              <q-item-section>
                <div
                  class="text-subtitle2 text-weight-regular"
                  style="font-size:12px"
                >
                  {{ assigment.description }}
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable @click="onStart()" v-if="isStart == false">
              <q-item-section class="text-center">
                <div class="text-center no-wrap q-pa-xl">
                  <div class="q-pb-lg">
                    <div class="text-subtitle1 " style="font-size:20px">
                      {{ assigment.topic }}
                    </div>
                    <div class="text-h8 text-weight-light">
                      {{ assigment.subject }}
                    </div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                  <div class="q-pa-md">
                      <div class="" style="color:lightgray;font-size:10px">Lihat Komentar</div>
                  </div>
              </q-item-section>
              <q-item-section side>
                  <q-icon>

                  </q-icon>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <q-form
          @submit="onSubmit"
          ref="form"
          class="full-height q-pt-md"
          v-if="isStart"
        >
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
                  :rules="[val => !!val || 'Harus diisi']"
                >
                  <template v-slot:after>
                    <div>
                      <q-btn
                        round
                        icon="check"
                        :flat="
                          question_list.answer.id != answer_list.id
                            ? true
                            : false
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
                  :rules="[val => !!val || 'Harus diisi']"
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
                  :rules="[val => !!val || 'Harus diisi']"
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
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  props: {
    assigmentId: null
  },
  data() {
    return {
      assigment: null,
      loading: false,
      step: 1,
      isTime: false,
      isStart: false,
      timer: null,
      session: {}
    };
  },
  computed: {
    ...mapState(["Setting"])
  },
  created() {
    if (this.assigmentId) this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("Assigment/show", this.assigmentId).then(res => {
        this.assigment = {
          ...res.data,
          question_lists: [
            ...res.data.question_lists.map(item => {
              item.answer = {};
              return item;
            })
          ]
        };
        this.session = {
          questions: this.assigment.question_lists
        };
      });
    },
    onStart() {
      const start = moment().add(10,'seconds')
      setInterval(()=>{
        this.timer = `${start.diff(moment(),'minutes')} Menit 
                      ${start.diff(moment(),'seconds')} Detik`
      },1000)
      clearInterval(this.timer)
      `${start.diff(moment(),'seconds')} Detik` == 0 ? this.getonSubmit() : null
    },
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (
          success &&
          this.assigment.question_lists.filter(item =>
            !item.answer ? item : null
          ).length == 0
        ) {
          this.$router.push({
            name: "result",
            params: {
              assigment: this.assigment
            }
          });
        } else {
          this.$q.notify("Periksa apakah semua telah terisi dengan benar");
        }
      });
    }
  }
};
</script>

<style></style>
