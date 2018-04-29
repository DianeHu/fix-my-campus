<template>
  <div>
    <p>Announcements</p>
  </div>
</template>

<script>
  import {adminPosts} from '../database'
  export default{
    data () {

    },

   methods: {
      isUserAdmin() {
        return false
      }
   },

    props: [
      'person'
    ],

    firebase: {
      posts : adminPosts
    }
  }
</script>

<style>

</style>
