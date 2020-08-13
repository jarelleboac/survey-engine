import React from 'react';
import './App.css';
import Theme from './Theme'
import { Survey } from './components/Survey';


function App() {
    return (
        <div className="App">
            <img src="logo.png" id="logo" alt="% project logo"/>
            <Theme>
                <Survey />
            </Theme>
        </div>
    );
}

export default App;
