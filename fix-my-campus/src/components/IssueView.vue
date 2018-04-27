<template>
  <v-app>
    <v-card v-if="person">
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-btn icon v-if="!addingIssue" @click="openAddIssue()">
          <i class="material-icons">add</i>
        </v-btn>
        <v-menu offset-y>
          <v-btn color="primary" dark slot="activator">Filter by tags</v-btn>
          <v-list>
            <v-list-tile v-for="cat in categoryReference" :key="cat.title" @click="">
              <v-list-tile-title>{{ cat.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-layout row wrap>
          <newissue v-if="addingIssue"
                    :currentUser="person.name"
                    :closeIssue="closeAddIssue"
          ></newissue>
          <issue
            v-for="issueItem in issueReference"
            :issue="issueItem"
            :currentUser="person.name"
          ></issue>
        </v-layout>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>

  import { storageRef } from '../database';
  import {issueRef} from '../database';
  import {tagRef} from '../database';
  import {categoryRef} from "../database";

  import newissue from './newissue';
  import issue from './issue';

  export default {
    data () {
      return {
        user: null,
        addingIssue: false
      }
    },

    props: [
      'person'
    ],

    firebase:{
      issueReference: issueRef,
      tagReference: tagRef,
      categoryReference: categoryRef
    },

    components:{
      issue,
      newissue
    },

    methods:{
      filterIssueByCat(catTitle){
        
      },

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
    name: 'issue-view'
  }
</script>
