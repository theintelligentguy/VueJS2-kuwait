<template>
    <v-container>
      <v-card class="pa-5">
        <h1>User Management</h1>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="user.username"
            label="Username"
            :rules="usernameRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            label="Password"
            :rules="passwordRules"
            type="password"
            required
          ></v-text-field>
          <v-btn @click="saveUser" :disabled="!valid">
            {{ user.id ? 'Update User' : 'Add User' }}
          </v-btn>
        </v-form>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-1"
        item-key="id"
        @click:row="selectUser"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="editUser(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import { required, minLength } from '@vuelidate/validators';
  import useVuelidate from '@vuelidate/core';
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        valid: false,
        user: {
          id: null,
          username: '',
          password: ''
        },
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Username', value: 'username' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        usernameRules: [
          v => !!v || 'Username is required',
          v => v.length >= 3 || 'Username must be at least 3 characters'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Password must be at least 6 characters'
        ]
      };
    },
    computed: {
      ...mapGetters(['allUsers']),
      users() {
        return this.allUsers;
      }
    },
    methods: {
      ...mapActions(['fetchUsers', 'addUser', 'updateUser', 'deleteUser']),
      saveUser() {
        if (this.$refs.form.validate()) {
          if (this.user.id) {
            this.updateUser(this.user);
          } else {
            this.addUser(this.user);
          }
          this.resetForm();
        }
      },
      editUser(user) {
        this.user = { ...user };
      },
      async deleteUser(userId) {
        const confirmed = confirm('Are you sure you want to delete this user?');
        if (confirmed) {
          await this.deleteUser(userId);
        }
      },
      resetForm() {
        this.user = {
          id: null,
          username: '',
          password: ''
        };
        this.$refs.form.reset();
      },
      selectUser(user) {
        this.user = { ...user };
      }
    },
    created() {
      this.fetchUsers();
    },
    setup() {
      return { v$: useVuelidate() };
    }
  };
  </script>
  
  <style scoped>
  .v-container {
    max-width: 800px;
    margin: auto;
  }
  
  .v-card {
    margin-bottom: 20px;
  }
  
  .v-data-table {
    margin-top: 20px;
  }
  
  .v-icon {
    cursor: pointer;
    margin: 0 5px;
  }
  </style>
  