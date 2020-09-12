import React from 'react';
import Theme from './Theme'
import { Survey } from './scenes/Survey';
import {BrowserRouter} from 'react-router-dom'
import {Routes} from "./routes"
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <div className="App">
                    <Routes />
                    <ToastContainer />
                </div>
            </BrowserRouter>
        </Theme>
    );
}

export default App;
