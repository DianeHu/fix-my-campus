<template>
  <div class = "compPadding">
    <h1>Duke Facility Contact Information</h1>
    <hr>
    <v-container>
      <v-card v-for="card in contactList">
        <v-card-text>
          {{card.Department}}
        </v-card-text>
        <v-card-text>
          {{card.Email}}
        </v-card-text>
        <v-card-text>
          {{card.Phone}}
        </v-card-text>
        <v-card-text>
          {{card.Website}}
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import contacts from '../data/contactinfo'

  export default{
    data(){
      return{
        contactList : contacts
      }
    },

  }
</script>

<style scoped>

  .compPadding{
    padding: 5px;
  }

  h1 {
    text-align: center;
  }
</style>
