<template>
  <div v-if="person">
    <requestadmin :user="person.name"></requestadmin>
    <categoryrequest :user="person.name"></categoryrequest>
    <v-layout row justify-center>
      <v-btn dark href="https://fixmycampus-78290.firebaseio.com/.json" target="_blank">Data</v-btn>
    </v-layout>
  </div>
</template>

<script>
  import requestadmin from './requestadmin';
  import categoryrequest from './categoryrequest';

  export default {
    name: "services",

    props:[
      'person'
    ],

    components:{
      requestadmin,
      categoryrequest
    }
  }
</script>

<style scoped>

</style>
