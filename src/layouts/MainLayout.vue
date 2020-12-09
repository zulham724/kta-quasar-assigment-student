<template>
<q-layout view="lHh Lpr lFf">
    <q-page-container>
        <q-drawer v-model="navigation" :width="270" :breakpoint="500" overlay bordered content-class="bg-white">
            <q-scroll-area class="fit">
                <q-list>
                    <q-item class="q-pa-md">
                        <q-item-section avatar top>
                            <q-avatar size="3.6rem" v-if="Auth.auth">
                                <q-img no-default-spinner :src="`${Setting.storageUrl}/${Auth.auth.avatar}`"></q-img>
                            </q-avatar>
                        </q-item-section>
                        <q-item-section top>
                            <q-item-label v-if="Auth.auth">
                                <div class="text-weight-medium" style="font-size:14px">
                                    {{ Auth.auth.name }}
                                </div>
                            </q-item-label>
                            <q-item-label style=" color:#F2C94C">
                                <span class="material-icons" style="font-size:18px">
                                    emoji_events
                                </span>
                                0 points
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="
                $router.currentRoute.fullPath == '/'
                  ? (navigation = !navigation)
                  : $router.push('/')
              ">
                        <q-item-section avatar>
                            <span class="material-icons" style="font-size:30px;color:#009688">
                                home
                            </span>
                        </q-item-section>
                        <q-item-section>
                            <div style="font-size:15px">Beranda</div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="
                $router.currentRoute.fullPath == '/account'
                  ? (navigation = !navigation)
                  : $router.push('/account')
              ">
                        <q-item-section avatar>
                            <span class="material-icons" style="font-size:30px;color:#009688">
                                person
                            </span>
                        </q-item-section>
                        <q-item-section>
                            <div style="font-size:15px">Profil</div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="
                $router.currentRoute.fullPath == '/assigment'
                  ? (navigation = !navigation)
                  : $router.push('/assigment')
              ">
                        <q-item-section avatar>
                            <span class="material-icons" style="font-size:30px;color:#009688">
                                assignment
                            </span>
                        </q-item-section>
                        <q-item-section>
                            <div style="font-size:15px">Kerjakan Soal</div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="
                $router.currentRoute.fullPath == '/traininglist'
                  ? (navigation = !navigation)
                  : $router.push('/traininglist')
              ">
                        <q-item-section avatar>
                            <span class="material-icons" style="font-size:30px;color:#009688">
                                edit
                            </span>
                        </q-item-section>
                        <q-item-section>
                            <div style="font-size:15px">Latihan Mandiri</div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="
                $router.currentRoute.fullPath == '/theory'
                  ? (navigation = !navigation)
                  : $router.push('/theory')
              ">
                        <q-item-section avatar>
                            <span class="material-icons" style="font-size:30px;color:#009688">
                                class
                            </span>
                        </q-item-section>
                        <q-item-section>
                            <div style="font-size:15px">Materi</div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="
                $router.currentRoute.fullPath == '/post'
                  ? (navigation = !navigation)
                  : $router.push('/post')
              ">
                        <q-item-section avatar>
                            <span class="material-icons" style="font-size:30px;color:#009688">
                                forum
                            </span>
                        </q-item-section>
                        <q-item-section>
                            <div style="font-size:15px">Diskusi</div>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple style="border-bottom:1px solid #E0E0E0" @click="
                $router.currentRoute.fullPath == '/setting'
                  ? (navigation = !navigation)
                  : $router.push('/setting')
              ">
                        <q-item-section avatar>
                            <span class="material-icons" style="font-size:30px;color:#009688">
                                settings
                            </span>
                        </q-item-section>
                        <q-item-section>
                            <div style="font-size:15px">Pengaturan Akun</div>
                        </q-item-section>
                    </q-item>
                    <div class="q-pa-lg text-center">
                        <q-btn class="text-weight-regular" flat rounded no-caps style="width:90%;font-size:18px;background-color:#4DB6AC;color:white" @click="onLogout()">
                            <span class="material-icons" style="font-size:30px;color:white;padding-right:5px">
                                exit_to_app
                            </span>
                            Keluar
                        </q-btn>
                    </div>
                </q-list>
            </q-scroll-area>
        </q-drawer>
        <router-view v-on:navigation-toggle="navigation = !navigation" />
    </q-page-container>
</q-layout>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    name: "MainLayout",
    components: {},
    data() {
        return {
            navigation: false,
            leftDrawerOpen: false,
            essentialLinks: [{
                    title: "Docs",
                    caption: "quasar.dev",
                    icon: "school",
                    link: "https://quasar.dev"
                },
                {
                    title: "Github",
                    caption: "github.com/quasarframework",
                    icon: "code",
                    link: "https://github.com/quasarframework"
                },
                {
                    title: "Discord Chat Channel",
                    caption: "chat.quasar.dev",
                    icon: "chat",
                    link: "https://chat.quasar.dev"
                },
                {
                    title: "Forum",
                    caption: "forum.quasar.dev",
                    icon: "record_voice_over",
                    link: "https://forum.quasar.dev"
                },
                {
                    title: "Twitter",
                    caption: "@quasarframework",
                    icon: "rss_feed",
                    link: "https://twitter.quasar.dev"
                },
                {
                    title: "Facebook",
                    caption: "@QuasarFramework",
                    icon: "public",
                    link: "https://facebook.quasar.dev"
                }
            ]
        };
    },
    computed: {
        ...mapState(["Auth", "Setting", "EchoNotification"])
    },
    created: function () {
        this.initNotification();

    },
    mounted() {
        // console.log('user_id'+this.Auth.)
    },
    methods: {
         initNotification() {
            this.$store.dispatch("EchoNotification/initNotification");
            // if (!this.EchoNotification.items.data) {
            //     Promise.all([this.$store.dispatch("EchoNotification/index"), this.$store.dispatch('EchoNotification/getCount')]).then(res => {
            //         this.subscribeNotification();
            //     });
            //     // this.$store.dispatch("EchoNotification/index");
            //     // this.$store.dispatch('EchoNotification/getCount');
            // } else {
            //     this.subscribeNotification();
            // }
        },
        onLogout() {
            //alert('asdsa')
            this.$store.dispatch("Auth/logout").then((res) => {
                this.$router.push({
                    name: 'login'
                })
            });
        }
    }
};
</script>
