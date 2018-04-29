<template>
  <v-card v-if="person">
    <v-container fluid
                 style="min-height: 0;"
                 grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm12 md4 v-for="msg in getRequestUpdates()">
          <v-card>
            <v-toolbar :color="getColor(msg)" dense>
              <v-toolbar-title>
                {{msg.op}} ({{msg.date}})
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn @click="resolve(msg)">Resolve</v-btn>
            </v-toolbar>
            <v-card-text>
              {{msg.title}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-chip>{{msg.type}}</v-chip>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md4 v-for="msg in getFollowUpdates()">
          <v-card>
            <v-toolbar :color="getColor(msg)" dense>
              <v-toolbar-title>
                {{msg.commenter}} ({{msg.date}})
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn @click="removeMsg(msg)" icon>
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              {{msg.title}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              {{msg.comment}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-chip>{{msg.type}}</v-chip>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 md4 v-for="msg in getDecisions()">
          <v-card>
            <v-toolbar :color="getColor(msg)" dense>
              <v-toolbar-title>
                {{msg.admin}} ({{msg.date}})
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn @click="removeMsg(msg)" icon>
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              {{msg.title}}
            </v-card-text>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-chip>{{msg.type}}</v-chip>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout v-if="currCatRequest" row justify-center>
      <v-dialog v-model="catDialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">Approve or deny request to add tag category</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="headline mb-0">Name: {{currCatRequest.cat}}</h3>
            <div>Description: {{getCatRequestDesc()}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="resolveCatAdd(currCatRequest, 'approve')">Approve</v-btn>
            <v-btn color="green darken-1" flat @click.native="resolveCatAdd(currCatRequest, 'reject')">Reject</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout v-if="currAdminRequest" row justify-center>
      <v-dialog v-model="adminDialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">Approve or deny request to become admin</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="headline mb-0">Name: {{currAdminRequest.op}}</h3>
            <div>Reasoning: {{getAdminRequestReason(currAdminRequest.op)}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="resolveAdminAdd(currAdminRequest, 'approve')">Approve</v-btn>
            <v-btn color="green darken-1" flat @click.native="resolveAdminAdd(currAdminRequest, 'reject')">Reject</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </v-card>
</template>

<script>
  import {adminRequestRef} from "../database";
  import {catRequestRef} from "../database";
  import {categoryRef} from "../database";
  import {inboxRef} from "../database";
  import {userRef} from "../database";

  export default {
    name: "inbox",

    firebase:{
      adminRequestReference: adminRequestRef,
      catRequestReference: catRequestRef,
      categoryReference: categoryRef,
      inboxReference: inboxRef,
      userReference: userRef
    },

    data(){
      return{
        catDialog: false,
        adminDialog: false,
        currCatRequest: null,
        currAdminRequest: null
      }
    },

    props:[
      'person'
    ],

    methods:{
      getColor(msg){
        if(msg.type.toLowerCase() == 'decision'){
          return "red lighten-3";
        } else if (msg.type.toLowerCase() == 'following'){
          return "teal lighten-3";
        } else if (msg.type.toLowerCase() == 'category'){
          return "green lighten-3";
        } else if (msg.type.toLowerCase() == 'admin'){
          return "orange lighten-3";
        }
      },

      removeMsg(msg){
        inboxRef.child(msg['.key']).remove();
      },

      getRequestUpdates(){
        var ret = this.inboxReference.filter(i => i.type.toLowerCase() != 'following' && i.type.toLowerCase() != 'decision');
        var admin = this.userReference.filter(u => u.name == this.person.name);
        if(admin[0].isAdmin == true){
          return ret;
        }
        // only admin should see requests and be able to approve/deny
        return [];
      },

      getDecisions(){
        var ret = this.inboxReference.filter(i => i.type.toLowerCase() == 'decision' && i.op == this.person.name);
        return ret; //return decisions handed down to current user
      },

      getFollowUpdates(){
        var ret = this.inboxReference.filter(i => i.type.toLowerCase() == 'following');
        var filterForRecipient = ret.filter(r => r.recipient == this.person.name);
        return filterForRecipient; //only give the follow updates to people following these messages
      },

      resolve(msg){
        if(msg.type == 'category'){
          this.setCurrCatRequest(msg);
        } else if (msg.type == 'admin'){
          this.currAdminRequest = msg;
          this.adminDialog = true;
        }
      },

      setCurrCatRequest(msg){
        this.currCatRequest = msg;
        this.catDialog = true;
      },

      getCatRequestDesc(){
        var filterForDescription = this.catRequestReference.filter(c => c.title == this.currCatRequest.cat);
        var description = filterForDescription[0].description;
        return description;
      },

      getAdminRequestReason(requester){
        var filterForReason = this.adminRequestReference.filter(a => a.user == requester);
        return filterForReason[0].reasoning;
      },

      resolveAdminAdd(msg, decision){
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth() + 1;
        var y = today.getFullYear();

        if(d < 10) d = '0' + d;
        if(m < 10) m = '0' + m;
        today = m + '/' + d + '/' + y;

        if(decision == "approve"){
          var user = this.userReference.filter(u => u.name == this.person.name);
          userRef.child(user[0]['.key']).update({isAdmin: true});
          inboxRef.push({
            title: 'Approved request: admin permissions for ' + msg.op,
            type: 'decision',
            admin: this.person.name,
            op: msg.op,
            date: today
          });
        } else if(decision == "reject"){
          inboxRef.push({
            title: 'Rejected request: admin permissions for ' + msg.op,
            type: 'decision',
            admin: this.person.name,
            op: msg.op,
            date: today
          });
        }

        var filter = this.adminRequestReference.filter(a => a.user == msg.op && a.reasoning == this.getAdminRequestReason(msg.op));
        adminRequestRef.child(filter[0]['.key']).remove();
        inboxRef.child(msg['.key']).remove();
        this.catDialog = false;
        this.currAdminRequest = null;
      },

      resolveCatAdd(msg, decision){
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth() + 1;
        var y = today.getFullYear();

        if(d < 10) d = '0' + d;
        if(m < 10) m = '0' + m;
        today = m + '/' + d + '/' + y;

        if(decision == "approve"){
          var filterForDescription = this.catRequestReference.filter(c => c.title == msg.cat);
          var description = filterForDescription[0].description;
          categoryRef.push({
            title: msg.cat,
            desc: description
          });
          inboxRef.push({
            title: 'Approved request: add tag category ' + msg.cat,
            type: 'decision',
            admin: this.person.name,
            op: msg.op,
            date: today
          });
        } else if(decision == "reject"){
          inboxRef.push({
            title: 'Rejected request: add tag category ' + msg.cat,
            type: 'decision',
            admin: this.person.name,
            op: msg.op,
            date: today
          });
        }

        var filter = this.catRequestReference.filter(c => c.title == msg.cat);
        catRequestRef.child(filter[0]['.key']).remove();
        inboxRef.child(msg['.key']).remove();
        this.adminDialog = false;
        this.currCatRequest = null;
      }
    }
  }
</script>

<style scoped>

</style>
