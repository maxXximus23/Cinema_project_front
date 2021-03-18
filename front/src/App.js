import './App.css';
import React from "react";
import {Route} from "react-router"
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div >
                    <Route path='/login' component={LoginForm}/>
                    <Route path='/registration' component={RegistrationForm}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

