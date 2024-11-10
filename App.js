import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import SessionManager from './components/ManageSession.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import './App.css';
import ForgotPassword from './components/ForgotPassword.jsx';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
    return (
        <div className="App">
            <SessionManager>
                <Routes>
                    <Route path="/" element={<Navigate to="/signup" />} /> 
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route 
                        path="/home" 
                        element={
                            <ProtectedRoute>
                                <Homepage />
                            </ProtectedRoute>
                        } 
                    /> 
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </SessionManager>
        </div>
    );
}

export default App;
