import React from 'react';
import Theme from './Theme'
import {BrowserRouter} from 'react-router-dom'
import {Routes} from "./routes"
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <Routes />
                <ToastContainer />
            </BrowserRouter>
        </Theme>
    );
}

export default App;
