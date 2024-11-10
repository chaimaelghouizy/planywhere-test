import React from 'react';
import { useState } from 'react';
import { auth } from './firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignInSignUp.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate= useNavigate('');
  
    const handlePasswordReset = (e) => {
        e.preventDefault();
        setMessage('');
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setMessage('Password reset email sent! Please check your inbox.');
          })
          .catch((error) => {
            console.error('Error sending password reset email:', error);
            setMessage('Failed to send password reset email. Please try again.');
          });
      };
  
    return (
      <div className="Container">
        <h2>Reset Your Password</h2>
        <form onSubmit={handlePasswordReset} className="signinsignupform">
          <div className="Inputs">
            <div className="Input">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="Submit"> Reset password email</button>
        </form>
        {message && <p>{message}</p>}
        <button
            type="button"
            className="Switch-Button"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
      </div>
    );
  };
  
  export default ForgotPassword;
