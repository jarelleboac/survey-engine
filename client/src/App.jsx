import React from 'react';
import Theme from './Theme'
import { Survey } from './scenes/Survey';

import {PageRouter} from "./routes"
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Theme>
            <div className="App">
                <PageRouter />
                <ToastContainer />
            </div>
        </Theme>
    );
}

export default App;
