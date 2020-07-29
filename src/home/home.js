import React from 'react';
import './styles.css';
import icon from '../icon.png';
import {Link} from 'react-router-dom';

class HomeComponent extends React.Component{
    render(){
        return(
            <main className="Home">
                <img src={icon} className="logo"/>
                <h1> Welcome to Jedi </h1>
                <Link className="login" to='./login'> Login</Link>
                <Link className="signup" to='./signup'> Sign Up</Link>
            </main>
        );
    }
}


export default HomeComponent;
