import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';


const Register = (props) => {
    // console.log(props.isLoggedIn);
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmRegisterPassword, setConfirmRegisterPassword] = useState('');
    const [registerPasswordsMatch, setRegisterPasswordMatch] = useState(false);
    const [allFieldsComplete, setAllFieldsComplete] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const onChange = (event) => {
        if (event.target.name === 'registerUsername') {
            setRegisterUsername(event.target.value);
        } else if (event.target.name === 'registerPassword') {
            setRegisterPassword(event.target.value);
        } else if (event.target.name === 'confirmRegisterPassword') {
            setConfirmRegisterPassword(event.target.value);
        }
    }

    useEffect(() => {
        if (registerPassword === confirmRegisterPassword) {
            setRegisterPasswordMatch(true);
        } else {
            setRegisterPasswordMatch(false);
        }

        if (registerUsername.length > 0 && (registerUsername === '' || registerPassword === '')) {
            setAllFieldsComplete(false)
        } else {
            setAllFieldsComplete(true);
        }
    }, [registerUsername, registerPassword, confirmRegisterPassword])

    const accountRegister = async (event) => {
        event.preventDefault();
        let username = registerUsername;
        let password = registerPassword;
        try {
            const response = await axios.post('/api/users/register', {
                username,
                password
            });

            if (!response.data.token) {
                setErrorMessage(response.data.error);
            } else {
                props.setUserToken(response.data.token);
                window.localStorage.setItem('token', `${response.data.token}`);
                return setIsRegistered(true);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }

    }

    return (
        <div className="container " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', padding: '0%', margin: '0', paddingTop: '5%' }}>
            <div className="card text-bg-dark mb-3 text-center" style={{ opacity: '80%', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <form>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            value={registerUsername}
                            onChange={onChange}
                            name='registerUsername'
                            placeholder="Username"></input>
                        <label for="floatingInput">Username</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            value={registerPassword}
                            onChange={onChange}
                            name='registerPassword'
                            placeholder="Password"></input>
                        <label for="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            value={confirmRegisterPassword}
                            onChange={onChange}
                            name='confirmRegisterPassword'
                            placeholder="Password"></input>
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>

                    {isRegistered ? <Navigate to='/myroutines' /> : <div className='text-danger'>{errorMessage}</div>}

                    {registerPasswordsMatch ? null : <div className='text-danger'>The entered passwords do not match.</div>}

                    {allFieldsComplete ? null : <div className='text-danger'>All fields must be completed.</div>}

                    {registerPasswordsMatch && allFieldsComplete ?
                        <button
                            type="register"
                            class="btn btn-dark"
                            onClick={accountRegister}>
                            Register
                        </button> :
                        <button
                            type="register"
                            class="btn btn-dark">
                            Register
                        </button>}
                    <div  style={{color: 'white'}}>
                        <h7  >Already have an account?</h7> <Link style={{color: 'white'}} to='/login'>Click Here.</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;