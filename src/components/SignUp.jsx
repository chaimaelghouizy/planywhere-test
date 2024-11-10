import React, { useState } from 'react';
import './SignInSignUp.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from './firebase';
import username_icon from './Assets/user.png';
import password_icon from './Assets/password.png';
import email_icon from './Assets/email.png';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setEmailError('');
        setMessage('');

        let isValid = true;

        if (!email.includes('@')) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await sendEmailVerification(user);
            setMessage('Verification email sent! check your inbox ');
            console.log('User created and verification email sent');
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setMessage('You already have an account, please sign in.');
                    break;
                case 'auth/invalid-email':
                    setMessage('Please enter a valid email address.');
                    break;
                case 'auth/weak-password':
                    setMessage('Password should be at least 6 characters.');
                    break;
                default:
                    setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="Container">
            <div className="Title">Planywhere</div>
            <form className="signinsignupform" onSubmit={handleSignUp}>
                <div className="Header">
                    <div className="Text">Sign Up</div>
                    <div className="Underline"></div>
                </div>
                <div className="Inputs">
                    <div className="Input">
                        <img src={username_icon} alt="" />
                        <input type="text" placeholder="Your First and Last Name" required />
                    </div>
                    <div className="Input">
                        <img src={email_icon} alt="" />
                        <input
                            type="email"
                            placeholder="Your e-mail Address"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {emailError && <p style={{ color: 'red', marginBottom: '10px' }}>{emailError}</p>}
                    </div>
                    <div className="Input">
                        <img src={password_icon} alt="" />
                        <input
                            type="password"
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="Submit-Container">
                    <button type="submit" className="Submit Grey">Sign Up</button>
                    <div className="Switch-Action">
                        <p>Already Have an Account? </p>
                        <button type="button" onClick={() => navigate('/signin')} className="Switch-Button">Sign In</button>
                    </div>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUp;

