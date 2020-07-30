<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#009688">
        <q-btn flat dense icon="arrow_back" style="font-size:20px" @click="$router.back()" />
        <q-toolbar-title shrink>
          <div class="text-weight-medium" style="font-size:18px;color:white">Media Pembelajaran Tersimpan</div>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar style="background-color:#009688">
        <div class="row q-px-sm q-pb-md q-pt-sm full-width">
          <div class="col-10">
            <q-input 
              outlined
              rounded
              dense
              no-caps
              label="Cari Materi"
              bg-color="white"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-2 text-center">
            <span class="material-icons" style="color:white;font-size:38px">
              tune
            </span>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page style="background-color:#009688">
      <div class="q-pb-sm" v-for="n in 4" :key="n">
        <media-list-item></media-list-item>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  components: {
    MediaListItem: () =>import('components/media/MediaListItem.vue')
  }
  
}
</script>