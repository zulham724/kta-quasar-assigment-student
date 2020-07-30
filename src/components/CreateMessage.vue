<template>
    <div class="container" style="">
        <form @submit.prevent="createMessage">
            <div class="form-group">
                <input type="text" name="message" class="form-control" placeholder="Enter message ..." v-model="newMessage">
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
                <button class="btn btn-primary" type="submit" name="action">KIRIMM..</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { scroll } from 'quasar';
    const { getScrollTarget, setScrollPosition } = scroll
    export default {
        name: 'CreateMessage',
        data(){
            return {
                newMessage: null,
                errorText: null,
                name: "tim"
            }
        },
        methods: {
            animateScroll () {
                const ele = document.getElementById('bottom') // You need to get your element here
                const target = getScrollTarget(ele)
                const offset = ele.offsetTop - ele.scrollHeight
                const duration = 300
                setScrollPosition(target, offset, duration)
            },
            createMessage () {
                if (this.newMessage) {
                    this.$firebase.firestore().collection('messages').add({
                        message: this.newMessage,
                        name: this.name,
                        timestamp: Date.now()
                    })
                    this.animateScroll()
                    this.newMessage = null;
                    this.errorText = null;
                } else {
                    this.errorText = "A message must be entered!"
                }
            }
        }
    }
</script>
