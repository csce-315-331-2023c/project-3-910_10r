import React, { useState, useEffect } from "react";
import './login.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import OAuth from './oauth';

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

/**
 * Login page for managers and employees
 * @returns Login component
 */
const Login = ({setIsManager, setIsLogin, setIsCashier, setPayPage} : Props) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
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
    
    useEffect(() => {
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

    // This is Kevin's attempt at centering the Sign in with Google Button
    /* useLayoutEffect(() => {

        console.log("hey");

        const googleContainer = document.querySelector(".login__form-google iframe") as HTMLIFrameElement;
        const googleButton = document.querySelector("#container") as HTMLDivElement;
        const googleSVG = document.querySelector("svg") as SVGElement;

        if (googleContainer) {
            googleContainer.style.width = "100% !important";
            googleContainer.style.margin = "0 !important";
            googleContainer.style.padding = "0 !important";
        }
        
        if (googleButton) {
            googleButton.style.width = "100% !important";
            googleButton.style.padding = "0 !important";
        }
        
        if (googleSVG) {
            googleSVG.style.transform = "scale(1.05) !important";
        }
    }, []); */

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