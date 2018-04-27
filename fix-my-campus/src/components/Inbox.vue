<template>
  <v-card>
    <v-container fluid
                 style="min-height: 0;"
                 grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm12 md4 v-for="msg in inboxReference">
          <v-card>
            <v-toolbar color="grey lighten-2" dense>
              <v-toolbar-title>
                {{msg.user}} ({{msg.date}})
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn>Resolve</v-btn>
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
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import {adminRequestRef} from "../database";
  import {catRequestRef} from "../database";
  import {inboxRef} from "../database";

  export default {
    name: "inbox",

    firebase:{
      adminRequestReference: adminRequestRef,
      catRequestReference: catRequestRef,
      inboxReference: inboxRef //title, type, user, date
    }
  }
</script>

<style scoped>

</style>
