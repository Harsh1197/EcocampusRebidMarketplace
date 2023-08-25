import "./App.css";
import axios from 'axios';
import { useState } from "react";



import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


/**  Reference From Chatengine.io documentation */

const AuthPage = (props) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);
    const onSubmit = (e) => {
        e.preventDefault();
        const { value } = e.target[0];
        const emailInput = e.target[1];
        const enteredEmail = emailInput.value;
        const extractedUsername = enteredEmail.split('@')[0]; 

        axios.post(
            'http://localhost:3000/authenticate',
            { username: extractedUsername }
        ).then(r => {
            props.onAuth({ ...r.data, secret: extractedUsername });
            navigate('/chat');
        });
    };

    return (
        <div className="background">
            <form onSubmit={onSubmit} className="form-card">
                <div className="form-title"> Marketplace Chat </div>
                <div className="form-subtitle">Set a username to get started</div>
                <div className="auth">
                    <div className="auth-label">Username</div>
                    <input className="auth-input" name="username" value={user.name} />
                    <input className="auth-input" name="username" value={user.email} />
                    <button className="auth-button" type="submit">
                        Enter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthPage;