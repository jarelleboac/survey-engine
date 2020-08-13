import React from 'react';
import './App.css';
import Theme from './Theme'
import { Survey } from './components/Survey';


function App() {
    return (
        <Theme>
            <div className="App">
                <div className="survey-container">
                    <div id="logo-container">
                        <img src="logo.png" id="logo" alt="% project logo"/>
                    </div>
                    <Survey />
                </div>
            </div>
        </Theme>
    );
}

export default App;
