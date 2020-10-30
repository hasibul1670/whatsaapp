import React from 'react';
import firebase from "firebase";
import "./Login.css";
import {Button} from '@material-ui/core';
import {auth,provider} from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
function Login() {

const [{},dispatch]= useStateValue();

    const signIn=()=>{
     auth.signInWithPopup(provider)
     .then((result)=>{
         dispatch({
           type:actionTypes.SET_USER,
           user:result.user,  
         });
     })
     .catch((error)=>alert(error.message));

    }
    return (
        <div className="login">

<div className="login-cont">
    <img src="https://i.ibb.co/n6CYpK8/whatsappt.jpg" alt="" srcset=""/>
    <div className="login-text">
    <h1>Sign in to WhatsApp</h1>
    </div>
    <Button  onClick={signIn}>
        Sign In With Google

    </Button>

</div>


        </div>
    )
}

export default Login
