<template>
  <v-layout row justify-center>
    <h1>Hiiiii</h1>
    <v-btn dark @click="dialog = true">Request to become a site administrator</v-btn>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Request to become an administrator</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-text-field textarea name="addReasoning"
                        label="Why do you want to become a site administrator?"
                        v-model="newReason"
                        style="display: inline-block;"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="closeRequest()">Close request</v-btn>
          <v-btn color="green darken-1" flat @click.native="addNewRequest()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {adminRequestRef} from '../database';
  import {inboxRef} from '../database';

  export default {
    name: "requestadmin",

    firebase:{
      adminRequestReference: adminRequestRef,
      inboxReference: inboxRef
    },

    props:[
      'user'
    ],

    data(){
      return{
        newReason: '',
        dialog: false
      }
    },

    methods:{
      addNewRequest(){
        this.newReason = this.newReason.trim();
        if(this.newReason){
          adminRequestRef.push({
            user: this.user,
            reasoning: this.newReason
          });

          this.dialog = false;

          var today = new Date();
          var d = today.getDate();
          var m = today.getMonth() + 1;
          var y = today.getFullYear();

          if(d < 10) d = '0' + d;
          if(m < 10) m = '0' + m;
          today = m + '/' + d + '/' + y;

          inboxRef.push({
            title: 'Pending request: become site administrator',
            type: 'admin',
            user: this.user,
            date: today
          })

        } else{
          alert("You need to submit a reason with your request to be an administrator.");
        }
      },

      closeRequest(){
        this.newReason = '';
        this.dialog = false;
      }
    }
  }
</script>

<style scoped>

</style>
