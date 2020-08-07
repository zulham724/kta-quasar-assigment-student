<template>
    <div style="color:white;font-size:16px">{{questionList.name}}</div>
</template>

<script>
export default {
    props:{
      questionList:null,
      questionListIndex:null
    },
    data() {
      return{ 
        tab:'mails',
        isStart:false,
        slide: 'style',
        lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?',
        cek:"selectoptions",
        color:"false"
      }
    },
    created(){
      console.log("asd")
      console.log(this.assigment)
    },
    computed:{
     
    },
    methods:{
      start(){
        this.isStart=true
      },
      klik() {
        this.color= !this.color
      },
      openNumber(){
          this.$q.dialog({
          component: AssigmentNumber,
          parent: this,
          text: 'something',
        }).onOk(() => {
          console.log('OK')
        }).onCancel(() => {
          console.log('Cancel')
        }).onDismiss(() => {
          console.log('Called on OK or Cancel')
        })
      },
    },
}
</script>
