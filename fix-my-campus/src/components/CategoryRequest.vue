<template>
  <v-layout row justify-center>
    <v-btn dark @click="dialog=true">Request tag category</v-btn>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">Request to add tag category</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-text-field name="createTag"
                        label="Tag name"
                        v-model="newTag"
                        style="display: inline-block;"
          ></v-text-field>
          <v-text-field textarea name="addDescription"
                        label="Describe the suggested new category"
                        v-model="newDescription"
                        style="display: inline-block;"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="closeRequest()">Close request</v-btn>
          <v-btn color="green darken-1" flat @click.native="addNewPotentialTag()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {catRequestRef} from '../database';
  import {inboxRef} from '../database';

  export default {
    name: "categoryrequest",

    firebase:{
      catRequestReference: catRequestRef,
      inboxReference: inboxRef
    },

    data(){
      return{
        dialog: false,
        newTag: '',
        newDescription: ''
      }
    },

    props:[
      'user'
    ],

    methods:{
      closeRequest(){
        this.newTag = '';
        this.newDescription = '';
        this.dialog = false;
      },

      addNewPotentialTag(){
        this.newTag = this.newTag.trim();
        this.newDescription = this.newDescription.trim();
        if(this.newTag && this.newDescription){
          catRequestRef.push({
            title: this.newTag,
            description: this.newDescription
          })
          this.dialog = false;

          var today = new Date();
          var d = today.getDate();
          var m = today.getMonth() + 1;
          var y = today.getFullYear();

          if(d < 10) d = '0' + d;
          if(m < 10) m = '0' + m;
          today = m + '/' + d + '/' + y;

          inboxRef.push({
            title: 'Pending request: add tag category ' + this.newTag,
            type: 'category',
            cat: this.newTag,
            op: this.user,
            date: today
          })

        } else{
          alert('Please fill out both the new tag title and description before submitting, or close the request.')
        }
        this.newTag = '';
        this.newDescription = '';
      }
    }
  }
</script>

<style scoped>

</style>
