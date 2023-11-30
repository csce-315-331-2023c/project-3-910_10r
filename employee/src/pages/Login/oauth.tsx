import { GoogleLogin } from '@react-oauth/google';
import { JwtPayload, jwtDecode }from 'jwt-decode';
import axios , { AxiosInstance } from 'axios';
import React, { useState } from "react";

let baseURL = import.meta.env.VITE_API_URL;

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

const OAuth = ({setIsManager, setIsLogin, setIsCashier, setPayPage} : Props) => {
    const [showError, setShowError] = useState(false);

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
              const credentialResponseDecoded = jwtDecode<JwtPayload>(credentialResponse.credential!);
              console.log(credentialResponseDecoded.name);
              console.log(credentialResponseDecoded.email_verified);
                
              if(credentialResponseDecoded.email_verified) {
                const para = `name='${credentialResponseDecoded.name}'`;
                API.get(`/oauth?parameter=${para}`)
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
                }}
              }
              
            onError={() => {
              {showError && <div className="login__form-invalid">Invalid Username or Password</div>}
              console.log('Login Failed');
            }}
        />
    )
}

export default OAuth;