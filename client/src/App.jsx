import React from "react";
import logo from "./assets/logo.svg";
import "./App.css";
import { Survey } from "./components/Survey";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Survey />
            </header>
        </div>
    );
}

export default App;
