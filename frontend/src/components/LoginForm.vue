<template>
    <img class="logo" src="../assets/logo4.png" />
    <h1>Log In!</h1>
    <div class="register">
        <input type="text" placeholder="Enter your Email" />
        <input type="password" placeholder="Enter your Password" />
        <button>Log in!</button>
    </div>
</template>
<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await this.$http.post('/login', {
                    username: this.username,
                    password: this.password,
                });

                // Gestisci la risposta della richiesta
                console.log('Accesso riuscito', response.data);
            } catch (error) {
                // Gestisci l'errore
                console.error('Errore di accesso', error);
            }
        },
    },
};
    
</script>
    
<style>
.logo {
    width: 150px;
    display: block;
    margin-right: auto;
    margin-left: auto;

}

.register input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;

}

h1,
.register button {
    display: block;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    /* Questo centrerà il testo all'interno dell'elemento */
}

.register button {
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    background: skyblue;
    color: white;
    cursor: pointer;
    background-color: #0056b3;
}</style>