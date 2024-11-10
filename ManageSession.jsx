import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "./firebase";


const SessionManager = ({ children }) => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(null);
  
    const logoutUser = () => {
      auth.signOut().then(() => {
        console.log('User signed out due to inactivity');
        navigate('/signin');
      }).catch((error) => {
        console.error('Sign out error:', error);
      });
    };
  
    const resetTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(setTimeout(logoutUser, 360000));
    };
  
    useEffect(() => {
     
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keypress', resetTimer);
  
      
      resetTimer();
  
      
      
      return () => {
        if (timer) clearTimeout(timer);
        window.removeEventListener('mousemove', resetTimer);
        window.removeEventListener('keypress', resetTimer);
      };
    }, [timer]);
  
    return <>{children}</>;
  };
  
  export default SessionManager;