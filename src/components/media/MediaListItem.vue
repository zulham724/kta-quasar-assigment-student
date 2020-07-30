<template>
  <div>
    <q-card>
      <q-card-section class="q-pb-none">
        <q-item class="q-pa-none">
          <q-item-section avatar>
            <q-avatar size="2.5rem">
              <q-img no-default-spinner src="~assets/man.png"></q-img>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <div class="text-weight-bold" style="font-size:14px">John nono</div>
            </q-item-label>
            <q-item-label caption>
              <div>2 jam yang lalu</div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-py-xs">
        <div>Belajar belajar belajar nbelajar heh belajar</div>
      </q-card-section>
      <q-card-section class="q-py-xs">
        <q-video src="statics/video.mp4" :ratio="12/13"></q-video>
      </q-card-section>
      <q-card-section class="q-pt-xs q-pb-sm">
        <div class="row full-width" style="color:rgba(0, 0, 0, 0.54)">
          <div class="col-3">
            <span class='material-icons' style="font-size:20px" clickable>
              favorite_border
            </span>
            16 Suka
          </div>
          <div class="col-4" clickable @click="$router.push('/theory/media/comment')">
            <span class='material-icons' style="font-size:20px">
              comment
            </span>
            16 Komentar
          </div>
          <div class="col-5 text-right">
            <span v-if="pop" class='material-icons' style="font-size:20px" clickable>
              turned_in
            </span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pop:true
    }
  }
}
</script>