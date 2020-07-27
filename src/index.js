import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyAgh7_qX8iqXqF5O6ma96klsGucwpsv7pE",
    authDomain: "jedi-e1061.firebaseapp.com",
    databaseURL: "https://jedi-e1061.firebaseio.com",
    projectId: "jedi-e1061",
    storageBucket: "jedi-e1061.appspot.com",
    messagingSenderId: "216801536791",
    appId: "1:216801536791:web:52a0fd17ff2fd5c77c2552",
    measurementId: "G-K121L84V73"
});

ReactDOM.render(<div>Hello world </div>,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
