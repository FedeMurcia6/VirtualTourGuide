import * as firebase from firebase;

const config={
    apiKey: "AIzaSyBbn2TzPpfpvWfBdjCjl1cFxe96wFb17e0",
    authDomain: "virtualtourguide.firebaseapp.com",
    databaseURL: "https://virtualtourguide.firebaseio.com/",
    storageBucket: "virtualtourguide.appspot.com",
    projectId: "virtualtourguide"
};

const Firebase = firebase.initializeApp(config);
export default Firebase;