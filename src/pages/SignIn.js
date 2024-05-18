import React from 'react'
import './SignIn.css';
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const SignIn = ({setIsAuth}) => {

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='sign-in'>
            Sign In
            <button className='button' onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}
