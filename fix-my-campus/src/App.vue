<template>
  <v-app>
    <login></login>
  </v-app>
</template>

<script>
  var config = {
    apiKey: "AIzaSyATUsYlp5G8zAMv1mZ-H7q3ATo2yH9Hp7I",
    authDomain: "fixmycampus-78290.firebaseapp.com",
    databaseURL: "https://fixmycampus-78290.firebaseio.com",
    projectId: "fixmycampus-78290",
    storageBucket: "fixmycampus-78290.appspot.com",
    messagingSenderId: "464047240260"
  };

  var db = firebase.initializeApp(config).database();

  import login from './components/login';
  export default {
    data () {
      return {
      }
    },

    components:{
      login
    },
    name: 'App'
  }
</script>
