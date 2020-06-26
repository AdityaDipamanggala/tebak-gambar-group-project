<template>
    <div>
        <nav class="navbar navbar-light bg-transparent justify-content-between fixed-top">
            <a class="navbar-brand" style="color: brown;"><strong>Guess The Word Game</strong></a>
            <button class="btn btn-danger my-0 my-sm-0" type="button" @click.prevent="logout">
                Logout
            </button>
        </nav>
        <div class="container mt-5">
            <h1>Let's guess the picture !</h1>
            <h1>Point: {{ point }}</h1>
            <img class="image my-3" :src="$store.state.image" />
            <center>
                <form @submit.prevent="$store.dispatch('postAnswer')">
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
import socket from '../config/socket';

export default {
    name: 'Dashboard',
    data: () => {
        return {
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
        let sound = new Audio('../assets/sound/correct.mp3')
        this.point = parseInt(localStorage.point);
        socket.on('question', image => {
            this.$store.commit('setImage', image);
        });
        socket.on(localStorage.id, isCorrect => {
            if (isCorrect) {
                sound.play()
                this.point += 10;
                localStorage.point = this.point;
                this.$store.dispatch(
                    'broadcast',
                    `User ${localStorage.nick} berhasil menjawab pertanyaan!`
                );
            } else {
                this.point--;
                localStorage.point = this.point;
            }
        });

        socket.on(localStorage.id + 'getimage', image => {
            this.$store.commit('setImage', image);
        });
        socket.emit('getQuestion', localStorage.id + 'getimage');

        socket.on('broadcast', message => {
            console.log(message); // ini ditampilkan ke notif
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
