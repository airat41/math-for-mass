import './App.css';
import MultiplicationMachine from "./multitable/MultiplicationMachine";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Multiplication table from 1 to 9</h1>
        <h1>Just press the equation buttons</h1>
        <h1>and answers pop up!</h1>
        <div className="parent-container">
          <MultiplicationMachine/>
        </div>
      </header>
    </div>
  );
}

export default App;
