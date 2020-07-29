import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent  from './signup/signup';
import DashboardComponent from './dashboard/dashboard';
import HomeComponent from './home/home';

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

const routing = (
    <Router>
        <div id= 'routing-container'>
            <Route exact path='/' component={HomeComponent}></Route>
            <Route path= '/login' component={LoginComponent}></Route>
            <Route path= '/signup' component={SignupComponent}></Route>
            <Route path= '/dashboard' component={DashboardComponent}></Route>
        </div>
    </Router>
);

ReactDOM.render(routing,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
