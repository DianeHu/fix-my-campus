<template>
  <v-parallax src="https://vuetifyjs.com/static/doc-images/parallax/material.jpg" height="700">
    <v-layout column align-center justify-center>
      <v-form>
        <v-text-field label="Email" v-model="newEmail" required></v-text-field>
        <v-text-field label="Password" v-model="newPassword" required></v-text-field>
        <v-card-actions>
          <v-btn>Login</v-btn>
          <v-btn>Sign Up</v-btn>
        </v-card-actions>
      </v-form>
    </v-layout>
  </v-parallax>
</template>

<script>

  export default {
    name: "login",

    data(){
      return{
        newEmail: '',
        newPassword: ''
      }
    },

    methods:{
      checkDukeStudent(){
        this.newEmail = this.newEmail.trim();
        if(this.newEmail){
          var netID = "";
          for(var i = 0; i < this.newEmail.length; i++){
            if(this.newEmail[i] == "@"){
              break;
            }
            netID += this.newEmail[i];
          }

          var url="https://streamer.oit.duke.edu/ldap/people/netid/" + netID + "?access_token=512c70bd8a6cf54fae040bb6f6bb8ccc";

          //running into same error as on Piazza
          fetch(url).then(response => response.json())
            .then(data => {
              var tester = data.items[0];
              if(tester != null){
                return true;
              }
            })
            .catch(error => console.log(error))
        }
        return false;
      }
    }
  }

</script>

<style scoped>

</style>
