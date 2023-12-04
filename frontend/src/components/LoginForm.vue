<template>
    <div>
      <img class="logo" src="../assets/logo4.png" />
      <h1>Log In!</h1>
      <div class="register">
        <input type="text" placeholder="Enter your Email" v-model="username" />
        <input type="password" placeholder="Enter your Password" v-model="password" />
        <button @click="login">Log in!</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
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
          const response = await axios.post('/login', {
            username: this.username,
            password: this.password,
          });
  
          // Handle the response of the request
          console.log('Login successful', response.data);
  
          // Una volta che l'utente ha effettuato il login con successo,
          // utilizza this.$router per navigare a HelloWorld.vue
          this.$router.push('/HelloWorld');
        } catch (error) {
          // Handle the error
          console.error('Login error', error);
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
    text-align: center; /* This will center the text inside the element */
  }
  
  .register button {
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    background: skyblue;
    color: white;
    cursor: pointer;
    background-color: #0056b3;
    transition: background-color 0.3s ease;
  }
  
  .register button:hover {
    background-color: #003d80;
  }
  </style>
  