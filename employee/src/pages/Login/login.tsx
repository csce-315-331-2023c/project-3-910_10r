import React, { useState, useEffect } from "react";
import './login.scss';
// import {gapi} from "gapi-script";
import { GoogleOAuthProvider } from '@react-oauth/google';
import OAuth from './oauth';

// const clientID = "103248661019-a5si5aktn333l2v7q2qrooc0l8d32c7r.apps.googleusercontent.com";
// const clientID = "103248661019-ucbot5uusvdfhdkdblppphb4ghltk0ge.apps.googleusercontent.com";

import axios , { AxiosInstance } from 'axios';

let baseURL = import.meta.env.VITE_API_URL;
let clientID = import.meta.env.VITE_CLIENT_ID;
console.log(clientID);

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

interface Props{
    setIsManager: React.Dispatch<React.SetStateAction<boolean>>
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
    setIsCashier: React.Dispatch<React.SetStateAction<boolean>>
    setPayPage: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({setIsManager, setIsLogin, setIsCashier, setPayPage} : Props) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    // const [isOAuthClicked, setIsOAuthClicked] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSubmitClicked(false);
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setShowError(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLogin(true);
        setIsManager(false);
        setIsCashier(false);
        setIsSubmitClicked(true);
    };

    // const handleOAuth = () => {
    //     setIsOAuthClicked(true);
    //     console.log("OAuth true");
    // };
    // const handleCallbackResponse = (response) => {
    //     console.log("Encoded JWT ID token: " + response.credential);
    // };

    useEffect(() => {
        // gapi.load('client:auth2', start);
        // google.accounts.id.initialize({
        //     client_id: "103248661019-ucbot5uusvdfhdkdblppphb4ghltk0ge.apps.googleusercontent.com",
        //     callback: handleCallbackResponse
        // });

        if (isSubmitClicked && formData.username && formData.password) {
            const para = `name='${formData.username}' AND password='${formData.password}'`;
            API.get(`/login?parameter=${para}`)
                .then((response) => {
                    if(response.data === -1) {
                        setShowError(true);
                    }
                    else if(response.data) {
                        console.log("Manager!");
                        setIsManager(true);
                        setIsCashier(false);
                        setIsLogin(false);
                        setPayPage(false);
                    }
                    else {
                        console.log("Cashier!");
                        setIsCashier(true);
                        setIsManager(false);
                        setIsLogin(false);
                        setPayPage(false);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setShowError(true);
                });
        }
    }, [isSubmitClicked, formData.username, formData.password]);

    return (
        <div className="login-container">
            <div className="login">
                <h2 className="login__header">Login</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="login__form-label">Username: </label>
                    <input type="text"
                        id="username"
                        name="username"
                        className="login__form-input"
                        placeholder="Username"
                        required
                        autoComplete="off"
                        value={formData.username}
                        onChange={handleInputChange}
                        autoFocus
                    />
                    
                    <label htmlFor="password" className="login__form-label">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login__form-input"
                        placeholder="Password"
                        required
                        autoComplete="off"
                        value={formData.password}
                        onChange={handleInputChange}
                    />

                    {showError && <div className="login__form-invalid">Invalid Username or Password</div>}

                    <button id="loginSubmitBtn" type="submit" className="login__form-login">Login</button>

                    <div className='login__form-google'>
                        <div className='login__form-google-cover'>or</div>
                        <GoogleOAuthProvider clientId={clientID}>
                            <OAuth setIsLogin={setIsLogin} setIsManager={setIsManager} setIsCashier={setIsCashier} setPayPage={setPayPage}/>
                        </GoogleOAuthProvider>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;