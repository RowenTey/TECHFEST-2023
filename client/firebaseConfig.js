import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAS8ozeCp56wkZgoS6xS8h0aA9Ewto_Oow",
	authDomain: "techfest-2023.firebaseapp.com",
	projectId: "techfest-2023",
	storageBucket: "techfest-2023.appspot.com",
	messagingSenderId: "597340273115",
	appId: "1:597340273115:web:661daf31ac0dc50af64ffe",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(firebaseApp);
