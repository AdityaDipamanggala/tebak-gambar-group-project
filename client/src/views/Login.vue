<template>
    <div class="container">
        <form @submit.prevent="inputNick">
            <div class="form-group">
                <label for="nick">Please insert your nick name !</label>
                <input
                    type="text"
                    class="form-control"
                    id="nick"
                    placeholder="Nickname"
                    v-model="nick"
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: () => {
        return {
            nick: null
        };
    },
    methods: {
        inputNick() {
            console.log(this.nick);
            localStorage.nick = this.nick;
            localStorage.id = this.nick + new Date().getTime();
            localStorage.point = 0;
            this.$router.push('/');
        }
    }
};
</script>

<style scoped></style>
