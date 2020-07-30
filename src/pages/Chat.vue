<template>
        <q-page class="q-ma-md" >
            <div class="messages q-px-sm q-mt-md" 
                style="height:600px;overflow:auto;background-color: #f7e6b7" 
                v-chat-scroll="{always: false, smooth: true}"
                @v-chat-scroll-top-reached="onLoad">
                <template slot="loading">
                    <div class="row justify-center q-my-md">
                    <q-spinner color="primary" name="dots" size="40px" />
                    </div>
                </template>
                    <p class="nomessages text-secondary" v-if="messages.length == 0">
                        [No messages yet!]
                    </p>
                    <!-- <q-infinite-scroll @load="onSite" :offset="50" reverse > -->
                        <div class="q-py-sm" v-for="message in messages" :key="message.id" >
                            <span class="text-info">[{{ message.name }}]: </span>
                            <span>{{message.message}}</span>
                            <span class="text-secondary time">{{message.timestamp}}</span>
                        </div>
                    <!-- </q-infinite-scroll> -->
            </div>
            <q-footer style="padding:5px;background-color:white">
                    <div class="card-action q-pl-md" style="">
                        <CreateMessage :name="name"/>
                    </div>
            </q-footer>
        </q-page>
</template>

<script>
    import CreateMessage from 'components/CreateMessage';
    import moment from 'moment';
    import {mapState} from 'vuex'
    export default {
        name: 'Chat',
        props: ['name'],
        components: {
            CreateMessage
        },
        data() {
            return{
                messages: [],
                temp_messages:[],
                nama: "tim",
                load: false,
                consecutive: 20,
                last_timestamp: null
            }
        },
        computed:{
            ...mapState(['Auth','AssigmentSession'])
        },
        mounted() {
            this.$store.dispatch('Auth/getAuth').then(res=>{
                
            }); 
        },
        created() { 
            this.onLoad()
        },
        methods: {
            onSite() {
                console.log("masuk onSie")
            },
            onLoad(done) {
                this.load = true
                // setTimeout(() => {
                //     if (this.items) {
                //     this.items.splice(0, 0, {}, {}, {}, {}, {}, {}, {})
                //     done()
                //     }
                // }, 2000)
                if (this.messages.length == 0){
                    let ref = this.$firebase.firestore().collection('messages').orderBy('timestamp', "desc").limit(this.consecutive);
                    ref.onSnapshot(snapshot => {
                        let temp_messages = [];
                        snapshot.docChanges().forEach(change => {
                            if (change.type == 'added') {
                                let doc = change.doc;
                                if (this.last_timestamp == null){
                                    this.last_timestamp = doc.data().timestamp
                                } else if (this.last_timestamp > doc.data().timestamp) {
                                    this.last_timestamp = doc.data().timestamp
                                }
                                temp_messages.push({
                                    id: doc.id,
                                    name: this.nama,
                                    message: doc.data().message,
                                    timestamp: moment(doc.data().timestamp).format('LTS')
                                });
                            }
                        });
                        temp_messages.reverse()
                        temp_messages.forEach(item => {
                            this.messages.push({
                                id: item.id,
                                name: item.name,
                                message: item.message,
                                timestamp: item.timestamp
                            })
                        })
                        this.load = false 
                    });
                } else {
                    let ref = this.$firebase.firestore().collection('messages').orderBy('timestamp', "desc").where("timestamp", "<" , this.last_timestamp).limit(this.consecutive);
                    ref.onSnapshot(snapshot => {
                        let temp_messages = [];
                        snapshot.docChanges().forEach(change => {
                            if (change.type == 'added') {
                                let doc = change.doc;
                                if (this.last_timestamp > doc.data().timestamp) {
                                    this.last_timestamp = doc.data().timestamp
                                }
                                temp_messages.push({
                                    id: doc.id,
                                    name: this.nama,
                                    message: doc.data().message,
                                    timestamp: moment(doc.data().timestamp).format('LTS')
                                });
                            }
                        });
                        if (temp_messages.length < 2) {
                            temp_messages.reverse()
                            temp_messages.forEach(item => {
                                this.messages.push({
                                    id: item.id,
                                    name: item.name,
                                    message: item.message,
                                    timestamp: item.timestamp
                                })
                            }) 
                        } else {
                            // temp_messages.reverse()
                            temp_messages.forEach(item => {
                                this.messages.unshift({
                                    id: item.id,
                                    name: item.name,
                                    message: item.message,
                                    timestamp: item.timestamp
                                })
                            })
                            this.load = false 
                        }
                    });
                }
            }
        }
        //     onLoad( done) {
        //         console.log("masuk sini")
        //         setTimeout(() => {
        //             if (this.messages) {
        //                 let ref = this.$firebase.firestore().collection('messages').orderBy('timestamp');
        //                 ref.onSnapshot(snapshot => {
        //                     console.log("ini snapshot: ",)
        //                     this.last_consecutive = this.consecutive
        //                     this.consecutive -= 4
        //                     console.log(this.consecutive)
        //                     snapshot.docChanges().slice(this.consecutive).forEach(change => {
        //                         if (change.type == 'added') {
        //                             let doc = change.doc;
        //                             this.last_consecutive += 1
        //                             if (this.last_consecutive  < 0 ) {
        //                                 console.log(this.last_consecutive)
        //                                 console.log("masuk")
        //                                     this.messages.push({
        //                                         id: doc.id,
        //                                         name: this.nama,
        //                                         message: doc.data().message,
        //                                         timestamp: moment(doc.data().timestamp).format('LTS')
        //                                     });
        //                             } else {
        //                                 return
        //                             }
        //                         }
        //                     });
        //                 });
        //                 // this.messages.splice(0, 0, {}, {}, {}, {}, {}, {}, {})
        //             // done()
        //             }
        //         }, 2000)
        //     }
        // }
    }
</script>

<style>
</style>