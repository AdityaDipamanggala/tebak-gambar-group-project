<template>
    <div class="container">
        <h1>Coba tebak gambar!</h1>
        <h1>Point: {{ point }}</h1>
        <div>
            <img :src="image" />
        </div>
        <form @submit.prevent="postAnswer">
            <div class="form-group">
                <input
                    type="text"
                    class="form-control"
                    id="answer"
                    placeholder="Type your answer here"
                    v-model="store"
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
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
            socket.emit('answer', { id: localStorage.id, answer: this.answer });
            this.answer = '';
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

<style scoped></style>
