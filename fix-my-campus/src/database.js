import Firebase from 'firebase'

var config = {
  apiKey: "AIzaSyATUsYlp5G8zAMv1mZ-H7q3ATo2yH9Hp7I",
  authDomain: "fixmycampus-78290.firebaseapp.com",
  databaseURL: "https://fixmycampus-78290.firebaseio.com",
  projectId: "fixmycampus-78290",
  storageBucket: "fixmycampus-78290.appspot.com",
  messagingSenderId: "464047240260"
};

var fb = Firebase.initializeApp(config);

export const db = fb.database();
export const storageRef = fb.storage().ref();
export const userRef = db.ref('users');
export const issueRef = db.ref('issues');
export const commentRef = db.ref('comments');
export const likeRef = db.ref('likes');
export const tagRef = db.ref('tags');
export const categoryRef = db.ref('categories');
export const catRequestRef = db.ref('categoryRequests');
export const adminRequestRef = db.ref('adminRequests');
export const inboxRef = db.ref('inbox');
export const followRef = db.ref('following');
export const announcementRef = db.ref('announcements');

