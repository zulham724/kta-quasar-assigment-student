<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#FFD03E">
        <div class="q-pa-sm" style="color:#009688;font-size:26px" clickable @click="$emit('navigation-toggle')">
          <span class="material-icons">
            menu
          </span>
        </div>
        <q-toolbar-title>
        </q-toolbar-title>
        <q-space />
          <div class="q-pa-sm" style="color:#009688;font-size:26px " clickable>
            <span class="material-icons">
              notifications
            </span>
            <!--<q-menu 
              anchor="bottom right"
              self="top right"
              auto-close 
              transition-show="scale"
              transition-hide="scale"
            >
              <q-list style="width:250px;border:2px solid #80CBC4; border-radius:5px">
                <q-item>
                  <q-item-section class="text-center">
                    <div 
                      class="text-weight-bold" 
                      style="font-size:15px"
                    >
                      Pemberitahuan
                    </div>
                  </q-item-section>
                </q-item>
                <div v-for="n in 3" :key="n" class="q-py-xs" style="background-color:#E0F2F1">
                  <announcement-list></announcement-list>
                </div>
                <q-item>
                  <q-item-section class="text-center">
                    <div 
                      class="text-weight-bold" 
                      style="color:#009688;font-size:13px"
                      clickable
                      @click="$router.push('/announcement')"
                    >
                      Lihat Semua
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>-->
          </div>
      </q-toolbar>
      <q-toolbar class="q-pa-none q-pb-md" style="height:85px;background-color:#FFD03E" inset>
        <q-img no-default-spinner src="~assets/materi.png" style="width:100%"></q-img>
      </q-toolbar>
    </q-header>


    <q-page class="q-pa-lg">
      <q-card 
        flat 
        class="my-card q-ma-sm" 
        style="margin-right:0px; margin-top:0px;border-radius:10px"
        clickable
        @click="$q.notify('Dalam konstruksi')/*$router.push('/theory/modul')*/"
      >
        <q-img no-default-spinner src="~assets/modul-button.png"></q-img>
      </q-card>
      <q-card 
        flat 
        class="my-card q-ma-sm q-pt-sm" 
        style="margin-right:0px; margin-top:0px;border-radius:10px"
        clickable
        @click="$router.push('/theory/media')"
      >
        <q-img no-default-spinner src="~assets/media-button.png"></q-img>
      </q-card>
    </q-page>
  </div>
</template>

<script>
export default {
    components: {
      //AnnouncementList: () =>import('components/announcement/AnnouncementList.vue')
    },
    data() {
      return{
        navigation:false
      }
    }
}
</script>