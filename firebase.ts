import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC9_dUxiaxm-8v4cVTuZ6EO8BLHyoIJmFQ",
    authDomain: "dummy-app-43eac.firebaseapp.com",
    projectId: "dummy-app-43eac",
    storageBucket: "dummy-app-43eac.appspot.com",
    messagingSenderId: "1054607549571",
    appId: "1:1054607549571:web:8dba6457760ba546c2a7b6"
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const storage = getStorage(app);

  export { db, storage };