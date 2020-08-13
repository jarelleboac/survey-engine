import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import Theme from "./components/Theme"
import { Survey } from './components/Survey';

function App() {
    return (
        <div className="App">
            <Theme>
                <Survey />
            </Theme>
        </div>
    );
}

export default App;
