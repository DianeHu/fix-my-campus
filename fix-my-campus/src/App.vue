<template>
  <v-app>
    <div>
      <login :getUser="getUser" :setUser="setUser"></login>
      <router-view :person = this.user></router-view>
    </div>
  </v-app>
</template>

<script>
  import {issueRef} from './database'
  /*import login from './components/Login.vue'*/
  export default{
    data () {
      return {
        user: null
      }
    },
    firebase: {
      issueReference: issueRef
    },

    components: {
      /*login*/
    },

    methods: {
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

<style>

</style>
