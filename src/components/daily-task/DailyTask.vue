<template>
    <div>
        <div class="col-4" clickables>
            <q-card 
              flat 
              class="my-card q-ma-sm text-white" 
              style="height:150px;background-color:#009688;border-radius:15px"
            >
                <q-card-section class="q-pa-sm" style="">
                    <div class="text-center text-body-2">
                        Menyelesaikan 3 Paket Soal (2/3)
                    </div>
                </q-card-section>
                <q-card-section class="text-center q-pa-none"> 
                    <span class="material-icons" style="font-size:80px">
                        emoji_events
                    </span>
                </q-card-section>
                <q-card-section class="q-pa-sm text-center" style="background-color:#009688">
                    <q-linear-progress color="teal-2" value="0.1" class="" />
                    <div class="text-body2 text-center">
                        78%
                    </div>
                </q-card-section>
            </q-card>
        </div> 
    </div>
</template>

<script>
export default {
    
}
</script>