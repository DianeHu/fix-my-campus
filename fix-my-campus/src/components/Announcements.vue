<template>
  <v-container
    fluid
    style="min-height: 0;"
    grid-list-lg>
    <v-btn icon v-if="isUserAdmin() && !showNewAnnouncement" @click="showNewAnnouncement = true">
      <i class="material-icons">add</i>
    </v-btn>
    <v-flex xs12 v-if="showNewAnnouncement">
      <v-card>
        <v-toolbar dark dense>
          <v-btn icon v-if="!editingTitle" @click="editingTitle = true">
            <v-icon small>mode_edit</v-icon>
          </v-btn>
          <v-text-field v-if="editingTitle"
                        @keyup.enter="editTitle()"
                        name="editingTitle"
                        label="Title announcement"
                        v-model="newTitle"
                        style="display: inline-block;"
          ></v-text-field>
          <v-toolbar-title v-if="!editingTitle">
            {{newTitle}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-chip outline label>({{getDate()}})</v-chip>
        </v-toolbar>
        <v-card-text>
          <v-btn icon v-if="!editingDescription" @click="editingDescription=true">
            <v-icon small>mode_edit</v-icon>
          </v-btn>
          <v-text-field textarea
                        v-if="editingDescription"
                        name="editingDescription"
                        @keyup.enter="editDescription()"
                        label="Edit announcement description"
                        v-model="newDescription"
                        style="display: inline-block"
          ></v-text-field>
          <span v-else>{{newDescription}}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closePost()" dark>Close</v-btn>
          <v-btn @click="postAnnouncement" dark>Post</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-divider></v-divider>
    <v-container v-if="person" fluid
                 style="min-height: 0;"
                 grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm12 md4 v-for="announce in announcementReference">
          <v-card color="cyan darken-2" class="white--text">
            <v-toolbar dark dense>
              <v-toolbar-title>
                {{announce.title}}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              {{announce.admin}}
              <v-chip outline label>({{announce.date}})</v-chip>
            </v-toolbar>
            <v-card-text>
              {{announce.description}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions v-if="isUserAdmin()">
              <v-btn icon @click="deleteAnnounce(announce)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
  import {announcementRef} from '../database';
  import {userRef} from "../database";

  export default{
    data () {
      return{
        newTitle: 'New announcement',
        newDescription: 'Description',
        editingTitle: false,
        editingDescription: false,
        showNewAnnouncement: false
      }
    },

    props:[
      'person'
    ],

    methods: {
      getDate(){
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth() + 1;
        var y = today.getFullYear();

        if(d < 10) d = '0' + d;
        if(m < 10) m = '0' + m;
        today = m + '/' + d + '/' + y;
        return today;
      },

      editTitle(){
        this.newTitle = this.newTitle.trim();
        this.editingTitle = false;
      },

      editDescription(){
        this.newDescription = this.newDescription.trim();
        this.editingDescription = false;
      },

      postAnnouncement(){
        this.newTitle = this.newTitle.trim();
        this.newDescription = this.newDescription.trim();
        if(this.newTitle != 'New announcement' && this.newDescription!='Description'){
          announcementRef.push({
            title: this.newTitle,
            description: this.newDescription,
            date: this.getDate(),
            admin: this.person.name
          });
          this.showNewAnnouncement = false;
          this.newTitle = 'New announcement';
          this.newDescription = 'Description';
        } else{
          alert("Please fill in a title and description before posting, or close the announcement.");
        }
      },

      closePost(){
        this.newTitle = 'New announcement';
        this.newDescription = 'Description';
        this.showNewAnnouncement = false;
      },

      deleteAnnounce(announce){
        announcementRef.child(announce['.key']).remove();
      },

      isUserAdmin() {
        var filtered = this.userReference.filter(u => u.name == this.person.name);
        if(filtered.length != 0){
          return filtered[0].isAdmin;
        }
        return false;
      }
    },

    props: [
      'person'
    ],

    firebase: {
      announcementReference: announcementRef,
      userReference: userRef
    }
  }
</script>

<style>

</style>
