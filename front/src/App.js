import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App container">
      <Route path="/book/:sessionId" component={Booking} />
    </div>
  );
}

export default App;
