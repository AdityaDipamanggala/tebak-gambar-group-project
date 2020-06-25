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
    name: 'App'
};
</script>

<style scoped></style>
