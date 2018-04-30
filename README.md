# final-project (fix-my-campus)
Separate repository for Final Project to make it easier to share or experiment with

### What makes our application useful:

Our application is useful because it allows
students to have an aggregate outlet for active participation in the feedback
process for ongoing campus issues that need addressing.

We noticed that the current Fix My Campus Facebook page can be
quite disorganized, and there is no good way to filter for issues of a certain category,
a feature that admin may find useful. We decided to basically create a platform that
mimics the current FMC Facebook page, with a higher degree of organization and control.
We think that the extra features our site has for people makes it a useful application--such as,
explicit following of posts to receive updates, requesting new tag categories,
conglomeration of contact information for various Duke administrative sources, etc.

We find these features make the site a bit more tooled to the needs of FMC. In particular,
we think the ability/requirement to tag posts with issue type, and being able to filter posts by issue type,
make our site useful.

### Special instructions:

(included in subfolder README as well)

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
Note that on the homepage, when a user hasn't signed in,
the sign in popup on the right is partially hidden by the Vuetify jumbotron.
We couldn't find a way to fix this, so when you access the site,
to sign in add a '/issues' to the end of the URL and you can sign in from there
without the firebase popup being obstructed.

## Data references

https://oit.duke.edu/what-we-do/applications/streamer

This is the API we used to access validating students as Duke users.
You'll have to login and create an access key, but all the information we used
is under this set of APIs.

## Pros and cons of frameworks

The pros of the Vue/Vuetify/Firebase frameworks we used are largely that
they are lighter and easier to use compared to more common frameworks like
Angular and React. While we thought about learning these for the final project,
in the end we wanted to have a functional product and thought that the best way to ensure that
might be to work with what we were familiar with. That isn't to say we didn't explore a lot of the ways
in which Vue components made life easier, but we thought the pros of trying to mess with
Angular or React stood to outweigh the pros of learning the most popular frontend frameworks industrially.

Vue's router system was also substantially easier to understand compared to Angular's, which is another
reason we picked Vue over Angular.

## Names/NetIDs

Diane Hu (dh224), Jarod Cahoon (jbc53)

## Date started

Around April 18th

## Date ended

Around April 29th

## Time taken

20-30 hours in total

## Students discussed with

Each other

## Resources

Vuetify codepens

## Assets

Vuetify Jumbotron picture for homepage (href, not downloaded file)

## Bugs

Firebase auth container sometimes partially hidden so users can't actually log in from home page
Also, auth container doesn't allow pressing buttons it seems--like clicking on the Next buttons messes login up.
You just have to keep pressing enter and not touch any buttons.

## Extra credit

None
