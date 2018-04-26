<template>
  <!--<v-menu offset-y>
    <v-btn dark slot="activator">Tag issue</v-btn>
    <v-list>
      <v-list-tile dark>
        <v-text-field @keyup.enter="addNewTag()"
                      name="createTag"
                      label="Create new tag"
                      v-model="newTag"
                      style="display: inline-block;"
        ></v-text-field>
      </v-list-tile>
      <v-list-tile v-for="tag in tagRef" :key="tag.title" @click="">
        <v-list-tile-title>{{ tag.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>-->
  <div>
    <v-btn dark @click="dialog=true">Tag issue</v-btn>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Tag issue</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-text-field @keyup.enter="addNewCategory()"
                        name="createCat"
                        label="Create new category"
                        v-model="newCategory"
                        style="display: inline-block;"
          ></v-text-field>
          <v-container fluid>
            <!--<v-checkbox v-for="singleCat in categoryReference"
                        v-model="checkbox"
                        @click="toggleTag(singleCat)"
                        v-bind:label=singleCat.title
                        v-bind:value=singleCat.title></v-checkbox>-->
            <v-list-tile v-for="singleCat in categoryReference">
              <v-list-tile-action>
                <v-btn @click="toggleTag(singleCat)" icon v-if="!getSelected(singleCat)">
                  <i aria-hidden="true" class="icon grey--text text--darken-1 material-icons">check_box_outline_blank</i>
                </v-btn>
                <v-btn @click="toggleTag(singleCat)" icon v-if="getSelected(singleCat)">
                  <i aria-hidden="true" class="icon grey--text text--darken-1 material-icons">check_box</i>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{singleCat.title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {categoryRef} from '../database';
  import {tagRef} from '../database';
  import {issueRef} from '../database';

  export default {
    firebase:{
      issueReference: issueRef,
      tagReference: tagRef,
      categoryReference: categoryRef
    },

    name: "tagger",

    props:[
      'issueProp'
    ],

    computed:{
    },

    data(){
      return{
        newCategory: '',
        dialog: false,
        checkbox: true
      }
    },

    methods:{
      getSelected(cat){
        var tagged = this.tagReference.filter(tag => tag.id == cat['.key'] && tag.owner == this.issueProp['.key']);
        if(tagged.length == 0) return "white"; //not tagged by this issue
        return "darkcyan";
      },

      addNewCategory(){
        this.newCategory = this.newCategory.trim();
        if(this.newCategory){
          categoryRef.push({
            title: this.newCategory
          });
        }
        this.newCategory = '';
      },

      tagIssue(cat){
        tagRef.push({
          id: cat['.key'],
          owner: this.issueProp['.key']
        });
      },

      untagIssue(cat){
        var tagged = this.tagReference.filter(tag => tag.id == cat['.key'] && tag.owner == this.issueProp['.key']);
        tagRef.child(tagged[0]['.key']).remove();
      },

      toggleTag(cat){
        var taggedOrNot = this.tagReference.filter(tag => tag.id == cat['.key'] && tag.owner == this.issueProp['.key']);
        if(taggedOrNot.length != 0){
          // this issue is tagged with this category
          this.untagIssue(cat);
          console.log("untagged in issue");
        } else{
          // this issue isn't tagged with this category
          this.tagIssue(cat);
          console.log("tagged in issue");
        }
      },
    },

    computed:{
    }
  }
</script>

<style scoped>

</style>
