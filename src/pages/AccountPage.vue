<template>
  <div>
    <q-header elevated>
      <q-toolbar style="background-color:teal">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body1 text-bold">{{ Auth.auth.name }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <q-pull-to-refresh @refresh="onRefresh" color="teal">
        <div class="q-pa-md">
          <div class="row q-pb-md">
            <div class="col-3">
              <q-avatar size="15vw">
                <q-img
                  :src="`${Setting.storageUrl}/${Auth.auth.avatar}`"
                  no-default-spinner
                />
              </q-avatar>
            </div>
            <div class="col-9 self-center">
              <div class="text-body1">{{ Auth.auth.name }}</div>
              <q-btn
                dense
                size="sm"
                color="teal"
                flat
                label="Ubah foto profil"
                @click="$refs.inputFile.pickFiles()"
              />
              <q-file
                v-show="false"
                v-model="file"
                ref="inputFile"
                @input="
                  file =>
                    $router.push({
                      name: 'accountchangeavatar',
                      params: {
                        file: file
                      }
                    })
                "
              ></q-file>
            </div>
          </div>
          <div class="row q-pb-md">
            <q-list>
              <q-item @click="onLogout()" clickable>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-pull-to-refresh>
    </q-page>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "AccountPage",

  data() {
    return {};
  },
  computed: {
    ...mapState(["Auth", "Setting"])
  },
  methods: {
    onRefresh() {},
    onLogout(){
      this.$router.push("/login").then(() => {
        this.$store.dispatch("Auth/logout");
      });
    }
  }
};
</script>
<style lang="css" scoped></style>
