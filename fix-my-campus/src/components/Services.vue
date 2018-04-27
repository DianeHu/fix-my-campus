<template>
  <div>
    <h1>hiiii</h1>
    <requestadmin :user="person.name"></requestadmin>
    <categoryrequest :user="person.name"></categoryrequest>
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
