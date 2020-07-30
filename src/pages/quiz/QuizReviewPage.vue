<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#009688">
        <q-btn flat dense icon="arrow_back" style="font-size:20px" @click="$router.back()" />
      <q-toolbar-title>
        <div class="text-body2 text-weight-light" style="font-size:18px">Kembali</div>
      </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <div v-if="isStart">
        <div class="row full-width justify-between" style="background-color:#009688">
          <div class="col-4 q-pl-md" style="font-size:16px">
          </div>
          <div class="col-4 text-right q-pr-md">
            <div clickable @click="showMenu(true)">
              <span class="material-icons" style="color:white;font-size:32px;padding-right:5px">
                apps
              </span>
            </div>
          </div>
        </div>
        <div class="q-pt-xl q-pb-md text-center" style="background-color:#009688">
          <div style="color:#FFC735;font-size:18px">Soal ke 1<span style="color:#FFD567;font-size:12px"> /5</span></div>
          <div style="color:white;font-size:16px">Surat ke 110 merupakan surat ...</div>
        </div>
        <q-img no-default-spinner src="~assets/wave-background.png" style="width:100%"></q-img>
        <div class="q-pa-md">
          <div class="q-py-lg" v-if="cek == 'selectoptions'">
            <!-- <div class="q-py-sm" v-for="n in 4" :key="n"> -->
            <q-item>
              <q-item-section>
                <div 
                class="q-mb-md row full-width items-center" 
                style="border-radius: 5px;"
                :style="`${color == true ? 'background-color:#6FCF97;color:white;border:none' : 
                'background-color:white;color:black;border: 1px solid #009688'}`"
                clickable
                @click="klik()"
              >
                <div class="col-2 items-start text-left q-pt-none text-weight-medium">
                  <div 
                    class="text-center q-pa-xs" 
                    style="font-size:16px;
                    background: #1B6A9E;
                    border-radius: 5px 0px 25px;
                    color:white"
                  >
                    a
                  </div>
                </div>
                <div class="col-11 q-py-sm q-px-md">
                    Alkalisadsdasd sadas das das 
                    asddsasdasdsadsadsadsadssassasa
                </div>
              </div>
              </q-item-section>
              <q-item-section side top>
                <q-btn 
                  round
                  flat
                  dense
                  style="background-color:#6FCF97"
                >
                  <span class="material-icons" style="font-size:24px;color:white">
                    done
                  </span>
                </q-btn>
              </q-item-section>
            </q-item>
            
            <q-item>
              <q-item-section>
                <div 
                  class="row full-width items-center" 
                  style="border-radius: 5px;"
                  :style="`${color == true ? 'background-color:#EB5757;color:white;border:none' : 
                  'background-color:white;color:black;border: 1px solid #009688'}`"
                  clickable
                  @click="klik()"
                >
                  <div class="col-2 items-start text-left q-pt-none text-weight-medium">
                    <div 
                      class="text-center q-pa-xs" 
                      style="font-size:16px;
                      background: #1B6A9E;
                      border-radius: 5px 0px 25px;
                      color:white"
                    >
                      a
                    </div>
                  </div>
                  <div class="col-11 q-py-sm q-px-md">
                      Alkalisadsdasd sadas das das 
                      asddsasdasdsadsadsadsadssassasa
                  </div>
                </div>
              </q-item-section>
              <q-item-section side top>
                <q-btn 
                  round
                  flat
                  dense
                  style="background-color:#EB5757"
                >
                  <span class="material-icons" style="font-size:24px;color:white">
                    clear
                  </span>
                </q-btn>
              </q-item-section>
            </q-item>
            <!-- </div> -->
            <!-- <q-input
              disable
              class="q-pa-sm text-body2"
              outlined
              dense
              autogrow
              v-for="n in 4"
              :key="n"
              v-model="model"
              :rules="[val => !!val || 'Harus diisi']"
            >
              <template v-slot:after>
                <div>
                  <q-btn
                    round
                    icon="check"
                  /> 
                </div>
              </template>
            </q-input> -->
          </div>
          <div class="q-py-lg text-center" v-if="cek == 'textfield'">
            <q-input
              class="q-pa-sm"
              outlined
              dense
              label="Jawaban"
              v-model="model"
              :rules="[val => !!val || 'Harus diisi']"
            />
            <div class="q-py-sm" style="color:#828282">Nilai</div>
            <div v-if="dinilai"
              class="q-py-xs text-weight-bold" 
              style="background-color:#6FCF97;color:white;font-size:28px"
            >
              10  <span class="text-weight-regular" style="font-size:16px"> /16</span>
            </div>
            <div v-if="!dinilai"
              class="q-py-xs text-weight-regular" 
              style="background-color:#FFD860;color:white;font-size:24px"
            >
              belum dinilai
            </div>
          </div>
          <div class="q-py-lg text-center" v-if="cek == 'textarea'">
            <q-input
              class="q-pa-sm"
              type="textarea"
              outlined
              dense
              disable
              bg-color="grey-2"
              v-model="model"
              label="Jawaban"
              :rules="[val => !!val || 'Harus diisi']"
              style=""
            />
            <div class="q-py-sm" style="color:#828282">Nilai</div>
            <div v-if="dinilai"
              class="q-py-xs text-weight-bold" 
              style="background-color:#6FCF97;color:white;font-size:28px"
            >
              10  <span class="text-weight-regular" style="font-size:16px"> /16</span>
            </div>
            <div v-if="!dinilai"
              class="q-py-xs text-weight-regular" 
              style="background-color:#FFD860;color:white;font-size:24px"
            >
              belum dinilai
            </div>
          </div>
        </div>
      </div>
    </q-page>
    <q-footer style="background-color:white; height:120px">
      <div class="row full-width">
        <div class="col-4 text-left q-pr-xl" clickable>
          <div  
            class="text-center text-weight-light q-pt-xl" 
            style="color:white;
            background-color:#BDBDBD;
            height:75px;
            border-top-right-radius:100px;
            border-bottom-right-radius: 40px"
          >
            Kembali
          </div>
        </div>
        <div class="col-4 text-center">
          <div style="font-size:48px;color:#009688">
              1 <span style="font-size:18px;color:#80CBC4">/ 5</span>
          </div>
        </div>
        <div class="col-4 text-right q-pl-xl" clickable @click="$router.push('/result')">
          <div  
            class="text-center text-weight-light q-pt-lg" 
            style="color:white;
            background-color:#009688;
            height:75px;
            border-top-left-radius:100px;
            border-bottom-left-radius: 40px"
          >
            <div class="text-right q-pr-md">
              <span class="material-icons" style="font-size:26px">
                keyboard_arrow_right
              </span>
            </div>
            Lanjut
          </div>
        </div>
      </div>
    </q-footer>
  </div>
</template>

<script>
export default {
  data() {
    return{ 
      isStart:true,
      cek:"selectoptions",
      dinilai:false,
      color:true
    }
  },
  methods:{
  }
}
</script>