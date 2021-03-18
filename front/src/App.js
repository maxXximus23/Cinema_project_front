import './App.css';
import React from "react";
import {Route, Link, BrowserRouter} from 'react-router-dom';
import Movie from './components/moviePage/Movie';
import Booking from './components/booking/Booking'
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Route path='/login' component={LoginForm}/>
            <Route path='/registration' component={RegistrationForm}/>
            <Route path="/movies/:movieId" component={Movie} />
            <Route path="/book/:sessionId" component={Booking} />
        </BrowserRouter>
    </div>
  );
}

export default App;
