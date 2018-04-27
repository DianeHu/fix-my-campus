<template>
  <v-toolbar dark>
    <v-toolbar-title v-if="user">{{user.name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="signOut" v-if="user">
        <a>
          <span class="glyphicon glyphicon-log-out">Logout</span>
        </a>
      </v-btn>
      <v-btn flat @click="signInPopup" v-else>
        <a>
          <span class="glyphicon glyphicon-user">Sign In</span>
        </a>
      </v-btn>
      <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import {storageRef} from '../database'
  import Firebase from 'firebase'
  import FirebaseUI from 'firebaseui'
  // single instance of popup credentials UI
  var authUI = new FirebaseUI.auth.AuthUI(Firebase.auth())

  export default {
    name: 'login',

    data () {
      return {
        newEmail: '',
        isShown: false
      }
    },

    props: [
      'getUser',
      'setUser'
    ],

    computed: {
      user () {
        return this.getUser()
      }
    },

    methods: {
      checkDukeStudent () {
        this.newEmail = this.newEmail.trim()
        if (this.newEmail) {
          var netID = ''
          for (var i = 0; i < this.newEmail.length; i++) {
            if (this.newEmail[i] === '@') {
              break
            }
            netID += this.newEmail[i]
          }
          console.log(netID)

          var url = 'https://streamer.oit.duke.edu/ldap/people/netid/" + netID + "?access_token=512c70bd8a6cf54fae040bb6f6bb8ccc'

          const proxyURL = "https://cors-anywhere.herokuapp.com/";
          fetch(proxyURL + url)
            .then(response => response.json())
            .then(contents => { console.log(contents) })
            .catch(() => console.log("Access to " + url + " is still blocked."))
        }
      },

      signInPopup () {
        authUI.start('#firebaseui-auth-container', {
          // open the authentication flow as a popup
          signInFlow: 'popup',
          // require password each time
          credentialHelper: FirebaseUI.auth.CredentialHelper.NONE,
          // new users automatically created for new emails
          signInOptions: [{
            provider: Firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
          }],
          // respond to authenticaion attempts
          callbacks: {
            signInSuccessWithAuthResult: authResult => {
              // save interesting parts of user data
              this.signIn(authResult.user)
              // hide styling again
              this.isShown = false
              // do not redirect
              return false
            },
            uiShown: () => {
              // style UI container as a popup
              this.isShown = true
            }
          }
        })
      },
      signIn (user) {
        this.setUser({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          isAnonymous: user.isAnonymous
        })
      },
      signOut () {
        Firebase.auth().signOut()
        this.setUser(null)
      }
    },
    mounted () {
      // allow user to automatically log in if returning to site after refresh
      Firebase.auth().onAuthStateChanged(authState => {
        if (authState) {
          this.signIn(authState)
        }
      })
    }
  }

</script>

<style scoped>

</style>
