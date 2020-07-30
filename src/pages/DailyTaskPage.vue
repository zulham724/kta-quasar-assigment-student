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
              <div class="text-weight-regular" style="font-size:16px">Anda telah menyelesaikan 70% misi dari kami. Yuk Semangat!</div>
            </q-card-section>
            <q-card-section class="q-py-none">
              <span class="material-icons" style="color:#4DB6AC;padding-right:4px;font-size:26px">
                fiber_manual_record
              </span>
              <span><b> 5 </b></span>misi telah selesai
            </q-card-section>
            <q-card-section class="q-py-none">
              <span class="material-icons" style="color:#EB5757;padding-right:4px;font-size:26px">
                fiber_manual_record
              </span>
              <span><b> 1 </b></span>misi belum selesai
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
          <div class="q-py-xs" v-for="n in 5" :key="n">
            <daily-task-item></daily-task-item>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    DailyTaskItem: () =>import('components/daily-task/DailyTaskItem.vue')
  },
  data() {
    return{
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
      series: [4,1]
    }
  }
}
</script>