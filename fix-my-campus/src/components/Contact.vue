<template>
  <div class = "compPadding">
    <h1>Duke Facility Contact Information</h1>
    <hr>
    <v-container grid-list-xl>
      <v-layout column>
        <v-flex v-for="card in contactList">
          <v-card dark>
            <v-toolbar>
              <v-toolbar-title>
                {{card.Department}}
              </v-toolbar-title>
            </v-toolbar>
            <!--<v-card-title>
              {{card.Department}}
            </v-card-title>-->
            <v-card-text>
              Email : {{card.Email}}
            </v-card-text>
            <v-card-text>
              Phone Number : {{card.Phone}}
            </v-card-text>
            <v-card-text>
              <a :href=card.Website>Website</a>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import contacts from '../data/contactinfo'

  export default{
    data () {
      return {
        contactList: contacts
      }
    }
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
