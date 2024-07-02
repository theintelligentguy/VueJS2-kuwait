<template>
  <div>
    <h1>User Management</h1>
    <form @submit.prevent="addUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="newUser.username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="newUser.password" required>
      </div>
      <button type="submit">Add User</button>
    </form>
    <div v-if="users.length">
      <h2>Users</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }}
          <button @click="editUser(user)">Edit</button>
          <button @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
  created () {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers () {
      const response = await fetch('http://localhost:3000/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      this.users = await response.json()
    },
    async addUser () {
      await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(this.newUser)
      })
      this.fetchUsers()
    },
    async editUser (user) {
      // Implement user editing logic
    },
    async deleteUser (id) {
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      this.fetchUsers()
    }
  }
}
</script>
