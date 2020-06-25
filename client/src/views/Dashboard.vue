<template>
    <div class="container">
        <div>
            <img alt="Vue logo" src="../assets/logo.png" />
        </div>
        ini gambar apa hayooo????
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    created() {
        if (localStorage.nick_name) {
            this.$router.push('/dashboard', () => {});
        } else {
            this.$router.push('/', () => {});
        }
    }
};
</script>

<style></style>
