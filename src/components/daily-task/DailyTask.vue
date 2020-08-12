<template>
    <div>
        <div class="col-4" clickables>
            <q-card 
              flat 
              class="my-card q-ma-sm text-white" 
              style="min-height:150px;background-color:#009688;border-radius:15px"
            >
                <q-card-section class="q-pa-sm" style="">
                    <div class="text-center text-body-2">
                        {{item.description}} ({{item.value}}/{{item.limit}})
                    </div>
                </q-card-section>
                <q-card-section class="text-center q-pa-none"> 
                    <span class="material-icons" style="font-size:80px">
                        emoji_events
                    </span>
                    
                </q-card-section>
                <q-card-section class="q-pa-sm text-center" style="background-color:#009688">
                    <q-linear-progress color="teal-2" :value="toFloat(item.daily_progress)" class="" />
                    <div class="text-body2 text-center">
                        {{item.daily_progress}}%
                    </div>
                </q-card-section>
            </q-card>
        </div> 
    </div>
</template>

<script>
export default {
    props:{
        item:{},
    },
    methods: {
      toFloat(n){
          return parseFloat(n)
      }  
    },
    computed:{
        daily_progress(){
            return parseFloat(this.item.daily_progress)*100;
        }
    }
}
</script>