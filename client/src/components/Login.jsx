import { useState } from 'react';
import axios from 'axios';
import { backend_Uri } from '../config/constants';
import { useNavigate } from 'react-router-dom';
import './PatentForm.Module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0()
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${backend_Uri}/api/v1/media/login`, { email, password })
            .then(res => {
                console.log("Response", res);
                console.log("Cookie", document.cookie);
                setSuccessMsg("Logged In Successfully");
                setErrMsg("");
                setTimeout(() => navigate('/displayMedias'), 1000);
            })
            .catch(error => {
                console.log("Err", error);
                setErrMsg("No User Found");
                setSuccessMsg("");
            });
    };

    return (
        <div>
            {
                isAuthenticated ?
                    <>
                        {isAuthenticated && <h3> Hello {user.name} </h3>}
                        <>
                            <button onClick={logout}> Log Out </button>
                        </>
                    </>

                    :

                    <form className='form-container'>
                        <span className='heading'>Login</span>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Email' id='email' name="email" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Password' id='password' name="password" onChange={(e) => setPassword(e.target.value)} />
                        <div className='formController'>
                            <div>{successMsg}</div>
                            <div>{errMsg}</div>
                        </div>
                        <button onClick={loginWithRedirect}>Continue with Auth0</button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleSubmit}>Submit
                        </motion.button>
                    </form>
            }
        </div>
    );
};

export default Login;
