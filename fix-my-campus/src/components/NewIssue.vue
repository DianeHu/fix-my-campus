<template>
  <v-flex xs12>
    <v-card>
      <v-toolbar dark dense>
        <v-toolbar-title>
          <div class="headline">
            <v-btn icon v-if="!editingTitle" @click="setEditTrue('Title')">
              <v-icon small>mode_edit</v-icon>
            </v-btn>
            <v-text-field v-if="editingTitle"
                          @keyup.enter="editTitle()"
                          name="editIssueTitle"
                          label="Title issue"
                          v-model="renameTitle"
                          style="display: inline-block;"
            ></v-text-field>
            <span v-else>{{renameTitle}}</span>
          </div>
        </v-toolbar-title>
        <v-spacer>
        </v-spacer>
        <span>{{currentUser}}</span>
      </v-toolbar>
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs7>
            <div>
              <!--<div>{{currentUser}}</div>
              <div class="headline">
                <v-btn icon v-if="!editingTitle" @click="setEditTrue('Title')">
                  <v-icon>mode_edit</v-icon>
                </v-btn>
                <v-text-field v-if="editingTitle"
                              @keyup.enter="editTitle()"
                              name="editIssueTitle"
                              label="Title issue"
                              v-model="renameTitle"
                              style="display: inline-block;"
                ></v-text-field>
                <span v-else>{{renameTitle}}</span>
              </div>
              <div>-->
              <v-btn icon v-if="!editingDescription" @click="setEditTrue('Description')">
                <v-icon small>mode_edit</v-icon>
              </v-btn>
              <v-text-field v-if="editingDescription"
                            @keyup.enter="editDescription()"
                            name="editIssueDescription"
                            label="Add issue description"
                            v-model="renameDescription"
                            style="display: inline-block;"
              ></v-text-field>
              <span v-else>{{renameDescription}}</span>
            </div>
          </v-flex>
          <v-flex xs5 v-if="image != null">
            <v-card-media
              :src=image
              height="125px"
              contain
            ></v-card-media>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-btn @click="closeIssue()" icon>
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn icon v-on:click.native="changeImage">
            <v-icon>add_a_photo</v-icon>
          </v-btn>
          <v-btn @click="submit()" flat>Submit</v-btn>
          <input ref="file" style="display: none" type="file" id="images" name="files[]" @change="addImage"/>
          <v-chip outline>{{currDate}}</v-chip>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
  import { storageRef } from '../database';
  import {issueRef} from '../database';

  export default {
    name: "newissue",

    data(){
      return{
        renameTitle: 'Issue',
        renameDescription: 'Description',
        editingTitle: false,
        editingDescription: false,
        image: null,
        date: ''
      }
    },

    props:[
      'currentUser',
      'closeIssue',
      'showing'
    ],

    computed:{
      currDate(){
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth() + 1;
        var y = today.getFullYear();

        if(d < 10) d = '0' + d;
        if(m < 10) m = '0' + m;
        this.date = m + '/' + d + '/' + y;
        today = m + '/' + d + '/' + y;
        return today;
      },
    },

    firebase:{
      issueReference: issueRef
    },

    methods:{
      submit(){
        if(this.renameTitle != 'Issue' && this.renameDescription !='Description'){
          issueRef.push({
            title: this.renameTitle,
            description: this.renameDescription,
            editingTitle: false,
            editingDescription: false,
            image: this.image,
            owner: this.currentUser,
            date: this.date,
            showComments: false
          });
          this.closeIssue();
        } else{
          alert("You didn't fill out all the required fields. Close the issue or fill out all required fields");
        }
      },

      setEditTrue(val){
        if(val == "Title"){
          this.editingTitle = true;
        } else if (val == "Description"){
          this.editingDescription = true;
        }
      },

      editTitle(){
        this.renameTitle = this.renameTitle.trim();
        this.editingTitle = false;
      },

      editDescription(){
        this.renameDescription = this.renameDescription.trim();
        this.editingDescription = false;
      },

      changeImage(){
        this.$refs.file.click();
      },

      addImage(event){
        var file = event.target.files;
        if(file){
          this.image = file[0];
          this.imagePath = file.name;
        }
        storageRef.child('images/' + this.imagePath).put(this.image).then(snapshot => this.updateImage(snapshot.downloadURL));
        event.target.value = '';
      },

      updateImage(arg){
        this.image = arg;
      },
    }
  }
</script>

<style scoped>

</style>
