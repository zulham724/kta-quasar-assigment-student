<template>
<div>
    <q-card flat class="q-pa-none" style="background-size:cover;background-image: url('statics/assigment-background.png');
      border-radius:15px;
      color:white">
        <q-item class="q-pa-none">
            <q-item-section>
                <q-card-section class="q-pb-none">
                    <div class="text-h6" style="word-wrap:break-word">
                        {{session.assigments[0].name}}
                    </div>
                </q-card-section>
                <q-card-section class="q-py-none">
                    <div class="text-caption" style="font-size:14px">Oleh {{session.assigments[0].teacher?session.assigments[0].teacher.name:''}}</div>
                    <div class="text-caption">Kode soal: {{session.assigments[0].teacher?session.assigments[0].code:''}}</div>
                </q-card-section>

                <div class="q-py-sm q-pl-sm" style="">
                    <q-item class="q-px-none">
                        <!--<q-item-section avatar style="padding-right:5px">
                <q-btn 
                  class="text-weight-regular q-px-sm" 
                  dense
                  rounded 
                  flat 
                  style="color:#EB5757;background-color:white;font-size:12px"
                >
                  <span class="material-icons" style="color:#EB5757;padding-right:4px;font-size:16px">
                    access_time
                  </span>
                  120 m
                </q-btn>
              </q-item-section>-->
                        <q-item-section avatar style="padding-right:5px">
                            <q-btn class="text-weight-regular q-px-sm" dense rounded flat style="color:#EB5757;background-color:white;font-size:12px">
                                <span class="material-icons" style="color:#EB5757;padding-right:4px;font-size:16px">
                                    school
                                </span>
                                {{session.assigments[0].grade.description}}
                            </q-btn>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn class="text-weight-regular q-px-sm" dense rounded flat style="color:black;background-color:white;font-size:12px">
                                <span class="material-icons" style="color:#009688;padding-right:4px;font-size:16px">
                                    date_range
                                </span>

                                {{getSessionDate}}
                            </q-btn>
                        </q-item-section>
                    </q-item>
                </div>
            </q-item-section>
            <q-item-section side top class="q-pa-none text-right" style="padding-left:0px">
                <div v-if="session.assigments[0].pivot.total_score!=null" class="q-pa-md text-center" :style="`background-color:${session.assigments[0].pivot.total_score>=75?'#27AE60':'#EB5757'};
            color:white;font-size:20px;
            border-radius: 25px 0px 25px 25px;`">
                    {{session.assigments[0].pivot.total_score}}
                </div>
                <div v-else class="q-pa-xs text-center" style="background-color:#F2C94C;position:relative;
            color:white;font-size:14px;
            border-radius: 25px 0px 25px 25px;
            width:70px">
                    Belum dinilai
                </div>
            </q-item-section>
        </q-item>
    </q-card>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import {
    date
} from 'quasar'

export default {
    props: {
        session: null
    },
    computed: {
        getSessionDate() {
            //20 / 03 / 2020
            return this.session.created_at;
        }
    }
}
</script>
