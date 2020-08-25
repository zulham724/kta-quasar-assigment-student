<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#009688">
            <div class="row full-width items-center">
                <div class="col-2">
                    <q-btn size="16px" flat dense icon="arrow_back" @click="$router.back()" />
                </div>
                <div class="col-8 items-center q-py-sm">
                    <div class="text-body2 text-weight-regular text-center" style="font-size:18px">Statistik</div>
                </div>
                <div class="col-2">
                </div>
            </div>
        </q-toolbar>
    </q-header>
    <q-card flat>
        <q-item class="q-pa-none">
            <q-item-section>
                <q-card-section class="q-pb-xs" v-if="assigments">
                    <div class="text-weight-bold" style="font-size:22px">Dari {{assigments.length}} paket soal</div>
                    <div class="" style="color:#BDBDBD;font-size:16px">yang anda kerjakan</div>
                </q-card-section>
                <q-card-section class="q-py-none">
                    <span class="material-icons" style="color:#7A6180;padding-right:4px;font-size:26px">
                        fiber_manual_record
                    </span>
                    <span><b> {{score.perfect.length}} </b></span>nilai sempurna
                </q-card-section>
                <q-card-section class="q-py-none">
                    <span class="material-icons" style="color:#4DB6AC;padding-right:4px;font-size:26px">
                        fiber_manual_record
                    </span>
                    <span><b> {{score.high.length}} </b></span>nilai tinggi
                </q-card-section>
                <q-card-section class="q-py-none">
                    <span class="material-icons" style="color:#EB5757;padding-right:4px;font-size:26px">
                        fiber_manual_record
                    </span>
                    <span><b> {{score.low.length}} </b></span>nilai rendah
                </q-card-section>
            </q-item-section>
            <q-item-section side>
                <q-card-section class="q-pl-none">
                    <apexchart class="q-pt-md" width="170" type="donut" :options="options" :series="series">
                    </apexchart>
                </q-card-section>
            </q-item-section>
        </q-item>
    </q-card>
    <q-card flat class="q-mb-lg">
        <q-card-section>
            <div class="text-weight-bold" style="font-size:22px">Paket Soal yang kamu kerjakan </div>
        </q-card-section>
        <q-card-section>
            <statistic-chart v-if="assigments" :assigments="assigments"></statistic-chart>
        </q-card-section>
        <q-item-section>

        </q-item-section>
    </q-card>
</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
    components: {
        StatisticChart: () => import('components/StatisticChart.vue')
    },
    created() {
        this.$store.dispatch('Assigment/statistics').then(res => {
            this.assigments = res.data;
            res.data.forEach((v, k) => {
                if (v.total_score >= 100) {
                    this.score.perfect.push(v)
                } else if (v.total_score >= 75) {
                    this.score.high.push(v)
                } else {
                    this.score.low.push(v)
                }
            })
            this.series = [this.score.perfect.length, this.score.high.length, this.score.low.length]
        })

    },
    data() {
        return {
            assigments: null,
            score: {
                perfect: [],
                high: [],
                low: [],
            },
            options: {
                colors: ['#7A6180', '#4DB6AC', '#EB5757'],
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
                },
                labels: ['nilai sempurna', 'nilai tinggi', 'nilai rendah']
            },
            series: [0, 0, 0],
        }
    }
}
</script>
