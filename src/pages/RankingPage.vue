<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#009688">
        <div class="row full-width items-center">
          <div class="col-2">
            <q-btn size="16px" flat dense icon="arrow_back" @click="$router.back()" />
          </div>
          <div class="col-8 items-center q-py-sm">
            <div class="text-body2 text-weight-regular text-center" style="font-size:18px">Ranking</div>
          </div>
          <div class="col-2">
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <div style="background-color:white;min-height:inherit">
        <div class="column" style="min-height:0px">
          <div class="col-3 q-px-md q-pt-md q-pb-none" style="background-color:#009688;border-radius: 0px 0px 20px 20px;">
            <div class="row full-width justify-between items-center">
              <div class="col-8">
                <q-item class="q-pa-none">
                  <q-item-section avatar top>
                    <q-avatar size="6rem">
                      <q-img no-default-spinner src="~assets/man.png"></q-img>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section top>
                    <div class="text-weight-bold" style="color:white;font-size:20px">
                      John nono
                    </div>
                    <div class="text-caption" style="color:white">
                      Peringkat Anda
                    </div>
                    <div class="q-pt-sm text-h6 text-weight-bold" style="font-size:34px;color:white">#6</div>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-2" style="color:#F2C94C">
                <span class="material-icons" style="color:#F2C94C;font-size:60px">
                  emoji_events
                </span>
                <div>1000 pts</div>
              </div>
            </div>
          </div>
          <div class="col">
            <q-page>
              <div class="q-pa-md text-h6 text-weight-bold" style="border-bottom: 1px solid #E0E0E0;">
                100 Besar
              </div>
              <div v-for="n in 10" :key="n" style="border-bottom: 1px solid #E0E0E0;">
                <ranking-item></ranking-item>
              </div>
            </q-page>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    RankingItem: ()=>import('components/RankingItem.vue')
  }
  
}
</script>