<template>
  <div>
    <q-card 
      class="q-pa-none"
      flat 
      style="background-size:cover;
      background-image: url('statics/training-background.png');
      border-radius:15px;color:black"
      clickable
       @click="$router.push({'name':'trainingquizpage', params:{assigment:assigment}})"
    >
      <q-item class="q-pa-none">
        <q-item-section>
          <q-card-section class="q-py-none">
          
          <div class="q-gutter-sm q-my-sm">
          <q-badge class="text-body2" style="background:#009688"><q-icon class="q-mr-xs" name="school"/>{{assigment.grade.description}}</q-badge>
          <q-badge class="text-body2" style="background:#009688"><q-icon class="q-mr-xs" name="date_range"/>{{moment(assigment.created_at).format("DD MMMM YYYY HH:mm")}}</q-badge>
          </div>
          

          </q-card-section>
          <q-card-section class="q-py-none">
            <div class="text-h6">{{assigment.name}}</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-pb-lg">
            <div class="text-caption" >{{assigment.topic}}</div>
            <div class="text-caption" style="font-size:14px">Oleh {{assigment.user.name}}</div>
          </q-card-section>
        </q-item-section>
      </q-item>
      
    </q-card>
  </div>
</template>

<script>
import { date } from 'quasar';
import moment from "moment";

export default {
  props:{
    assigment:null,
  },
    data() {
      return{
        nilai:0
      }
    },
    methods:{
      moment(date){
        return moment(date)
      }
    }
}
</script>