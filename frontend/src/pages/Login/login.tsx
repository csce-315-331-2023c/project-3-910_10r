import React, { useState, useEffect } from "react";
import axios from "axios";
import './login.scss';

interface Props{
    setIsManager: React.Dispatch<React.SetStateAction<boolean>>
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({setIsManager, setIsLogin} : Props) => {
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
        setIsSubmitClicked(true);
    };

    useEffect(() => {
        if (isSubmitClicked && formData.username && formData.password) {
            const para = `name='${formData.username}' AND password='${formData.password}'`;
            axios.get(`http://localhost:8000/login?parameter=${para}`)
                .then((response) => {
                    if(response.data === -1) {
                        setShowError(true);
                    }
                    else if(response.data) {
                        setIsManager(true);
                        setIsLogin(false);
                    }
                    else {
                        setIsLogin(false);
                    }
                    console.log("asd");
                })
                .catch((err) => {
                    //console.error(err);
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
                        <button id="loginGoogle" className='login__form-google-btn'>
                            <i className="fa-brands fa-google"></i>
                            Login with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;