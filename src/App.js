import './App.css';
import React from "react";
import {Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Movie from './components/moviePage/Movie';
import Booking from './components/booking/Booking';
import RegistrationForm from "./components/accountLogs/RegistrationForm";
import LoginForm from "./components/accountLogs/LoginForm";
import Contacts from "./components/contacts/Contacts";
import Account from "./components/Account/Account"

import Home from './components/Home/Home'
import Error from './components/error/ErrorComponent'
import MoviesListPage from './components/movies/MoviesListPage';

import './style.scss'
import SessionsMain from './components/Admin/Sessions/SessionsMain';
import EditSession from './components/Admin/Sessions/EditSession';
import CreateSession from './components/Admin/Sessions/CreateSession';

function App() {
  return (
    <div className="App">
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contacts" component={Contacts} />
            <Route path='/login' component={LoginForm}/>
            <Route path='/registration' component={RegistrationForm}/>
            <Route exact path="/movies/:movieId" component={Movie} />
            <Route exact path="/movies" component={MoviesListPage} />
            <Route path="/book/:sessionId" component={Booking} />
            <Route path="/account" component={Account} />
            <Route exact path="/admin/sessions/:sessionId" component={EditSession} />
            <Route exact path="/admin/sessions/create" component={CreateSession} />
            <Route exact path="/admin/sessions" component={SessionsMain} />
            <Route component={Error} exact/>
        </Switch>
        <Footer />
    </div>
  );
}

export default App;
