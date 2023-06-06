import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (event) => {
        if (event.target.name === 'loginUsername') {
            setLoginUsername(event.target.value);
        } else if (event.target.name === 'loginPassword') {
            setLoginPassword(event.target.value);
        }
    }

    const accountLogin = async (event) => {
        event.preventDefault();
        let username = loginUsername;
        let password = loginPassword;
        try {
            const response = await axios.post('/api/users/login', {
                username,
                password
            });
            // console.log(response);
            if (!response.data.success) {
                console.log("Login failed.")
                return setErrorMessage("Username or password is incorrect.");
            } else {
                props.setUserToken(response.data.token);
                window.localStorage.setItem('token', `${response.data.token}`);
                return props.setIsLoggedIn(true);
            }
        } catch (err) {
            setErrorMessage("Username or password is incorrect.");
            throw err;
        }
    }

    return (
        <div className="container " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', padding: '0%', margin: '0', paddingTop: '5%' }}>
            <div className="card bg-dark mb-3 text-center" style={{ opacity: '80%', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <form>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            value={loginUsername}
                            onChange={onChange}
                            name='loginUsername'
                            placeholder="Username" />

                        <label htmlFor="floatingInput">Username</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            value={loginPassword}
                            onChange={onChange}
                            name='loginPassword'
                            placeholder="Password"></input>

                        <label htmlFor="floatingPassword">Password</label>
                    </div><br />

                    {props.isLoggedIn ? <Navigate to='/myroutines' /> : <div className='text-danger'>{errorMessage}</div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Link to='/register' ><button type="Login" class="btn btn-dark">Register</button></Link>
                        <button
                            type="Login"
                            class="btn btn-dark"
                            onClick={accountLogin}>
                            Login
                        </button>
                    </div>



                </form>
            </div >
        </div >
    )
}

export default Login;