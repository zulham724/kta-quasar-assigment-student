<template>
<div>
    <div id="chart">
        <q-select dense v-model="model" :options="options" label="Selama" @input="update" />

        <div id="chart-timeline">
            <apexchart type="line" height="350" ref="chart" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
    <div v-if="current_range.begin">
        Dari tanggal {{$moment(current_range.begin).format('D MMMM YYYY')}} hingga {{$moment(current_range.end).format('D MMMM YYYY')}} Anda mendapatkan
        <div class="row">
            <span class="material-icons" style="color:#7A6180;padding-right:4px;font-size:26px">
                fiber_manual_record
            </span>
            <span><b> {{score_count.perfect}} </b></span>&nbsp;nilai sempurna
        </div>
        <div class="row">
            <span class="material-icons" style="color:#4DB6AC;padding-right:4px;font-size:26px">
                fiber_manual_record
            </span>
            <span><b> {{score_count.high}} </b></span>&nbsp;nilai tinggi
        </div>
        <div class="row">
            <span class="material-icons" style="color:#EB5757;padding-right:4px;font-size:26px">
                fiber_manual_record
            </span>
            <span><b> {{score_count.low}} </b></span>&nbsp;nilai rendah
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        assigments: null,
    },
    created() {
        this.current_range.begin = this.assigments[0].timestamp;
        this.current_range.end = this.assigments[this.assigments.length - 1].timestamp;
        this.updateScore();
        //alert(this.$moment().subtract(1, 'months').format('X') * 1000);
        //alert(this.$moment().format('X') * 1000);
        let data = [];
        if (this.assigments) {
            this.assigments.forEach((v, k) => {
                data.push([v.timestamp, v.total_score]);
            });
            this.series = [{
                data: data
            }]
        }
    },
    data() {
        return {
            model: {
                label: 'Semua waktu',
                value: 'all'
            },
            score_count: {
                perfect: 0,
                high: 0,
                low: 0
            },
            current_range: {
                begin: null,
                end: null,
            },
            options: [{
                    label: 'Semua waktu',
                    value: 'all'
                },

                {
                    label: '1 Minggu',
                    value: '1weeks'
                },
                {
                    label: '2 Minggu',
                    value: '2weeks'
                },
                {
                    label: '3 Minggu',
                    value: '3weeks'
                },
                {
                    label: '1 Bulan',
                    value: '1months'
                },
                {
                    label: '2 Bulan',
                    value: '2months'
                },
                {
                    label: '3 Bulan',
                    value: '3months'
                },
                {
                    label: '4 Bulan',
                    value: '4months'
                },
                {
                    label: '5 Bulan',
                    value: '5months'
                },
                {
                    label: '6 Bulan',
                    value: '6months'
                },
                {
                    label: '1 Tahun',
                    value: '1years'
                },

            ],
            series: [{
                data: [
                    //[0,0]
                ]
            }],
            chartOptions: {
                chart: {
                    id: 'area-datetime',
                    type: 'area',
                    height: 350,
                    zoom: {
                        autoScaleYaxis: true
                    }
                },

                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                    style: 'hollow',
                },
                xaxis: {
                    type: 'datetime',
                    //min: this.$moment().subtract(1, 'years').format('X') * 1000,
                    tickAmount: 6,
                },
                tooltip: {
                    x: {
                        format: 'dd MMM yyyy'
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100]
                    }
                },
            },
            selection: 'one_year',
        }
    },
    methods: {
        update: function () {
            //alert(this.$moment());
            if (this.model.value == 'all') {
                this.current_range.begin = this.assigments[0].timestamp;
                this.current_range.end = this.assigments[this.assigments.length - 1].timestamp;
                this.$refs.chart.resetSeries();
            } else {
                console.log(this.model.value.substr(0, 1) + ' ' + this.model.value.substr(1));

                this.current_range.begin = this.$moment().subtract(this.model.value.substr(0, 1), this.model.value.substr(1)).format('X') * 1000;
                this.current_range.end = this.$moment().format('X') * 1000;

                //alert(this.current_range.end)
                this.$refs.chart.zoomX(this.current_range.begin, this.current_range.end)
            }
            this.updateScore();

        },
        updateScore: function () {
            this.score_count.low = this.score_count.high = this.score_count.perfect = 0;
            this.assigments.forEach(v => {
                if (v.timestamp >= this.current_range.begin && v.timestamp <= this.current_range.end) {
                    if (v.total_score >= 100) this.score_count.perfect++;
                    else if (v.total_score >= 75) this.score_count.high++;
                    else this.score_count.low++;
                }
            })
        }

    }
}
</script>
