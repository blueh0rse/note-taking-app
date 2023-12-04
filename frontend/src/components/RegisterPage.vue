<template>
  <div>
    <img class="logo" src="../assets/logo4.png"/>
    <h1>Sign Up</h1>
    <div class="register">
      <input type="text" placeholder="Enter your Email" />
      <input type="text" placeholder="Enter your Name" />
      <input type="password" placeholder="Enter your Password" />
      <input type="password" placeholder="Repeate your Password" />
      <button @click="navigateToLogin">Sign Up!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  methods: {
    navigateToLogin() {
      // Qui inserisci la logica per la registrazione dell'utente.
      // Dopo la registrazione con successo, puoi navigare alla pagina di login.
      
      // Supponiamo che dopo la registrazione tu voglia navigare alla rotta "/login".
      // Puoi cambiare questa rotta in base alle tue esigenze.
      
      // Utilizza this.$router per accedere all'oggetto del router Vue.
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.logo{
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
h1, .register button {
    display: block;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
}
.register button {
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    background: skyblue;
    color: white;
    cursor: pointer;
}
</style>
