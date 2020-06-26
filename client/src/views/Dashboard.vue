<template>
    <div>
        <nav class="navbar navbar-light bg-transparent justify-content-between fixed-top">
            <a class="navbar-brand" style="color: brown;"><strong>Guess The Word Game</strong></a>
            <button
                class="btn btn-danger my-0 my-sm-0"
                type="button"
                @click.prevent="logout"
            >
                Logout
            </button>
        </nav>
        <div class="container mt-5">
            <h1>Let's guess the picture !</h1>
            <h1>Point: {{ point }}</h1>
            <img class="image my-3" :src="image" />
            <center>
                <form @submit.prevent="postAnswer">
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            id="answer"
                            placeholder="Type your answer here"
                            v-model="$store.state.answer"
                        />
                    </div>
                    <button type="submit" class="btn btn-outline-success btn-sm">Submit</button>
                </form>
            </center>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('https://hacktivguessword.herokuapp.com');
export default {
    name: 'Dashboard',
    data: () => {
        return {
            image: '',
            answer: '',
            point: 0
        };
    },
    methods: {
        postAnswer() {
            this.$store.dispatch('postAnswer');
        },
        logout() {
            localStorage.clear();
            this.$router.push('/login');
        }
    },
    created() {
        this.point = parseInt(localStorage.point);
        socket.on('question', image => {
            console.log(image);
            this.image = image;
        });
        socket.on(localStorage.id, isCorrect => {
            console.log(isCorrect);
            if (isCorrect) {
                this.point += 10;
                localStorage.point = this.point;
            } else {
                this.point--;
                localStorage.point = this.point;
            }
        });
    }
};
</script>

<style scoped>
h1 {
    color: rgb(80, 143, 9);
}

form {
    align-items: center;
    width: 20%;
}

.image {
    border: 2px white solid;
    align-items: center;
    border-radius: 10px;
}
</style>
