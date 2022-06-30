// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA0mq-AO3hif4dEcUhPPfoD6zNztf_tSJA',
	authDomain: 'journal-app-4220e.firebaseapp.com',
	projectId: 'journal-app-4220e',
	storageBucket: 'journal-app-4220e.appspot.com',
	messagingSenderId: '46475604166',
	appId: '1:46475604166:web:ec2fca99a83396eebb67c7',
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)