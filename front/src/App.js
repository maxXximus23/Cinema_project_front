import './App.css';
import React from "react";
import {Route, Link, BrowserRouter} from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Movie from './components/moviePage/Movie';
import Booking from './components/booking/Booking'
import RegistrationForm from "./components/accountLogs/RegistrationForm";
import LoginForm from "./components/accountLogs/LoginForm";

function App() {
  return (
    <div className="App">
        <Header />
        <BrowserRouter>
            <Route path='/login' component={LoginForm}/>
            <Route path='/registration' component={RegistrationForm}/>
            <Route path="/movies/:movieId" component={Movie} />
            <Route path="/book/:sessionId" component={Booking} />
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
