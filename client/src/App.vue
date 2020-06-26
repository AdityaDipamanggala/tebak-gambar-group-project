<template>
    <div>
        <Navbar></Navbar>
        <!-- <router-link to="/">XXX</router-link> -->
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
    name: 'App',
    components: { Navbar },
    mounted() {
        const sound = new Audio('musicSaja.mp3');
        sound.volume = 0.5;
        sound.play();
    }
};
</script>

<style scoped></style>
