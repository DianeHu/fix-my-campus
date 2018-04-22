<template>
  <v-app>
    <login :getUser="getUser" :setUser="setUser"></login>
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <issue
            v-for="issueItem in issueReference"
            :issue="issueItem"
            :currentUser="user"
          ></issue>
        </v-layout>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>

  import { storageRef } from './database';
  import {issueRef} from './database';

  import login from './components/login';
  import issue from './components/issue';

  export default {
    data () {
      return {
        user: null
      }
    },

    firebase:{
      issueReference: issueRef
    },

    components:{
      login,
      issue
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
