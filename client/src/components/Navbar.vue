<template>
    <div class="container">
        <nav class="navbar navbar-light bg-transparent justify-content-between fixed-top">
            <!-- <div class="container ml-5 mr-5"> -->
            <a class="navbar-brand ml-5" style="color: brown;"
                ><strong>Guess The Word Game</strong></a
            >
            <div class="dropdown posisi">
                <button
                    class="btn btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                >
                    Leaderboard <span class="caret"></span>
                </button>

                <table id="dropdown" class="table dropdown-menu text-center table-borderless">
                    <tbody>
                        <tr v-for="(data, i) in $store.state.leaderData" :key="i" class="p-0 m-0">
                            <th class="text-left">{{ data.nick }}</th>
                            <th class="text-center">{{ data.point }} pts</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="btn btn-danger my-0 my-sm-0 mr-5" type="button" @click.prevent="logout">
                Logout
            </button>
            <!-- </div> -->
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
table {
    width: 300px;
}

.posisi {
    margin-right: 15vh;
}
</style>
