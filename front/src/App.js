import logo from './logo.svg';
import './App.css';
import {Route, Link} from 'react-router-dom';
import Movie from './components/moviePage/Movie';
import Booking from './components/booking/Booking';

function App() {
  return (
    <div className="App container">
      <Route path="/movies/:movieId" component={Movie} />
      <Route path="/book/:sessionId" component={Booking} />
    </div>
  );
}

export default App;
