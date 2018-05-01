import * as firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyA5fRuxMaa9z19C1BUezOlmjSLGAM7p3iU',
  authDomain: 'easy-learn-for-college.firebaseapp.com',
  databaseURL: 'https://easy-learn-for-college.firebaseio.com',
  projectId: 'easy-learn-for-college',
  storageBucket: 'easy-learn-for-college.appspot.com',
  messagingSenderId: '976957163140',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const database = firebase.database()

export { database }
