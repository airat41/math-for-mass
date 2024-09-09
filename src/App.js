import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Multiplication table from 1 to 9</h1>
        <h2>Just press the equation buttons</h2>
        <h2>and answers pop up!</h2>
        <div className="parent-container">
          <MultiplicationMachine/>
        </div>
      </header>
    </div>
  );
}

export default App;
