import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyARVvh_gvh-f8bZgc3ab9CHWmUd1heloOU",
    authDomain: "timekeeping-app-d39e6.firebaseapp.com",
    databaseURL: "https://timekeeping-app-d39e6-default-rtdb.firebaseio.com",
    projectId: "timekeeping-app-d39e6",
    storageBucket: "timekeeping-app-d39e6.appspot.com",
    messagingSenderId: "107284473847",
    appId: "1:107284473847:web:57290c4946e602439ab0f2"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};
