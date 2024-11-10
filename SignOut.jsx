import React from "react";
import './SignInSignUp.css'
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const SignOut= () => {
    const navigate= useNavigate();

    const handleSignOut=() =>{
    auth.signOut()
    .then(() => {
        console.log('You have been signed out');
        navigate('/signin');
    })
    .catch((err) => {
        console.error('Error Signing Out:', err);
    });

};
return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        onClick={handleSignOut}
        style={{
          backgroundColor: '#00bcd4',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '12px 24px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;