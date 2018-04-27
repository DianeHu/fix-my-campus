<template>
  <v-app>
    <login :getUser="getUser" :setUser="setUser"></login>
    <v-card v-if="user">
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-btn icon v-if="!addingIssue" @click="openAddIssue()">
          <i class="material-icons">add</i>
        </v-btn>
        <v-layout row wrap>
          <newissue v-if="addingIssue"
            :currentUser="user.name"
            :closeIssue="closeAddIssue"
          ></newissue>
          <issue
            v-for="issueItem in issueReference"
            :issue="issueItem"
            :currentUser="user.name"
          ></issue>
        </v-layout>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>

  import {storageRef } from '../database';
  import {issueRef} from '../database';

  import login from './Login'
  import newissue from './NewIssue';
  import issue from './Issue';

  export default {
    data () {
      return {
        user: null,
        addingIssue: false
      }
    },

    firebase: {
      issueReference: issueRef
    },

    components:{
      login,
      issue,
      newissue
    },

    methods:{
      closeAddIssue(){
        this.addingIssue = false;
      },

      openAddIssue(){
        this.addingIssue = true;
        console.log("turned to true");
      },

      getUser () {
        return this.user
      },

      setUser (user) {
        this.user = user
      }
    },
    name: 'issue-view'
  }
</script>
