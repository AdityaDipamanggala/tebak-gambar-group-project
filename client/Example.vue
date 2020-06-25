<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export default {
    name: 'App',
    data: () => {
        return {
            image: '',
            id: new Date().getTime(),
            nick: 'terserah',
            point: 0,
        };
    },
    methods: {
        getQuestion() {
            socket.on('question', (image) => {
                console.log(image);
                this.image = image;
            });
        },
        postAnswer(answer) {
            socket.emit('answer', { id: this.id, answer: answer });
        },
    },
    created() {
        socket.on('question', (image) => {
            console.log(image);
            this.image = image;
        });
        socket.on(this.id, (isCorrect) => {
            if (isCorrect) this.point += 10;
            else this.point--;
        });
    },
};
</script>