<template>
  <div>
    <div
      v-if="questionList.pivot.assigment_type.description == 'selectoptions'"
      class="q-gutter-y-md"
    >
      <div
        v-for="(answer_list, n) in questionList.answer_lists"
        :key="`answer-${answer_list.id}`"
        class="row full-width items-center"
        style="border: 1px solid #009688;
                border-radius: 5px;"
        :style="
          `${
            questionList.answer.id == answer_list.id
              ? 'background-color:#4DB6AC;color:white'
              : 'background-color:white;color:black'
          }`
        "
        clickable
        @click="()=>{
            questionList.answer = answer_list  
        }"
      >
        <div class="col-2 items-start text-left q-pt-none text-weight-medium">
          <div
            class="text-center q-pa-xs"
            style="font-size:16px;
                    background: #1B6A9E;
                    border-radius: 5px 0px 25px;
                    color:white"
          >
            {{ getAbc(n) }}
          </div>
        </div>
        <div class="col-11 q-py-sm q-px-md">
          {{ answer_list.name }}
        </div>
      </div>
    </div>
    <div class="q-py-none" v-if="questionList.pivot.assigment_type.description == 'textarea'">
      <q-input
        class="q-pa-sm"
        type="textarea"
        outlined
        dense
         v-model="questionList.answer.name"
        label="Jawaban"
        :rules="[val => !!val || 'Harus diisi']"
        style=""
      />
    </div>
    <div class="q-py-none" v-if="questionList.pivot.assigment_type.description == 'textfield'">
      <q-input
        class="q-pa-sm"
        outlined
        dense
        v-model="questionList.answer.name"
        label="Jawaban"
        :rules="[val => !!val || 'Harus diisi']"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionList: null,
    questionListIndex: null
  },
  data() {
    return {
        color: true,
      isStart: false,
      slide: "style",
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?",
      cek: "selectoptions",
    };
  },
  created() {
    //console.log("asd");
    //console.log(this.assigment);
  },
  computed: {},
  methods: {
    getAbc(n) {
      return String.fromCharCode(97 + n);
    },
    klik() {
      this.color = !this.color;
    },
    openNumber() {
      this.$q
        .dialog({
          component: AssigmentNumber,
          parent: this,
          text: "something"
        })
        .onOk(() => {
          console.log("OK");
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
