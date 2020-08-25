<template>
<div>
    <q-header>
        <q-toolbar :style="
          `${
            isStart == true
              ? 'background-color:#009688'
              : 'background-color:#005951'
          }`
        ">
            <q-btn flat dense icon="arrow_back" style="font-size:20px" @click="$router.back()" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:18px">
                    Kembali
                </div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page class="">
        <div v-if="!isStart" style="background-size: cover;background-image:url('statics/star-background.png');min-height:inherit">
            <div class="column" style="min-height:0px">
                <div class="col-4">
                    <q-card class="shadow-10 q-mb-xl" style="border-bottom-left-radius:30px;
              border-bottom-right-radius:30px;
              background-color:#005951">
                        <q-card-section class="q-px-xl q-pt-lg q-pb-sm text-center" style="font-size:18px">
                            <div class="text-weight-medium" style="color:#B2DFDB">
                                Soal {{ assigment.name }}
                            </div>
                            <div class="text-white">
                                {{ assigment.topic }}
                            </div>
                            <div class="text-weight-light" style="color:white">
                                Oleh: {{ assigment.teacher.name }}
                            </div>
                            <div class="text-weight-light" style="color:white">
                                Kelas: {{ assigment.grade.description }}
                            </div>
                            <div class="text-weight-light" style="color:white">
                                Semester {{ assigment.semester }}
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <q-item class="text-center q-pa-sm">
                                <q-item-section class="text-center q-pr-sm q-pl-xl">
                                    <q-btn flat outline dense no-caps color="black" style="border-radius:5px;background-color:white">
                                        <span class="material-icons" style="color:#EB5757;padding-right:5px">
                                            timer
                                        </span>
                                        120 m
                                    </q-btn>
                                </q-item-section>
                                <q-item-section class="text-center q-pl-sm q-pr-xl">
                                    <q-btn flat outline no-caps dense color="black" style="border-radius:5px;background-color:white">
                                        <span class="material-icons" style="color:#80CBC4;padding-right:5px">
                                            bubble_chart
                                        </span>
                                        {{ assigment.question_lists.length }} Soal
                                    </q-btn>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-8" style=" height:-webkit-fill-available">
                    <div style="background-color:transparent;" class="q-pa-xl">
                        <div class="text-center">
                            <q-item>
                                <q-item-section>
                                    <div class="q-pt-xl q-mt-xl text-weight-light" style="font-size:16px;color:white">
                                        Sudah Siap?
                                    </div>
                                </q-item-section>
                            </q-item>
                            <q-item class="q-px-xl">
                                <q-item-section>
                                    <q-btn class="q-py-xs text-weight-light" rounded flat no-caps color="white" style="background-color:#009688; font-size:16px" @click="start()">
                                        Kerjakan
                                    </q-btn>
                                </q-item-section>
                            </q-item>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isStart">
            <div class="row full-width justify-between" style="background-color:#009688">
                <div class="col-4 q-pl-md" style="font-size:16px">
                    <q-btn class="text-weight-regular q-px-xs" flat dense style="background-color:white">
                        <span class="material-icons" style="color:#80CBC4;font-size:20px;padding-right:5px">
                            timer
                        </span>
                        1 : 25 : 49
                    </q-btn>
                </div>
                <div class="col-4 text-right q-pr-xs" clickable @click="openNumber()">
                    <q-btn flat dense>
                        <span class="material-icons" style="color:white;font-size:32px;padding-right:5px">
                            apps
                        </span>
                    </q-btn>
                </div>
            </div>

            <div class="q-pt-md q-pb-none text-center" style="background-color:#009688">
                <div style="color:#FFC735;font-size:18px">
                    Soal ke {{ questionListIndex + 1
            }}<span style="color:#FFD567;font-size:12px">
                        /{{ assigment.question_lists.length }}</span>
                </div>

                <q-tab-panels v-model="tab" animated style="background-color:#009688">
                    <q-tab-panel :name="`${assigment.code}-${n}`" v-for="(question_list, n) in assigment.question_lists" :key="`question-${question_list.id}`">
                        <div style="color:white;font-size:16px">
                            {{ question_list.name }}
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>

            <q-img no-default-spinner src="~assets/wave-background.png" style="width:100%"></q-img>
            <div class="q-pa-none">
                <q-tab-panels v-model="tabAnswer" animated>
                    <q-tab-panel style="max-width:100%" :name="`${assigment.code}-answer-${n}`" v-for="(question_list, n) in assigmentForSubmit.question_lists" :key="`answer-${question_list.id}`">
                        <item-answer-list-component :question-list="question_list"></item-answer-list-component>
                    </q-tab-panel>
                </q-tab-panels>

                <!-- <q-scroll-area style="max-width:100%;height:50vh;">

            <div class="q-py-lg" v-if="cek == 'selectoptions'">
              <div class="q-py-sm" v-for="n in 4" :key="n">
                <div
                  class="row full-width items-center"
                  style="border: 1px solid #009688;
                border-radius: 5px;"
                  :style="
                    `${
                      color == true
                        ? 'background-color:#4DB6AC;color:white'
                        : 'background-color:white;color:black'
                    }`
                  "
                  clickable
                  @click="klik()"
                >
                  <div
                    class="col-2 items-start text-left q-pt-none text-weight-medium"
                  >
                    <div
                      class="text-center q-pa-xs"
                      style="font-size:16px;
                    background: #1B6A9E;
                    border-radius: 5px 0px 25px;
                    color:white"
                    >
                      a
                    </div>
                  </div>
                  <div class="col-11 q-py-sm q-px-md">
                    Alkasih alkali aljam asada
                  </div>
                </div>
              </div>

            </div>
            <div class="q-py-lg" v-if="cek == 'textfield'">
              <q-input
                class="q-pa-sm"
                outlined
                dense
                label="Jawaban"
                v-model="model"
                :rules="[val => !!val || 'Harus diisi']"
              />
            </div>
            <div class="q-py-lg" v-if="cek == 'textarea'">
              <q-input
                class="q-pa-sm"
                type="textarea"
                outlined
                dense
                v-model="model"
                label="Jawaban"
                :rules="[val => !!val || 'Harus diisi']"
                style=""
              />
            </div>
          </q-scroll-area>-->
            </div>
        </div>
    </q-page>
    <q-footer v-if="isStart" style="background-color:white;" class="fixed-bottom">
        <div class="row full-width">
            <div class="col-4 text-left q-pr-xl" clickable @click="questionListIndex--" v-if="questionListIndex > 0">
                <div class="text-center text-weight-light q-pt-md" style="color:white;
            background-color:#BDBDBD;
            height:75px;
            border-top-right-radius:100px;
            border-bottom-right-radius: 40px">
                    <div class="text-left q-pl-md">
                        <span class="material-icons" style="font-size:26px">
                            keyboard_arrow_left
                        </span>
                    </div>
                    Kembali
                </div>
            </div>
            <div :class="
            `col-4 ${questionListIndex == 0 ? 'offset-4' : ''} text-center`
          ">
                <div style="font-size:48px;color:#009688">
                    {{ questionListIndex + 1 }}
                    <span style="font-size:18px;color:#80CBC4">/ {{ assigment.question_lists.length }}</span>
                </div>
            </div>
            <div class="col-4 text-right q-pl-xl" clickable @click="questionListIndex++" v-if="questionListIndex < assigment.question_lists.length - 1">
                <div class="text-center text-weight-light q-pt-lg" style="color:white;
            background-color:#009688;
            height:75px;
            border-top-left-radius:100px;
            border-bottom-left-radius: 40px">
                    <div class="text-right q-pr-md">
                        <span class="material-icons" style="font-size:26px">
                            keyboard_arrow_right
                        </span>
                    </div>
                    Lanjut
                </div>
            </div>
            <div class="col-4 text-right q-pl-xl" clickable @click="submit" v-if="questionListIndex == assigment.question_lists.length - 1">
                <div clickable class="text-center text-weight-light q-pt-lg" style="color:white;
            background-color:#F2994A;
            height:75px;
            border-top-left-radius:100px;
            border-bottom-left-radius: 40px">
                    <div class="text-right q-pr-md">
                        <span class="material-icons" style="font-size:26px">
                            done
                        </span>
                    </div>
                    Submit
                </div>
            </div>
        </div>
    </q-footer>
</div>
</template>

<script>
import AssigmentNumber from "components/AssigmentNumber";
import {
    mapState
} from "vuex";
export default {
    props: {
        assigment: null
    },
    components: {
        ItemAnswerListComponent: () =>
            import("components/quiz/ItemAnswerListComponent")
        //ItemQuestionListComponent: () =>import("components/announcement/AnnouncementList.vue")
    },
    data() {
        return {
            assigmentForSubmit: null,
            //tab:'mails',
            questionListIndex: 0,
            isStart: false,
            cek: "selectoptions",
            color: "false"
        };
    },
    created() {
        // console.log("asd");
        // console.log(this.assigment);
        if (!this.assigment) this.$router.push({
            name: "assigment"
        });
        else this.init();
    },
    mounted() {},
    computed: {
        ...mapState(["Setting", "AssigmentSession", "Auth"]),
        tab: function () {
            return this.assigment.code + "-" + this.questionListIndex;
        },
        tabAnswer: function () {
            return this.assigment.code + "-answer-" + this.questionListIndex;
        }
    },
    methods: {
        init() {
            this.$store
                .dispatch("Assigment/show", {
                    assignmentId: this.assigment.id
                })
                .then(res => {
                    this.assigmentForSubmit = {
                        teacher: this.assigment.teacher,
                        ...res.data,
                        teacher_id: this.assigment.teacher.id,
                        question_lists: [
                            ...res.data.question_lists.map(item => {
                                if (
                                    item.pivot.assigment_type.description == "textfield" ||
                                    item.pivot.assigment_type.description == "textarea"
                                )
                                    item.answer = {
                                        id: item.answer_lists[0].id,
                                        name: null
                                    };
                                else item.answer = {};
                                return item;
                            })
                        ]
                    };
                    // console.log(this.assigment);
                    this.session = {
                        questions: this.assigment.question_lists
                    };
                    console.log("cek assigment :");
                    console.log(this.assigmentForSubmit);
                });
        },
        start() {
            this.isStart = true;
        },
        submit() {
            let indikator = -1;
            try {
                this.assigmentForSubmit.question_lists.forEach((item, k) => {
                    console.log(item)
                    if (!item.answer.name) {
                        console.log('item')
                        console.log(item)
                        indikator = k;
                        throw BreakException;
                    }
                });
                this.$router.push({
                    name: "result",
                    params: {
                        assigmentForSubmit: this.assigmentForSubmit
                    }
                });
            } catch (e) {
                this.$q.notify("Pastikan semua soal sudah terjawab");
                this.questionListIndex = indikator
                //if (e !== BreakException) throw e;
            }
        },
        openNumber() {
            this.$q
                .dialog({
                    component: AssigmentNumber,
                    parent: this,
                    assigmentForSubmit: this.assigmentForSubmit,
                    questionListIndex: this.questionListIndex
                })
                .onOk(data => {
                    //console.log(data);
                    this.questionListIndex = data.questionListIndex;
                })
                .onCancel(() => {
                    console.log("Cancel");
                })
                .onDismiss(() => {
                    console.log("Called on OK or Cancel");
                });
        }
    }
};
</script>
