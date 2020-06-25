<template>
    <div class="container">
        <div class="title">
            <h2>Welcome to Guess The Word Game !</h2>
        </div>
        <div class="form">
            <form @submit.prevent="inputNick">
                <div class="form-group">
                    <label for="formGroupExampleInput">Please insert your nick name !</label>
                    <input
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput"
                        placeholder="Your nick name"
                        v-model="nick"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
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
