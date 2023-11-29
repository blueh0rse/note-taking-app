<template>
    <img class="logo" src="../assets/logo.png"/>
    <h1>Log In!</h1>
    <div class="register">
        <input type="text" placeholder="Enter your Email" />
        <input type="password" placeholder="Enter your Password" />
        <button>Log in!</button>
    </div>
    </template>
    <script>
    export default{
        name :'LoginForm'
    
    }
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
      text-align: center; /* Questo centrerà il testo all'interno dell'elemento */
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