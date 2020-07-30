<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#009688">
        <q-btn flat dense icon="arrow_back" style="font-size:20px" @click="$router.back()" />
      <q-toolbar-title>
        <div class="text-body2 text-weight-light" style="font-size:20px">Komentar</div>
      </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page class="q-pb-lg">
      <q-card flat>
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
        <q-card-section class="q-py-sm">
          <div>Pendidikan Agama Islam</div>
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
              <span class='material-icons' style="font-size:20px">
                turned_in
              </span>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pa-md">
        <div class="q-px-sm q-pb-md full-width">
          <q-item class="q-pa-none">
            <q-item-section top avatar>
              <q-avatar size="2.5rem">
                <q-img no-default-spinner src="~assets/man.png"></q-img>
              </q-avatar>
            </q-item-section>
            <q-item-section top style="width:100">
              <q-item-label>
                <q-input
                  v-model="random"
                  outlined
                  dense
                  clearable
                  autogrow
                  style="max-width:100%"
                  color="teal"
                  label="Ada pertanyaan? Coba tanya sama teman-teman lainnya"
                />
              </q-item-label>
              <q-item-label class="q-pt-sm text-right">
                <q-btn
                  class="q-px-lg text-center"
                  dense
                  no-caps
                  flat
                  rounded
                  style="color:white;font-size:14px;background-color:#009688"
                >
                  Kirim
                </q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div class="q-px-lg q-pb-xs" v-for="n in 2" :key="n">
        <item-component></item-component>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  components: {
    ItemComponent: ()=> import('components/post/comment/ItemComponent')
  }
  
}
</script>