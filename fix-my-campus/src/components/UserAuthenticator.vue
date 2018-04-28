<template>
  <v-card>
    <v-card-text>
      <v-list>
        <v-text-field
          name="Duke ID"
          label = "Enter your DukeID"
          v-model = tempUserID
        ></v-text-field>
        <v-text-field
          name="Net ID"
          label = "Enter your NetID"
          v-model = tempNetID
        ></v-text-field>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-flex align-center>
        <v-btn dark v-on:click.native="authenticateInformation()">
          Submit
        </v-btn>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>
  import {userRef} from '../database.js'
  export default{

    data () {
      return {
        tempUserID: '',
        tempNetID: ''
      }
    },

    firebase: {
      userReference: userRef
    },

    props: [
      'dialog',
      'user'
    ],

    methods: {
      authenticateInformation () {
        this.checkDukeStudent(this.tempNetID, this.tempUserID);
      },

      checkDukeStudent (netID, userID) {
        var student = true;
        var url = 'https://streamer.oit.duke.edu/ldap/people/netid/' + netID + '?access_token=512c70bd8a6cf54fae040bb6f6bb8ccc'
        const proxyURL = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyURL + url)
          .then(response => response.json())
          .then(contents => {
            if (contents === undefined || contents.length == 0){
              student =  false;
            } else {
              student =  contents[0].duid == userID && contents[0].netid == netID.toLowerCase()
            }
            if (student) {
              userRef.push({
                name: this.user.name,
                isAdmin: false
              })
              this.tempUserID = ''
              this.tempNetID = ''
            } else {
              alert('Incorrect Duke ID or Net ID, please try again');
            }
          }).catch(() => console.log('Access to ' + url + ' is still blocked.'))
      }
    }
  }
</script>

<style>

</style>
