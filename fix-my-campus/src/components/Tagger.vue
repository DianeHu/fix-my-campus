<template>
  <div>
    <div v-if="newIssue">
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
              <v-list-tile v-for="singleCat in categoryReference">
                <v-list-tile-action v-if="getTempSelected(singleCat)">
                  <v-btn @click="toggleTempTag(singleCat)" icon>
                    <i aria-hidden="true" class="icon grey--text text--darken-1 material-icons">check_box</i>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-if="!getTempSelected(singleCat)">
                  <v-btn @click="toggleTempTag(singleCat)" icon>
                    <i aria-hidden="true" class="icon grey--text text--darken-1 material-icons">check_box_outline_blank</i>
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
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div v-if="!newIssue">
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
              <v-list-tile v-for="singleCat in categoryReference">
                <v-list-tile-action v-if="getSelected(singleCat)">
                  <v-btn @click="toggleTag(singleCat)" icon>
                    <i aria-hidden="true" class="icon grey--text text--darken-1 material-icons">check_box</i>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action v-if="!getSelected(singleCat)">
                  <v-btn @click="toggleTag(singleCat)" icon>
                    <i aria-hidden="true" class="icon grey--text text--darken-1 material-icons">check_box_outline_blank</i>
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
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
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
      'issueProp',
      'newIssue'
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
      pushTempTag(cat){
        tagRef.push({
          id: cat['.key'],
          owner: 'temp'
        })
      },

      removeTempTag(cat){
        var tagged = this.tagReference.filter(tag => tag.id == cat['.key'] && tag.owner == 'temp');
        tagRef.child(tagged[0]['.key']).remove();
      },

      toggleTempTag(cat){
        var taggedOrNot = this.tagReference.filter(tag => tag.id == cat['.key'] && tag.owner == 'temp');
        if(taggedOrNot.length != 0){
          // this issue is tagged with this category
          this.removeTempTag(cat);
        } else{
          // this issue isn't tagged with this category
          this.pushTempTag(cat);
        }
      },

      getTempSelected(cat){
        var tagged = this.tagReference.filter(tag => tag.id == cat['.key'] && tag.owner == 'temp');
        if(tagged.length == 0) return false; //not tagged by this issue
        return true;
      },

      getSelected(cat){
        var tagged = this.tagReference.filter(tag => tag.id == cat['.key'] && tag.owner == this.issueProp['.key']);
        if(tagged.length == 0) return false; //not tagged by this issue
        return true;
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
        } else{
          // this issue isn't tagged with this category
          this.tagIssue(cat);
        }
      }
    },

    computed:{
    }
  }
</script>

<style scoped>

</style>
