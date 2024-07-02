<template>
    <div>
      <h1>User Management</h1>
      <form @submit.prevent="addUser">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Add User</button>
      </form>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }}
          <button @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    computed: {
      ...mapGetters(['allUsers'])
    },
    methods: {
      ...mapActions(['fetchUsers', 'addUser', 'deleteUser']),
      addUser() {
        const user = {
          username: this.username,
          password: this.password
        };
        this.addUser(user);
        this.username = '';
        this.password = '';
      }
    },
    created() {
      this.fetchUsers();
    }
  };
  </script>