<template>
  <div>
    <q-card 
      class="q-pa-none"
      flat 
      style="background-size:cover;
      background-image: url('statics/training-background.png');
      border-radius:15px;color:black"
      clickable
      @click="$router.push({name:'review', params:{assigment:assigment, session:session}})"
    >
     <q-item class="q-pa-none q-ma-none" >
        <q-item-section>
        
          <q-card-section class="q-pb-none">
            <div class="text-h6" style="word-wrap:break-word">
              {{assigment.name}}
            </div>
          </q-card-section>
          <q-card-section class="q-py-none">
            <div class="text-caption" style="font-size:14px">Oleh {{assigment.user?assigment.user.name:''}}</div>
          </q-card-section>
          <q-card-section class="q-py-sm">
           
          </q-card-section>
        </q-item-section>
        <q-item-section side top class="q-pa-none text-right" style="padding-left:0px" >
          <div 
          v-if="session.pivot.total_score!=null"
            class="q-pa-md text-center" 
            :style="`background-color:${session.pivot.total_score>=60?'#27AE60':'#EB5757'};
            color:white;font-size:20px;
            border-radius: 25px 0px 25px 25px;`"
          > 
            {{session.pivot.total_score}}
          </div>
          <div v-else class="q-pa-xs text-center" 
            style="background-color:#F2C94C;position:relative;
            color:white;font-size:14px;
            border-radius: 25px 0px 25px 25px;
            width:70px">
          Belum dinilai
          </div>
        </q-item-section>
      </q-item>
      <div class="q-px-md q-pb-md"> 
        <div class="q-gutter-sm">
          <q-badge class="text-body2" style="background:#009688"><q-icon class="q-mr-xs" name="school"/>{{assigment.grade.description}}</q-badge>
          <q-badge class="text-body2" style="background:#009688"><q-icon class="q-mr-xs" name="date_range"/>{{session.created_at}}</q-badge>
          </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
    props:{
      assigment:null,
      session:null
    },
    computed:{
        getAssigmentDate(){
        //20 / 03 / 2020
        return this.session.created_at;
      }
    },
    data() {
      return{
        nilai:0
      }
    }
}
</script>