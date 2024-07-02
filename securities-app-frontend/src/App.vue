<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>KRC</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log('App component created');
  }
}
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';
body {
  font-family: 'Arial', sans-serif;
}
</style>
