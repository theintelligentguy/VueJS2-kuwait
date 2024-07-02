import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import UserManagement from '../components/UserManagement.vue';
import Dashboard from '../components/Dashboard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'UserManagement',
      component: UserManagement
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
});
