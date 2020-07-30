<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#009688">
        <div class="row full-width">
          <div class="col-4 items-center">
            <q-btn size="16px" flat dense icon="arrow_back" @click="$router.back()" />
          </div>
          <div class="col-4 items-center q-py-sm">
            <div class="text-body2 text-weight-light text-center" style="font-size:15px">Pemberitahuan</div>
          </div>
          <div class="col-4">
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page>
      <div class="q-pa-xl" v-if="!isAnn">
        <q-card flat>
          <q-card-section class="q-pt-xl text-center"> 
            <q-avatar square size="10rem">
              <q-img src="~assets/announcement-bell.png" style="width:100%"></q-img>
            </q-avatar>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-weight-medium" style="color:#009688">Belum Ada Pemberitahuan</div>
            <div class="text-caption">Kerjakan soal atau ikut diskusi agar kamu mendapatkan pemberitahuan</div>
          </q-card-section>
          <q-card-section class="text-center">
            <q-btn 
              no-caps 
              rounded 
              flat 
              style="background-color:#009688;color:white"
              @click="$router.push('/')"
            >
              Beranda
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div v-if="isAnn">
        <div v-for="n in 4" :key="n" style="background-color:#E0F2F1;border-bottom:0.5px solid #BDBDBD">
          <announcement-item></announcement-item>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  components: {
    AnnouncementItem: () =>import('components/announcement/AnnouncementItem.vue')
  },
  data() {
    return{
      isAnn:true
    }
  }
}
</script>