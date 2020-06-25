<template>
    <div class="container">
        <div class="title">
            <h2>Welcome to Guess The Word Game !</h2>
        </div>
        <div class="form">
            <form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Please insert your nick name !</label>
                    <input
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput"
                        placeholder="Your nick name"
                        v-model="nickName"
                    />
                </div>
                <a href="" class="card-link" @click.prevent="submitNickName">Submit</a>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Frontpage',
    data() {
        return {
            nickName: ''
        };
    },
    methods: {
        submitNickName() {
            localStorage.setItem('nick_name', this.nickName);
            this.$router.push('/dashboard', () => {});
            setTimeout(() => {
                this.nickName = '';
            }, 2000);
        }
    },
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
