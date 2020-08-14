import React from 'react';
import './App.css';
import Theme from './Theme'
import { Survey } from './scenes/Survey';

import {PageRouter} from "./routes"

function App() {
    return (
        <Theme>
            <div className="App">
                <PageRouter />
                
            </div>
        </Theme>
    );
}

export default App;
