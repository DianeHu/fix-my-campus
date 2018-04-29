<template>
  <v-toolbar dark>
    <v-toolbar-title v-if="user">{{user.name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-container v-if="user">
        <v-dialog v-if=!this.isRealAccount() v-model="dialog" max-width="30%">
          <v-btn slot="activator">Authenticate Account</v-btn>
          <user-auth :dialog=dialog :user=user></user-auth>
        </v-dialog>
        <v-btn flat @click="signOut" >
          <a>
            <span class="glyphicon glyphicon-log-out">Logout</span>
          </a>
        </v-btn>
      </v-container>
      <v-btn v-else flat @click="signInPopup">
        <a>
          <span class="glyphicon glyphicon-user">Sign In</span>
        </a>
      </v-btn>
      <div id="firebaseui-auth-container" :class="{ popup: isShown }"></div>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import {userRef} from '../database'
  import UserAuthenticator from './UserAuthenticator.vue'
  import {storageRef} from '../database'
  import Firebase from 'firebase'
  import FirebaseUI from 'firebaseui'
  // single instance of popup credentials UI
  var authUI = new FirebaseUI.auth.AuthUI(Firebase.auth())

  export default {
    name: 'login',

    data () {
      return {
        isShown: false,
        dialog: false
      }
    },

    firebase: {
      UserReference: userRef
    },

    props: [
      'getUser',
      'setUser'
    ],
    components: {
      UserAuth: UserAuthenticator
    },

    computed: {
      user () {
        return this.getUser()
      }
    },

    methods: {
      isRealAccount () {
        return (this.UserReference.filter(u => u.name === this.user.name).length > 0)
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
          // respond to authentication attempts
          callbacks: {
            signInSuccessWithAuthResult: authResult => {
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
