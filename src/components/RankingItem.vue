<template>
  <div>
    <div class="row full-width" style="">
      <div class="col-2 text-center">
        <q-img v-if="rank == 1" no-default-spinner src="~assets/rank1.png"></q-img>
        <q-img v-if="rank == 2" no-default-spinner src="~assets/rank2.png"></q-img>
        <q-img v-if="rank == 3" no-default-spinner src="~assets/rank3.png"></q-img>
        <div class="q-py-lg" v-if="rank > 3" style="color:#009688;font-size:20px">#4</div>
      </div>
      <div class="col-7 q-pa-md">
        <q-item class="q-pa-none">
          <q-item-section avatar>
            <q-avatar size="3rem">
              <q-img no-default-spinner src="~assets/man.png"></q-img>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-weight-medium">John nono</div>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-3 q-pa-md">
        <span class="material-icons q-py-xs" style="font-size:30px;color:#F2C94C">
          emoji_events
        </span>
        1000
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      rank:2
    }
  }
}
</script>