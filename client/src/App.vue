<template>
    <div>
        <!-- <router-link to="/">XXX</router-link> -->
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
        const sound = new Audio('musicSaja.mp3');
        sound.volume = 0.5;
        sound.play();
    }
};
</script>

<style scoped></style>
