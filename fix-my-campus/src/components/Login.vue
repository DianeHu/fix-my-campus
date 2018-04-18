<template>
  <v-container>
    <v-layout flex align-center justify-center>
      <v-form>
          <v-text-field label="Email" v-model="newEmail" required></v-text-field>
          <v-text-field label="Password" v-model="newPassword" required></v-text-field>
          <v-card-actions>
            <v-btn>Login</v-btn>
            <v-btn>Sign Up</v-btn>
          </v-card-actions>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: "login",

    data(){
      return{
        newEmail: '',
        newPassword: ''
      }
    }
  }

</script>

<style scoped>

</style>
