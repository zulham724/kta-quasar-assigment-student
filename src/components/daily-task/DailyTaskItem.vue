<template>
  <div>
    <q-card style="border-radius:10px;border: 1px solid #80CBC4;">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon :style="tab ? 'color:#ffcc00' : 'color:#BDBDBD'" name="emoji_events" style="font-size:5em" />
        </q-item-section>
        <q-item-section top> 
          <q-item-label>
            <q-linear-progress size="10px" color="teal-2" value="0.6" class="q-mt-md" />
          </q-item-label>
          <q-item-label>
            <div class="text-weight-bold">Menyelesaikan 3 paket soal</div>
          </q-item-label>
          <q-item-label overline>
            <div style="color:#828282;font-size:13px">(2/3)</div>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return{
      tab:false
    }
  }
}
</script>