import React, { useState } from 'react';
import './SignInSignUp.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import password_icon from './Assets/password.png';
import email_icon from './Assets/email.png';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setMessage(''); 

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('You are now signed in');
            navigate('/home'); 
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setMessage('This e-mail is not registered. Please sign up.');
                    break;
                case 'auth/wrong-password':
                    setMessage('Your password is incorrect');
                    break;
                case 'auth/invalid-email':
                    setMessage('This e-mail is invalid');
                    break;
                default:
                    setMessage(`Error: ${error.message}`);
            }
            console.error("Sign In Error:", error.message);
        }
    };

    return (
        <div className="Container">
            <div className="Title">Planywhere</div>
            <form className="signinsignupform" onSubmit={handleSignIn}>
                <div className="Header">
                    <div className="Text">Sign In</div>
                    <div className="Underline"></div>
                </div>
                <div className="Inputs">
                    <div className="Input">
                        <img src={email_icon} alt='' />
                        <input
                            type='email'
                            placeholder="Your e-mail Address"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="Input">
                        <img src={password_icon} alt='' />
                        <input
                            type='password'
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="Forgotpassword">
                    Forgot your password? <span onClick={() => navigate('/forgot-password')}>Click Here</span>
                </div>
                <div className="Submit-Container">
                    <button type='submit' className="Submit Grey">Sign In</button>
                </div>
                
                <div className='Switch-Action'>
                   <p>Are you not yet registered?</p>
                   <button type='button' onClick={() => navigate('/signup')} className='Switch-Button'>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;

