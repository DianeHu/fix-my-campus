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
          <v-btn color="primary" dark slot="activator">Showing: {{getCurrCatTitle()}}</v-btn>
          <v-list>
            <v-list-tile color="darkcyan" @click="setFilter('All')">
              <v-list-tile-title>All</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-for="cat in categoryReference" :key="cat.title" @click="setFilter(cat)">
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
            v-for="issueItem in filterIssueByCat()"
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
        addingIssue: false,
        cat: 'All'
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
      getCurrCatTitle(){
        if(this.cat == 'All') return 'All';
        return this.cat.title;
      },

      setFilter(cat){
        this.cat = cat;
      },

      filterIssueByCat(){
        if(this.cat == "All"){
          return this.issueReference;
        } else{
          var tagged = this.tagReference.filter(t => t.id == this.cat['.key']);
          /*console.log("tagged");
          console.log(tagged);
          var returnable = [];
          tagged.forEach(t => returnable.push(tagRef.child(t.owner)));
          console.log(returnable);
          return returnable;*/
          var ret = this.issueReference.filter(i => this.issueIsTaggedBy(i, this.cat));
          return ret;
        }
      },

      issueIsTaggedBy(issue, cat){
        /*id: cat['.key'],
          owner: this.issueProp['.key']*/
        var filter = this.tagReference.filter(t => t.id == cat['.key'] && t.owner == issue['.key']);
        if(filter.length == 0) return false;
        return true;
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
