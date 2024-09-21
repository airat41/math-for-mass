import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MultiplicationMachine from "./multitable/MultiplicationMachine";
import Home from "./home/Home";

function App() {
    return (
        < Router>
            < div className="App">
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route path="/multiplication-machine" element={<MultiplicationMachine/>}></Route>
                </Routes>
            < /div>
        </Router>
    );
}

export default App;
