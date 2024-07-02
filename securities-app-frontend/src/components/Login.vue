<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        const user = {
          username: this.username,
          password: this.password
        };
        try {
          const response = await axios.post('http://localhost:3000/api/auth/login', user);
          localStorage.setItem('token', response.data.token);
          this.$router.push('/dashboard');
        } catch (error) {
          this.errorMessage = 'Invalid credentials';
          console.error('Invalid credentials:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    background: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
  
  .login-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .login-container h1 {
    margin-bottom: 1.5rem;
    font-size: 24px;
    color: #333;
  }
  
  .login-container form {
    display: flex;
    flex-direction: column;
  }
  
  .login-container label {
    text-align: left;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #555;
  }
  
  .login-container input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .login-container button {
    background: #007bff;
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .login-container button:hover {
    background: #0056b3;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
  }
  </style>
  