// import {initializeApp} from 'firebase/app'
// import {getAuth} from 'firebase/auth'

// const firebaseConfig = {
//     apiKey: "AIzaSyCX_CsUWC8NhNLqB6rXNTTNgmeMh4XmNIc",
//     authDomain: "echo-cards.firebaseapp.com",
//     projectId: "echo-cards",
//     storageBucket: "echo-cards.appspot.com",
//     messagingSenderId: "598774235695",
//     appId: "1:598774235695:web:447566b2aff813fb4b7cda",
//     measurementId: "G-CPHB700HN1"
//   };

//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app)
//   export default app

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCX_CsUWC8NhNLqB6rXNTTNgmeMh4XmNIc",
    authDomain: "echo-cards.firebaseapp.com",
    projectId: "echo-cards",
    storageBucket: "echo-cards.appspot.com",
    messagingSenderId: "598774235695",
    appId: "1:598774235695:web:447566b2aff813fb4b7cda",
    measurementId: "G-CPHB700HN1"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }