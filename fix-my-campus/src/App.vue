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

  import { storageRef } from './database';
  import {issueRef} from './database';
  import {tagRef} from './database';

  import login from './components/login';
  import newissue from './components/newissue';
  import issue from './components/issue';

  export default {
    data () {
      return {
        user: null,
        addingIssue: false
      }
    },

    firebase:{
      issueReference: issueRef,
      tagReference: tagRef
    },

    components:{
      login,
      issue,
      newissue
    },

    methods:{
      closeAddIssue(){
        this.addingIssue = false;
        this.deleteAllTemps();
      },

      deleteAllTemps(){
        var toRemove = this.tagReference.filter(t => t.owner == 'temp');
        toRemove.forEach(r => tagRef.child(r['.key']).remove());
      },

      openAddIssue(){
        this.addingIssue = true;
      },

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
