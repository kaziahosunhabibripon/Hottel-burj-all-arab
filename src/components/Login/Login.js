import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';
const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const { displayName, email,photoURL } = result.user;
                const signedInUser = { name: displayName,  email , photo : photoURL};
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }
    return (
        <div>
            <h1>User : {loggedInUser.name}</h1>        
            <img src={loggedInUser.photo} alt="" style={{padding: '10px'}}/>
            <br/>
            <button onClick={handleGoogleSignIn}> Google Sign in</button>
           
        </div>
    );
};

export default Login;