import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: 'AIzaSyB_F2cvX0MRn_8a8toPVs6Y-iapXsq3wPw',
  authDomain: 'smarthome-dff87.firebaseapp.com',
  databaseURL:
    'https://smarthome-dff87-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'smarthome-dff87',
  storageBucket: 'smarthome-dff87.appspot.com',
  messagingSenderId: '162325951610',
  appId: '1:162325951610:web:bc46e1aa35cbc421be37c3',
  measurementId: 'G-T81EL8CTF4',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();
