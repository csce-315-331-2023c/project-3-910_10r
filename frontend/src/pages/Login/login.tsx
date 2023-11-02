import React, { useState } from 'react';
import './login.scss';

interface Props{
    setIsManager: React.Dispatch<React.SetStateAction<boolean>>
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({setIsManager, setIsLogin} : Props) => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const { username, password } = formData;
        setIsLogin(false);
        setIsManager(false);
        /* 
            get username, password, and manager Array from DB
                [ [user, pass, t/f], [user, pass, t/f], ...]
                not efficient, but idc
            check to see if username is a key -> if not show error
            check the password with the value -> if does not match, show error
            if the user is manager, show manager page
            if the user is not a manager, show cashier page
        */

        console.log(username, " " + password);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
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
        </>
    );
};

export default Login;