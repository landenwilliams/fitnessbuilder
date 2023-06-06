import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RenderHeader from './renderheader.js';
import Home from './home.js';
import Login from './login.js';
import Register from './register.js';
import Routines from './routines.js';
import MyRoutines from './myroutines.js';
import Activities from './activities.js';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('token'));
    const [userToken, setUserToken] = useState('');

    return (
        <div style={{ position: 'fixed', display: 'flex', backgroundImage: 'url(../dist/images/3.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', justifyContent: 'center', width: '100%', height: '100%', maxHeight: '100%', margin: '0%' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', margin: '0', padding: '0', width: '100%', height: '100%', maxWidth: '800px', maxHeight: '800px' }}>
                <RenderHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserToken={setUserToken} />
                <div className="container shadow-lg" style={{ overflow: 'scroll', width: '50%', height: '100%', marginLeft: '0', padding: '3%' }}>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userToken={userToken} setUserToken={setUserToken} />}></Route>
                        <Route path='/register' element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userToken={userToken} setUserToken={setUserToken} />}></Route>
                        <Route path='/routines' element={<Routines />}></Route>
                        <Route path='/myroutines' element={<MyRoutines isLoggedIn={isLoggedIn} userToken={userToken} />}></Route>
                        <Route path='/activities' element={<Activities />}></Route>
                    </Routes>
                </div>
            </div>
        </div >
    )
}

export default App;