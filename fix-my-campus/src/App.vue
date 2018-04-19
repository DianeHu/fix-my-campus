<template>
  <v-app>
    <login :getUser="getUser" :setUser="setUser"></login>
  </v-app>
</template>

<script>

  import login from './components/login';

  export default {
    data () {
      return {
        user: null
      }
    },

    firebase:{

    },

    components:{
      login
    },

    methods:{
      getUser () {
        return this.user
      },
      setUser (user) {
        this.user = user
      }
    },
    name: 'App'
  }
</script>
