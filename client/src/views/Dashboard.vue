<template>
    <div>
        <Navbar></Navbar>
        <div class="container">
            <h1 class="marginatas">Let's guess the picture !</h1>
            <h1>Point: {{ point }}</h1>

            <center class="mt-4">
                <div class="alert alert-primary" role="alert" v-if="alert">
                    <strong>{{ alert }}</strong>
                </div>
            </center>

            <img class="image my-3" :src="$store.state.image" />
            <center class="mt-3">
                <form @submit.prevent="$store.dispatch('postAnswer')">
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            id="answer"
                            autocomplete="off"
                            placeholder="Type your answer here"
                            v-model="$store.state.answer"
                        />
                    </div>
                    <button type="submit" class="btn btn-success">Submit</button>
                </form>
            </center>
        </div>
        <div class="container mt-5">
            <h3>How to play:</h3>
            <p class="p-0 m-0">1. Tebaklah maksud dari gambar di atas</p>
            <p class="p-0 m-0">2. Input jawaban pada input yang disediakan, kemudian submit.</p>
            <p class="p-0 m-0">3. Jika jawaban yang diinput benar, point +10.</p>
            <p class="p-0 m-0">4. Jika jawaban yang diinput salah, point -1.</p>
            <p class="p-0 m-0">5. Kamu dapat melihat point tertinggi pada menu Leaderboard</p>
        </div>
    </div>
</template>

<script>
import socket from '../config/socket';
import Navbar from '../components/Navbar.vue';

export default {
    name: 'Dashboard',
    components: {
        Navbar
    },
    data: () => {
        return {
            point: 0,
            leaderData: [],
            alert: ''
        };
    },
    methods: {
        postAnswer() {
            this.$store.dispatch('postAnswer');
        },
        logout() {
            localStorage.clear();
            this.$router.push('/login');
        },
        setAlert(message) {
            this.alert = message;
            setTimeout(() => {
                this.alert = null;
            }, 2000);
        }
    },
    created() {
        this.point = parseInt(localStorage.point);
        socket.on('question', image => {
            this.$store.commit('setImage', image);
        });
        socket.on(localStorage.id, isCorrect => {
            if (isCorrect) {
                let sound = new Audio('correct.mp3');
                sound.volume = 0.5;
                sound.play();
                this.point += 10;
                localStorage.point = this.point;
                this.setAlert('Jawabanmu benar! Point +10');
                this.$store.dispatch(
                    'broadcast',
                    `User ${localStorage.nick} successfully answer the question!`
                );
            } else {
                this.point--;
                localStorage.point = this.point;
                this.setAlert('Jawabanmu salah! Point -1');
            }
        });

        socket.on(localStorage.id + 'getimage', image => {
            this.$store.commit('setImage', image);
        });
        socket.emit('getQuestion', localStorage.id + 'getimage');

        socket.on('broadcast', message => {
            this.setAlert(message);
        });

        setInterval(() => {
            socket.emit('uploadPoint', { nick: localStorage.nick, point: localStorage.point });
        }, 3000);

        socket.on('getLeaderboard', data => {
            console.log(data);
            this.$store.commit('setLeaderData', data);
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
    width: 45%;
}

.image {
    border: 2px white solid;
    align-items: center;
    border-radius: 10px;
}

#menu1 {
    background: gray;
    border: black;
}

.alert {
    text-align: center;
    width: 50%;
}

.marginatas {
    margin-top: 75px;
}

.lebarin {
    width: 45%;
}

table {
    width: 250px;
}

.posisi {
    margin-right: 15vh;
}
</style>
