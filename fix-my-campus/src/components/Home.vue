<template>
  <div>
    <v-jumbotron dark>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex class="heading" text-xs-center>
            <h3 class="display-3">Welcome to Fix My Campus</h3>
            <span class="subheading">A website dedicated to improving the quality of Duke University's campus through student filed issues and feedback.</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <br>
    <v-flex class="infoDisplay">
      <h2 class="display-2">About</h2>
      <span class="subheading">
        This website was inspired by Duke's <a href="https://www.facebook.com/groups/fixmycampus/">Fix My Campus</a> Facebook group.
        In light of the fact that many people do not have Facebook accounts, and that many more may be leaving the site,
        decided that it may be wise to have a website entirely dedicated to posting issues about Duke's campus, and having
        people contact the necessary Duke authorities to report these issues.
      </span>
    </v-flex>
    <v-flex class="infoDisplay">
      <h2 class="display-2">Navigation</h2>
      <span class="subheading">
        To navigate through this page, simply traverse through the buttons in the navigation bar at the top of the page,
        or go in the address bar to the links corresponding to the name of each button. We will discuss what each page of
        the website does in further detail in the following sections.
      </span>
    </v-flex>
    <v-flex class="infoDisplay">
      <h2 class="display-2">Issues</h2>
      <span class="subheading">
        The issues page is the meat and potatoes of the website. It is where you will go to submit issues to the general
        public, interact with issues posted by other users (including liking, following, and commenting on issues). When
        you submit an issue, you tag the issue with an Duke-specific category (i.e. HRL, Facilities, Dining, Student Health),
        and may include a picture to clarify what the issue is. Issues at the top of this page are the ones that have been
        submitted or commented on most recently.
      </span>
    </v-flex>
    <v-flex class="infoDisplay">
      <h2 class="display-2">Updates</h2>
      <span class="subheading">
        On the updates page, you see updates that administrators post in response to user submitted issues. Keep in mind
        that if your issue has not been resolved in one update, it may still come in future updates posted to this page.
      </span>
    </v-flex>
    <v-flex class="infoDisplay">
      <h2 class="display-2">Services</h2>
      <span class="subheading">
        On the services page, you can request several special services from the administrators, including requesting a new
        tag to add to posts, and requesting to be an administrator yourself.
      </span>
    </v-flex>
    <v-flex class="infoDisplay">
      <h2 class="display-2">Inbox</h2>
      <span class="subheading">
        On the inbox page, you see any updates to requests that you made on the services page. If you are an administrator,
        you see what requests have been made by who, and either approve or deny them.
      </span>
    </v-flex>
    <v-flex class="infoDisplay">
      <h2 class="display-2">Contacts</h2>
      <span class="subheading">
        On the contacts page, you will see the contact information of the various offices and departments that the administrators
        contact to resolve issues. Keep in mind that the administrators are simply students who are liasons for other students,
        and in some cases it might be preferable to go straight to the source if the issue is urgent.
      </span>
    </v-flex>
    <v-btn to="/issues">Issues</v-btn>
    <v-btn to="/contact">Contacts</v-btn>
    <v-btn to="/services">Services</v-btn>
    <v-btn to="/inbox">Inbox</v-btn>
  </div>
</template>

<script>
  export default {
    data () {

    }
  }
</script>

<style>
  h3{
    color : black;
  }

  h2{
    padding-bottom : 5px;
  }

  .infoDisplay{
    line-height: 1.75;
    padding-left: 7%;
    padding-bottom : 5%;
    padding-right: 7%;
    padding-top: 5%
  }

  .heading{
    color: black;
  }
</style>
