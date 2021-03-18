import './App.css';
import React from "react";
import {Route, BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Movie from './components/moviePage/Movie';
import Booking from './components/booking/Booking'
import RegistrationForm from "./components/accountLogs/RegistrationForm";
import LoginForm from "./components/accountLogs/LoginForm";
import Contacts from "./components/contacts/Contacts"

import Home from './components/Home/Home'

function App() {
  return (
    <div className="App">
        <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/contacts" component={Contacts} />
            <Route path='/login' component={LoginForm}/>
            <Route path='/registration' component={RegistrationForm}/>
            <Route exact path="/movies/:movieId" component={Movie} />
            <Route path="/book/:sessionId" component={Booking} />
        <Footer />
    </div>
  );
}

export default App;
