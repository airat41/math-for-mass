import React, { useState, useEffect, useRef } from 'react';
import './GameConsole.css'; // Import the CSS for styling the game console

const GameConsole = ({ onGameEnd }) => {
    const [timer, setTimer] = useState(60); // Timer set to 60 seconds
    const [score, setScore] = useState(0); // Track the score
    const [message, setMessage] = useState('Game started!'); // Initial message
    const [currentEquation, setCurrentEquation] = useState({ num1: 1, num2: 1, answer: 1 }); // Current equation
    const [userAnswer, setUserAnswer] = useState(''); // User's answer input
    const [incorrectAnswers, setIncorrectAnswers] = useState(0); // Array to track incorrect answers
    const debounceTimeout = useRef(null); // Ref to hold debounce timeout

    // Function to generate a random equation
    const generateRandomEquation = () => {
        const num1 = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 9
        const num2 = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 9
        setCurrentEquation({ num1, num2, answer: num1 * num2 });
    };

    // Function to check the user's answer
    const checkAnswer = (input) => {
        const answer = parseInt(input, 10);
        if (!isNaN(answer) && answer === currentEquation.answer) {
            setScore((prevScore) => prevScore + 1);
            setMessage('Correct!');
        } else if (!isNaN(answer)) {
            setMessage('Wrong answer!');
            setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1);
        } else {
            setMessage('Enter a valid number!');
        }
        // Clear the input field after checking the answer
        setUserAnswer('');
        // Generate a new random equation
        generateRandomEquation();
    };

    // Handle input changes with debounce
    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);

        // Clear the previous timeout to reset debounce timer
        clearTimeout(debounceTimeout.current);

        // Set a new debounce timeout
        debounceTimeout.current = setTimeout(() => {
            checkAnswer(e.target.value); // Check the answer after the debounce delay
        }, 300); // Adjust the delay time as needed
    };

    // Handle "Enter" key press to submit the answer
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            checkAnswer(userAnswer);
        }
    };

    // Decrease timer every second when the game is active
    useEffect(() => {
        generateRandomEquation(); // Generate the first equation when the component mounts

        if (timer > 0) {
            const timerInterval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 5000);

            return () => clearInterval(timerInterval); // Clean up interval on component unmount
        } else {
            setMessage('Game over!');
            onGameEnd(score); // Call the callback function to handle the end of the game
        }
    }, [timer, score, onGameEnd]);

    // Cleanup the debounce timeout when the component unmounts
    useEffect(() => {
        return () => clearTimeout(debounceTimeout.current);
    }, []);

    return (
        <div className="game-console">
            <div className="game-info">
                <p>Time Left: {timer} seconds</p>
                <p>Score: {score}</p>
                <p>Incorrect answers: {incorrectAnswers}</p>
                <p>Result: {(score/(score + incorrectAnswers)*100).toFixed(2)}%</p>
                <p>{message}</p>
                <p>
                    Result: {(score / (score + incorrectAnswers.length) * 100).toFixed(2)}%
                </p>
            </div>
            <label>
                {currentEquation.num1} × {currentEquation.num2} =
                <input
                    type="number"
                    value={userAnswer}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // Add keydown event listener
                    className="answer-input"
                    autoFocus
                />
            </label>
        </div>
    );
};

export default GameConsole;