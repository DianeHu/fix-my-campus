<template>
  <v-flex xs12 sm12 md4>
    <v-card color="cyan darken-2" class="white--text">
      <v-toolbar dark dense>
        <v-toolbar-title>
          <div class="headline">
            <v-btn v-if="issue.owner == currentUser && !issue.editingTitle" icon @click="setEditTrue('Title')">
              <v-icon small>mode_edit</v-icon>
            </v-btn>
            <v-text-field v-if="issue.editingTitle"
                          @keyup.enter="editTitle()"
                          name="editIssueTitle"
                          label="Rename issue"
                          v-model="renameTitle"
                          style="display: inline-block;"
            ></v-text-field>
            <span v-else>{{issue.title}}</span>
          </div>
        </v-toolbar-title>
        <v-spacer>
        </v-spacer>
        <span>{{issue.owner}}
          <v-chip label outline>{{issue.date}}</v-chip>
        </span>
      </v-toolbar>
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs7>
            <div>
              <div>
                <v-btn icon v-if="issue.owner == currentUser && !issue.editingDescription" @click="setEditTrue('Description')">
                  <v-icon small>mode_edit</v-icon>
                </v-btn>
                <v-text-field v-if="issue.editingDescription"
                              @keyup.enter="editDescription()"
                              name="editIssueDescription"
                              label="Rename issue description"
                              v-model="renameDescription"
                              style="display: inline-block;"
                ></v-text-field>
                <span v-else>{{issue.description}}</span>
              </div>
            </div>
          </v-flex>
          <v-flex xs5 v-if="issue.image">
            <v-card-media
              :src="issue.image"
              height="125px"
              contain
            ></v-card-media>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-btn @click="showCurrComments()" icon color="white" v-if="!issue.showComments">
            <v-icon>expand_more</v-icon>
          </v-btn>
          <v-btn @click="hideCurrComments()" icon color="white" v-if="issue.showComments">
            <v-icon>expand_less</v-icon>
          </v-btn>
          <v-btn @click="closeIssue()" icon v-if="issue.owner == currentUser">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn v-if="issue.owner == currentUser" icon v-on:click.native="changeImage">
            <v-icon>add_a_photo</v-icon>
          </v-btn>
          <input ref="fileNew" style="display: none" type="file" id="images" name="files[]" @change="addImage"/>
          <tagger :issueProp=issue></tagger>
        </v-card-actions>
      </v-container>

      <div v-if="issue.showComments">
        <!--<v-card>
          <v-text-field textarea
                        name="addingComment"
                        label="Add a comment"
                        v-model="newComment"
                        style="display: inline-block"></v-text-field>
          <v-card-text>
            <v-card-actions>
              <v-btn dark class="alignRight" @click="addComment()">Post</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>-->
        <v-card v-for="comment in getComments()">
          <v-toolbar color="grey lighten-2" dense>
            <v-toolbar-title>
              {{comment.owner}} ({{comment.date}})
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span>{{getNumLikes(comment)}}</span>
            <v-btn @click="unlike(comment)" flat icon color="red darken-2" v-if="likedByCurrUser(comment)">
              <v-icon small>thumb_up</v-icon>
            </v-btn>
            <v-btn flat @click="like(comment)" icon v-if="!likedByCurrUser(comment)">
              <v-icon small>thumb_up</v-icon>
            </v-btn>
            <v-btn v-if="currentUser == comment.owner" @click="removeComment(comment)" icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            {{comment.title}}
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-card>
          <v-text-field textarea
                        name="addingComment"
                        label="Add a comment"
                        v-model="newComment"
                        style="display: inline-block"></v-text-field>
          <v-card-text>
            <v-card-actions>
              <v-btn dark class="alignSemiRight" @click="cancelComment()">Cancel</v-btn>
              <v-btn dark class="alignRight" @click="addComment()">Post</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
  import {storageRef} from '../database';
  import {issueRef} from '../database';
  import {commentRef} from '../database';
  import {tagRef} from '../database';
  import {likeRef} from '../database';
  import tagger from './tagger';

  export default {
    name: "issue",

    data(){
      return{
        renameTitle: '',
        renameDescription: '',
        image: null,
        imagePath: '',
        newComment: ''
      }
    },

    props:[
      'issue',
      'currentUser'
    ],

    firebase:{
      issueReference: issueRef,
      commentReference: commentRef,
      tagReference: tagRef,
      likeReference: likeRef
    },

    computed:{

    },

    components:{
      tagger
    },

    methods:{
      likedByCurrUser(comm){
        var likes = this.likeReference.filter(l => l.id == comm['.key'] && l.liker == this.currentUser);
        if(likes.length == 0) return false;
        return true;
      },

      showCurrComments(){
        this.issue.showComments = true;
      },

      hideCurrComments(){
        this.issue.showComments = false;
      },

      getNumLikes(comm){
        var likes = this.likeReference.filter(l => l.id == comm['.key']);
        return likes.length;
      },

      like(comm){
        likeRef.push({
          id: comm['.key'],
          liker: this.currentUser
        })
      },

      unlike(comm){
        var likes = this.likeReference.filter(l => l.id == comm['.key'] && l.liker == this.currentUser);
        likeRef.child(likes[0]['.key']).remove();
      },

      addComment(){
        var today = new Date();
        var d = today.getDate();
        var m = today.getMonth() + 1;
        var y = today.getFullYear();

        if(d < 10) d = '0' + d;
        if(m < 10) m = '0' + m;
        today = m + '/' + d + '/' + y;

        this.newComment = this.newComment.trim();
        if(this.newComment){
          commentRef.push({
            title: this.newComment,
            owner: this.currentUser,
            id: this.issue['.key'],
            date: today
          })
          this.newComment = '';
        }
      },

      cancelComment(){
        this.newComment = '';
      },

      getComments(){
        return this.commentReference.filter(comm => comm.id == this.issue['.key']);
      },

      removeComment(comm){
        var toRemove = this.likeReference.filter(l => l.id == comm['.key']);
        toRemove.forEach(r => likeRef.child(r['.key']).remove());
        commentRef.child(comm['.key']).remove();
      },

      setEditTrue(val){
        if(val == "Title"){
          issueRef.child(this.issue['.key']).update({editingTitle: true});
        } else if (val == "Description"){
          issueRef.child(this.issue['.key']).update({editingDescription: true});
        }
      },

      closeIssue(){
        var toRemove = this.commentReference.filter(c => c.id == this.issue['.key']);
        toRemove.forEach(comm => this.removeComment(comm));
        issueRef.child(this.issue['.key']).remove();
      },

      editTitle(){
        this.renameTitle = this.renameTitle.trim();
        if(this.renameTitle){
          issueRef.child(this.issue['.key']).update({title: this.renameTitle, editingTitle: false});
        }
      },

      editDescription(){
        this.renameDescription = this.renameDescription.trim();
        if(this.renameDescription){
          issueRef.child(this.issue['.key']).update({description: this.renameDescription, editingDescription: false});
        }
      },

      changeImage(){
        this.$refs.fileNew.click();
      },

      addImage(event){
        var file = event.target.files;
        if(file){
          this.image = file[0];
          this.imagePath = this.image.name;
        }
        storageRef.child('images/' + this.imagePath).put(this.image).then(snapshot => this.updateImage(snapshot.downloadURL));
        event.target.value = '';
      },

      updateImage(arg){
        issueRef.child(this.issue['.key']).update({image: arg});
      },
    }
  }
</script>

<style scoped>
  .alignRight{
    position: absolute;
    right: 0px;
    padding: 1px;
  }

  .alignSemiRight{
    position: absolute;
    right: 95px;
    padding: 1px;
  }
</style>
