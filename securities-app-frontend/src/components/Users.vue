<template>
  <div>
    <h2>Users</h2>
    <form @submit.prevent="createUser">
      <input v-model="newUser.username" placeholder="Username" />
      <input v-model="newUser.password" type="password" placeholder="Password" />
      <button type="submit">Create User</button>
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
import axios from 'axios'
export default {
  data () {
    return {
      newUser: {
        username: '',
        password: ''
      },
      users: []
    }
  },
  async created () {
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      const response = await axios.get('/api/users')
      this.users = response.data
    },
    async createUser () {
      await axios.post('/api/users', this.newUser)
      this.loadUsers()
    },
    async deleteUser (userId) {
      await axios.delete(`/api/users/${userId}`)
      this.loadUsers()
    }
  }
}
</script>
