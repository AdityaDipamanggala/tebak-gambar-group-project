<template>
    <div>
        <router-link to="/"></router-link>
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import store from 'vuex';
import { mapState } from 'vuex';

export default {
    name: 'App',
    components: {
        HelloWorld
    },
    created() {
        socket.on('question', image => {
            console.log(image);
            this.image = image;
        });
        socket.on(this.id, isCorrect => {
            if (isCorrect) this.point += 10;
            else this.point--;
        });
    }
};
</script>

<style></style>
