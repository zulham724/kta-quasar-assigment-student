<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#009688">
        <div class="row full-width items-center">
          <div class="col-4">
            <q-btn size="20px" flat dense icon="arrow_back" @click="$router.back()" />
          </div>
          <div class="col-4">
            <div class="text-body2 text-weight-light text-center" style="font-size:16px">Pengaturan Akun</div>
          </div>
          <div class="col-4">
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page class="q-pa-lg">
      <q-card style="border-radius:10px">
        <q-card-section class="q-py-sm q-px-md">
          <div class="text-weight-bold" style="font-size:18px">
            Kata Sandi
          </div>
        </q-card-section>
        <q-card-section class="q-pt-sm q-px-md q-pb-none">
          <div style="color:#4DB6AC">Password Lama</div>
          <q-input outlined dense no-caps label="Password Lama" color="secondary"></q-input>
        </q-card-section>
        <q-card-section class="q-pt-sm q-px-md q-pb-none">
          <div style="color:#4DB6AC">Password Baru</div>
          <q-input outlined dense no-caps label="Password Baru" color="secondary"></q-input>
        </q-card-section>
        <q-card-section class="q-pt-sm q-px-md q-pb-none">
          <div style="color:#4DB6AC">Konfirmasi Password Baru</div>
          <q-input outlined dense no-caps label="Konfirmasi Password Baru" color="secondary"></q-input>
        </q-card-section>
        <q-card-section class="q-py-lg text-right">
          <q-btn
            rounded
            flat
            no-caps
            label="Simpan"
            style="color:white;background-color:#009688">
          </q-btn>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
export default {
  
}
</script>