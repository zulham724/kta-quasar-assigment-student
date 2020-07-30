<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#009688">
        <q-btn flat dense icon="arrow_back" style="font-size:20px" @click="$router.back()" />
        <q-toolbar-title shrink>
          <div class="text-weight-medium" style="font-size:18px;color:white">Modul Disimpan</div>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar style="background-color:white">
        <div class="row q-px-sm q-pb-md q-pt-md full-width">
          <div class="col-10">
            <q-input 
              standout="bg-grey-2 text-teal"
              rounded
              dense
              no-caps
              label="Cari Materi"
              bg-color="grey-2"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-2 text-center">
            <span class="material-icons" style="color:#828282;font-size:38px">
              tune
            </span>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page class="q-px-lg q-py-sm">
      <div class="q-py-sm" v-for="n in 4" :key="n">
        <modul-list-item></modul-list-item>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  components: {
    ModulListItem: () =>import('components/modul/ModulListItem.vue')
  },
  data() {
    return{

    }
  }
}
</script>