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
            <v-list-tile v-bind:style="{background : selectedOrNot('All')}" @click="setFilter('All')">
              <v-list-tile-title>All</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-bind:style="{background : selectedOrNot('Filter by date')}" @click="setFilter('Filter by date')">
              <v-list-tile-title>Filter by date</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-bind:style="{background : selectedOrNot(cat.title)}" v-for="cat in categoryReference" :key="cat.title" @click="setFilter(cat)">
              <v-list-tile-title>{{ cat.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <!--<v-chip small disabled outline color="red darken-1" text-color="red darken-1">
          <v-avatar large>
            <v-menu offset-x left top allow-overflow full-width>
              <v-btn slot="activator" icon small @click="card_deadline(card)">
                <v-icon small color="red darken-1">date_range</v-icon>
              </v-btn>
              <v-flex xs12 sm6>
                <v-date-picker color="red darken-1" v-model="currCardDeadline" v-on:input="card_deadline(card)" ></v-date-picker>
              </v-flex>
            </v-menu>
          </v-avatar>
          {{card.deadline}}
        </v-chip>-->
        <!-- <v-layout row justify-center>
           <v-dialog v-model="showDatePicker">
             <v-card>
               <v-flex xs12 sm6>
                 <v-date-picker v-model="dateFilter"></v-date-picker>
               </v-flex>
             </v-card>
             <v-card-actions>
               <v-btn @click="removeDatePicker()">Filter</v-btn>
             </v-card-actions>
           </v-dialog>
         </v-layout>-->
        <span v-if="showDatePicker">
          <v-chip small disabled outline>
            <v-avatar large>
              <v-menu allow-overflow full-width>
                <v-btn slot="activator" icon small>
                  <v-icon small>date_range</v-icon>
                </v-btn>
                <v-flex xs12 sm6>
                  <v-date-picker v-model="dateFilter"></v-date-picker>
                </v-flex>
              </v-menu>
            </v-avatar>
            {{dateFilter}}
          </v-chip>
          <v-btn icon @click="removeDatePicker()">
            <v-icon small>close</v-icon>
          </v-btn>
        </span>

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
        cat: 'All',
        dateFilter: '',
        showDatePicker: false
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
      removeDatePicker(){
        this.cat = 'All';
      },

      selectedOrNot(catTitle){
        if(this.cat == catTitle || this.cat.title == catTitle) return "lightgrey";
        return "white";
      },

      getCurrCatTitle(){
        if(this.cat == 'All') return 'All';
        if(this.cat == 'Filter by date') return (this.dateFilter == '')? 'date not selected': 'Created ' + this.dateFilter;
        return this.cat.title;
      },

      setFilter(cat){
        this.cat = cat;
      },

      filterByDate(){
        var date = this.dateFilter.split('-');
        var filterDate = date[1] + '/' + date[2] + '/' + date[0];
        var filterByDate = this.issueReference.filter(i => i.date == filterDate);
        return filterByDate;
      },

      filterIssueByCat(){
        if(this.cat == "All"){
          this.dateFilter = '';
          this.showDatePicker = false;
          return this.issueReference;
        }else if(this.cat == 'Filter by date'){
          this.showDatePicker = true;
          return this.filterByDate();
        }else{
          this.dateFilter = '';
          this.showDatePicker = false;
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
