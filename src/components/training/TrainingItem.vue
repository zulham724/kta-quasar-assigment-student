<template>
  <div>
    <q-card 
      class="q-pa-none"
      flat 
      style="background-size:cover;
      background-image: url('statics/training-background.png');
      border-radius:15px;color:black"
      clickable
      @click="$router.push('/quiz')"
    >
      <q-item class="q-pa-none">
        <q-item-section>
          <q-card-section class="q-py-none">
            <q-item class="q-pa-none">
              <q-item-section avatar style="padding-right:5px">
                <q-btn 
                  class="text-weight-regular q-px-sm" 
                  dense
                  rounded 
                  flat 
                  size="12px"
                  style="color:white;background-color:#009688"
                >
                  10 SMA
                </q-btn>
              </q-item-section>
              <q-item-section avatar style="padding-right:5px">
                <q-btn 
                  class="text-weight-regular q-px-sm" 
                  dense
                  rounded 
                  flat 
                  size="11px"
                  style="color:white;background-color:#009688"
                >
                  <span class="material-icons" style="color:white;padding-right:4px;font-size:12px">
                    access_time
                  </span>
                  120 m
                </q-btn>
              </q-item-section>
              <q-item-section avatar style="padding-right:5px">
                <q-btn 
                  class="text-weight-regular q-px-sm" 
                  dense
                  rounded 
                  flat 
                  size="11px"
                  style="color:white;background-color:#009688"
                >
                  <span class="material-icons" style="color:white;padding-right:4px;font-size:12px">
                    date_range
                  </span>
                  20 / 20 / 2020
                </q-btn>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-section class="q-py-none">
            <div class="text-h6">Penilaian UAS</div>
          </q-card-section>
          <q-card-section class="q-pt-none q-pb-lg">
            <div class="text-caption" style="font-size:14px">Oleh Bapak...</div>
          </q-card-section>
        </q-item-section>
        <q-item-section side top class="q-pa-none text-right" style="padding-left:0px">
          <div 
            v-if ="nilai > 75"
            class="q-pa-md text-center" 
            style="background-color:#6FCF97;
            color:white;font-size:20px;
            border-radius: 25px 0px 25px 25px;"
          > 
            90
          </div>
          <div 
            v-if ="nilai < 75 && nilai > 0"
            class="q-pa-md text-center" 
            style="background-color:#EB5757;
            color:white;font-size:20px;
            border-radius: 25px 0px 25px 25px;"
          > 
            90
          </div>
          <div 
            v-if ="nilai == 0"
            class="q-pa-md text-center" 
            style="background-color:#F2C94C;
            color:white;font-size:20px;
            border-radius: 25px 0px 25px 25px;
            width:70px"
          > 
            <div style="font-size:14px;color:white">Belum dinilai</div>
          </div>
        </q-item-section>
      </q-item>
      
    </q-card>
  </div>
</template>

<script>
export default {
    data() {
      return{
        nilai:0
      }
    }
}
</script>