<template>
  <div>
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-icon name="home" style="font-size:1.5em" />

        <q-toolbar-title>
          <div class="text-body1 text-bold">Home</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      autoplay
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      height="25vh"
    >
      <q-carousel-slide
        :name="1"
        img-src="https://serangkab.info/wp-content/uploads/2019/03/maxresdefault-1.jpg"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://serangkab.info/wp-content/uploads/2019/03/maxresdefault-1.jpg"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://serangkab.info/wp-content/uploads/2019/03/maxresdefault-1.jpg"
      />
      <q-carousel-slide
        :name="4"
        img-src="https://serangkab.info/wp-content/uploads/2019/03/maxresdefault-1.jpg"
      />
    </q-carousel>

    <div class="q-pa-md">
      <div class="row q-mb-md">
        <div class="col-12">
          <q-btn-group style="width:100%" spread>
            <q-btn dense push>
              <template v-slot:default>
                <div>
                  <div class="text-caption text-teal"><q-icon name="timeline" /> Ranking</div>
                </div>
              </template>
            </q-btn>
            <q-btn dense push>
              <template v-slot:default>
                <div>
                  <div class="text-caption text-teal"><q-icon name="visibility" /> Analisis</div>
                </div>
              </template>
            </q-btn>
            <q-btn dense push>
              <template v-slot:default>
                <div>
                  <div class="text-caption text-teal"><q-icon name="update" /> Jadwal</div>
                </div>
              </template>
            </q-btn>
          </q-btn-group>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh">
            <q-icon name="mdi-puzzle" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Kerjakan soal
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh">
            <q-icon name="mdi-feather" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Ruang diskusi
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh">
            <q-icon name="mdi-timer" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Latihan mandiri
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh">
            <q-icon name="mdi-magnify" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Cari Materi
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh">
            <q-icon name="mdi-account" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Profil
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4">
          <q-card class="my-card q-ma-sm bg-teal text-white text-bold" style="height:15vh">
            <q-icon name="mdi-poll" style="position:absolute;bottom:0;right:0" size="xl" />
            <q-card-section>
              Riwayat
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="text-body1">Tantangan harian</div>
        </div>
        <div class="col-12">
          <q-list bordered separator>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="teal" name="emoji_events" style="font-size:3em" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Mengerjakan 20 Soal</q-item-label>
                <q-item-label>
                  <q-linear-progress color="teal" :value="0.4" class="q-mt-md" />
                </q-item-label>
                <q-item-label overline>40% Terlampaui</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="teal" name="emoji_events" style="font-size:3em" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Mendapat nilai diatas 75</q-item-label>
                <q-item-label>
                  <q-linear-progress color="teal" :value="0.8" class="q-mt-md" />
                </q-item-label>
                <q-item-label overline>40% Terlampaui</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const maxSize = 10000;
const heavyList = [];

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: "Soal baru ",
    class:
      i % 2 === 0
        ? "q-pa-md self-center bg-grey-2 text-black"
        : "q-pa-lg bg-grey text-white"
  });
}

Object.freeze(heavyList);
export default {
  data() {
    return {
      slide: 1,
      heavyList
    };
  }
};
</script>

<style></style>
