<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#009688">
        <div class="row full-width items-center">
          <div class="col-2">
            <q-btn size="16px" flat dense icon="arrow_back" @click="$router.back()" />
          </div>
          <div class="col-8 items-center q-py-sm">
            <div class="text-body2 text-weight-regular text-center" style="font-size:18px">Tantangan Harian</div>
          </div>
          <div class="col-2">
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-card flat>
        <q-item class="q-pa-none">
          <q-item-section>
            <q-card-section class="">
              <div class="text-weight-regular" style="font-size:16px">Anda telah menyelesaikan {{getMissionPercentage}}% misi dari kami. Yuk Semangat!</div>
            </q-card-section>
            <q-card-section class="q-py-none">
              <span class="material-icons" style="color:#4DB6AC;padding-right:4px;font-size:26px">
                fiber_manual_record
              </span>
              <span><b> {{finished}} </b></span>misi telah selesai
            </q-card-section>
            <q-card-section class="q-py-none">
              <span class="material-icons" style="color:#EB5757;padding-right:4px;font-size:26px">
                fiber_manual_record
              </span>
              <span><b> {{unfinished}} </b></span>misi belum selesai
            </q-card-section>
          </q-item-section>
          <q-item-section side>
            <q-card-section class="q-pl-none">
              <apexchart 
                class="q-pt-md"
                width="180" 
                type="donut" 
                :options="options" 
                :series="series"
              >
              </apexchart>
            </q-card-section>
          </q-item-section> 
        </q-item>
      </q-card>
      <q-card flat>
        <q-card-section class="q-pb-sm">
          <div class="text-weight-bold text-h6" style="font-size:26px;width:20%;border-bottom:2px solid #009688">Misi</div>
        </q-card-section>
        <q-card-section class="q-py-none">
          <div class="q-py-xs" v-for="(item,n) in Achievement.items" :key="n">
            <daily-task-item :item="item"></daily-task-item>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { mapState } from "vuex";

import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    DailyTaskItem: () =>import('components/daily-task/DailyTaskItem.vue')
  },
   computed: {
    ...mapState(["Auth", "AssigmentSession", "Setting", "Achievement"]),
      getMissionPercentage(){
        let limit_total=0;
        let value_total=0;
        this.Achievement.items.forEach(v=>{
          limit_total+=v.limit;
          value_total+=v.value;
        });
        return (value_total/limit_total*100).toFixed(2);
      }
  },
  mounted(){
    console.log(this.Achievement.items)
  },
  created(){
     this.$store.dispatch("Auth/getAuth").then(res => {
      //console.log("cek: ", this.Auth.auth);
      this.$store.dispatch("Achievement/calculateDailyTask").then(res => {
        console.log('suskses calculateDailyTask')
        console.log(this.Achievement.items)
        this.Achievement.items.forEach(item=>{
          if(item.value==item.limit){
            this.finished++;
          }else{
            this.unfinished++;
          }
        })
        this.series=[this.finished, this.unfinished]
      
      }).catch(err=>{
        console.log('gagal achievement');
        console.log(err);
      });
    }).catch(err=>{
       //aler
    });
  },
  data() {
    return{
      finished:0,
      unfinished:0,
      options: {
        colors:['#4DB6AC', '#EB5757'],
        chart: {
            width: '100%'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '63%'
            }
          }
        },
        legend: {
          show: false
        },
        pie: {
          donut: {
            size: '100%'
          }
        },
        dataLabels: {
          enabled: false,
        }
      },
      series: [0,0]
    }
  },
   methods: {
      toFloat(n){
          return parseFloat(n)
      }
    }
}
</script>