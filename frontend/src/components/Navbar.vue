<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <!-- Additional links as needed -->
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Nav-bar',
    // Additional script logic
  }
  </script>
  
  <style>
nav {
  background-color: #2a3f54;
  padding: 10px;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  color: #ffa500;
}
  </style>
  