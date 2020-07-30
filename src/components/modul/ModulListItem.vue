<template>
  <div>
    <q-card 
      style="border-radius:10px;
      border: 1px solid #4DB6AC;
      background-image:url('statics/modul-background.png');
      background-size:cover"
      clickable
      @click="$router.push('/modul')"
    >
      <q-card-section class="q-pa-none">
        <q-item>
          <q-item-section top>
            <q-item-label>
              <q-btn 
                class="q-px-xs"
                flat
                rounded
                dense
                color="white"
                style="background-color:#009688"
              >
                10 SMA
              </q-btn>
            </q-item-label>
            <q-item-label>
              <div class="text-h6">
                Pendidikan Agama Islam
              </div>
              <div class="text-weight-light" style="font-size:14px">Oleh Pak Buambang Sp.d</div>
            </q-item-label>
          </q-item-section>
          <q-item-section top>
            <div class="text-right">
              <q-img no-default-spinner src="~assets/contoh-modul.png" style="width:100px"></q-img>
            </div>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  
}
</script>