import React, { useState } from 'react';
import './login.scss';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        // Access the username and password from the formData state
        const { username, password } = formData;

        // Now you can use username and password for further processing,
        // like sending them to the server or performing client-side validation.

        console.log('Username:', username);
        console.log('Password:', password);
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