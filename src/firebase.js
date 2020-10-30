import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCXbrpjo8B9xMwcPoCBsCrXu3dQ7wn_AY8",
    authDomain: "whatsapp-copy-f1238.firebaseapp.com",
    databaseURL: "https://whatsapp-copy-f1238.firebaseio.com",
    projectId: "whatsapp-copy-f1238",
    storageBucket: "whatsapp-copy-f1238.appspot.com",
    messagingSenderId: "690120755376",
    appId: "1:690120755376:web:adf2ecdb7492f2916c1375",
    measurementId: "G-50BW2ENLZW"
  };
  const firebaseApp =   firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider =new firebase.auth.GoogleAuthProvider();
  
  export {auth,provider};
  export default db;
