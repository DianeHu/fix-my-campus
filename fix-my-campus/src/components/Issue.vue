<template>
  <v-flex xs12 sm6 md4>
    <v-card color="cyan darken-2" class="white--text">
      <v-toolbar color="grey lighten-2" dense>
        <v-toolbar-title>
          <div class="headline">
            <v-btn v-if="issue.owner == currentUser && !issue.editingTitle" icon @click="setEditTrue('Title')">
              <v-icon small>mode_edit</v-icon>
            </v-btn>
            <v-text-field v-if="issue.editingTitle"
                          @keyup.enter="editTitle()"
                          name="editIssueTitle"
                          label="Rename issue"
                          v-model="renameTitle"
                          style="display: inline-block;"
            ></v-text-field>
            <span v-else>{{issue.title}}</span>
          </div>
        </v-toolbar-title>
        <v-spacer>
        </v-spacer>
        <span>{{issue.owner}}</span>
      </v-toolbar>
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs7>
            <div>
              <div>
                <v-btn icon v-if="issue.owner == currentUser && !issue.editingDescription" @click="setEditTrue('Description')">
                  <v-icon small>mode_edit</v-icon>
                </v-btn>
                <v-text-field v-if="issue.editingDescription"
                              @keyup.enter="editDescription()"
                              name="editIssueDescription"
                              label="Rename issue description"
                              v-model="renameDescription"
                              style="display: inline-block;"
                ></v-text-field>
                <span v-else>{{issue.description}}</span>
              </div>
            </div>
          </v-flex>
          <v-flex xs5 v-if="issue.image">
            <v-card-media
              :src="issue.image"
              height="125px"
              contain
            ></v-card-media>
          </v-flex>
        </v-layout>
        <v-btn @click="closeIssue()" icon v-if="issue.owner == currentUser">
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn v-if="issue.owner == currentUser" icon v-on:click.native="changeImage">
          <v-icon>add_a_photo</v-icon>
        </v-btn>
        <input ref="fileNew" style="display: none" type="file" id="images" name="files[]" @change="addImage"/>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
  import { storageRef } from '../database';
  import {issueRef} from '../database';

  export default {
    name: "issue",

    data(){
      return{
        renameTitle: '',
        renameDescription: '',
        image: null,
        imagePath: ''
      }
    },

    props:[
      'issue',
      'currentUser'
    ],

    firebase:{
      issueReference: issueRef
    },

    methods:{
      setEditTrue(val){
        if(val == "Title"){
          issueRef.child(this.issue['.key']).update({editingTitle: true});
        } else if (val == "Description"){
          issueRef.child(this.issue['.key']).update({editingDescription: true});
        }
      },

      closeIssue(){
        issueRef.child(this.issue['.key']).remove();
      },

      editTitle(){
        this.renameTitle = this.renameTitle.trim();
        if(this.renameTitle){
          issueRef.child(this.issue['.key']).update({title: this.renameTitle, editingTitle: false});
        }
      },

      editDescription(){
        this.renameDescription = this.renameDescription.trim();
        if(this.renameDescription){
          issueRef.child(this.issue['.key']).update({description: this.renameDescription, editingDescription: false});
        }
      },

      changeImage(){
        this.$refs.fileNew.click();
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
        issueRef.child(this.issue['.key']).update({image: arg});
      },
    }
  }
</script>

<style scoped>

</style>
