import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/app.js';
import { HashRouter, Routes, Route } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <App/>
    </HashRouter>
);