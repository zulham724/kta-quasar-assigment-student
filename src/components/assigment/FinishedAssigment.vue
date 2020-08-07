<template>
  <div>
    <q-card 
      flat 
      class="q-pa-none"
      style="background-size:cover;background-image: url('statics/assigment-background.png');
      border-radius:15px;
      color:white"
    >
      <q-item class="q-pa-none">
        <q-item-section>
          <q-card-section class="q-pb-none">
            <div class="text-h6" style="word-wrap:break-word">
              {{assigment.name}}
            </div>
          </q-card-section>
          <q-card-section class="q-py-none">
            <div class="text-caption" style="font-size:14px">Oleh {{assigment.teacher?assigment.teacher.name:''}}</div>
          </q-card-section>
          <q-card-section class="q-py-sm">
            <q-item class="q-px-none">
              <q-item-section avatar style="padding-right:5px">
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
              </q-item-section>
              <q-item-section avatar>
                <q-btn 
                  class="text-weight-regular q-px-sm" 
                  dense
                  rounded 
                  flat 
                  style="color:black;background-color:white;font-size:12px"
                >
                  <span class="material-icons" style="color:#009688;padding-right:4px;font-size:16px">
                    date_range
                  </span>
                  20 / 03 / 2020
                </q-btn>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-item-section>
        <q-item-section side top class="q-pa-none text-right" style="padding-left:0px" v-if="assigment.latest_auth_session[0].pivot.total_score!=null">
          <div 
            class="q-pa-md text-center" 
            style="background-color:#27AE60;
            color:white;font-size:20px;
            border-radius: 25px 0px 25px 25px;"
          > 
            {{assigment.latest_auth_session[0].pivot.total_score}}
          </div>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    props:{
      assigment:null
    }
}
</script>