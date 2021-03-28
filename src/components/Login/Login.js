import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../configs/firebase.config';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';




firebase.initializeApp(firebaseConfig);


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const { from } = location.state || { from: { pathname: "/" } };
    const handleGoogleLogIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const {displayName, email} = result.user;
                const newUser = {name: displayName, email: email}
                setLoggedInUser(newUser);
                saveAuthToken();
                history.replace(from);
            }).catch((error) => {
                console.log(error.message);
            });
    }
    const saveAuthToken = () =>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken);
          }).catch(function(error) {
            // Handle error
          });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <Button
                onClick={handleGoogleLogIn}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
            >
                Log In With Google
      </Button>
        </div>
    );
};

export default Login;