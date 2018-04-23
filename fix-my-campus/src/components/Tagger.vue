<template>
  <!--<v-menu offset-y>
    <v-btn dark slot="activator">Tag issue</v-btn>
    <v-list>
      <v-list-tile dark>
        <v-text-field @keyup.enter="addNewTag()"
                      name="createTag"
                      label="Create new tag"
                      v-model="newTag"
                      style="display: inline-block;"
        ></v-text-field>
      </v-list-tile>
      <v-list-tile v-for="tag in tagRef" :key="tag.title" @click="">
        <v-list-tile-title>{{ tag.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>-->
  <div>
    <v-btn dark @click="dialog=true">Tag issue</v-btn>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Tag issue</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-text-field @keyup.enter="addNewTag()"
                        name="createTag"
                        label="Create new tag"
                        v-model="newTag"
                        style="display: inline-block;"
          ></v-text-field>
          <v-container fluid>
            <v-list-tile v-for="tag in tagRef">
              <v-list-tile-action>
                <v-checkbox v-model="checkbox"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{tag.title}}</v-list-tile-title>
              </v-list-tile-content>
              <v-btn @click="log(tag)">nothing</v-btn>
              <!--<v-list-tile-content>
                <v-icon @click="removeCategory(category)">close</v-icon>
              </v-list-tile-content>-->
            </v-list-tile>
           <!-- <v-checkbox v-for="singleTag in getTagRef"
                        v-model="checkbox"
                        v-bind:label=singleTag.title
                        v-bind:value=singleTag.title></v-checkbox>-->
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {tagRef} from '../database';
  import {issueRef} from '../database';

  export default {
    firebase:{
      issueReference: issueRef,
      tagReference: tagRef/*,
      tagsForThisIssue: issueRef.child(this.issue['.key']).child('myTags')*/
    },

    name: "tagger",

    props:[
      'issueProp'
    ],

    data(){
      return{
        newTag: '',
        dialog: false,
        checkbox: true
      }
    },

    methods:{
      log(tag){
        console.log(tag.title);
      },

      addNewTag(){
        this.newTag = this.newTag.trim();
        if(this.newTag){
          tagRef.push({
            title: this.newTag
          });
        }
        this.newTag = '';
      },

      addTagToIssue(tag){

      },

      /*selectedOrNot(tag){
        var filtered = this.tagsForThisIssue.filter(t => t.id == tag['.key']);
        if(filtered.length == 0) return false;
        return true;
      },*/

      removeTagFromIssue(tag){

      }
    },

    computed:{
    }
  }
</script>

<style scoped>

</style>
