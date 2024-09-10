// MultiplicationMachine.js
import React, { useState } from 'react';
import './MultiplicationMachine.css'; // Import the CSS for styling
import GameConsole from '../gameconsole/GameConsole'; // Import the GameConsole component

const MultiplicationMachine = () => {
    // Create an array for multiplication equations
    const equations = [];
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            equations.push({ num1: i, num2: j, answer: i * j });
        }
    }

    // State to track which equation button was clicked
    const [revealed, setRevealed] = useState({});
    const [isPlaying, setIsPlaying] = useState(false); // Track game mode
    const [highlightedIndex, setHighlightedIndex] = useState(null); // Track highlighted button
    const [userAnswers, setUserAnswers] = useState({}); // Track user's answers
    const [feedback, setFeedback] = useState(''); // Track feedback for the user
    const [activeButton, setActiveButton] = useState(null); // Track which button is active for input

    // Function to handle button clicks
    const handleClick = (index) => {
        if (isPlaying) {
            // Set the active button index to clear its content
            setActiveButton(index);
            setUserAnswers((prev) => ({ ...prev, [index]: '' }));
        } else {
            // Toggle revealed state if not in game mode
            setRevealed((prev) => ({ ...prev, [index]: !prev[index] }));
            setTimeout(() => {
                setRevealed((prev) => ({ ...prev, [index]: false }));
            }, 2000);
        }
    };

    // Function to start the game
    const startGame = () => {
        setIsPlaying(true);
        // Highlight a random button
        const randomIndex = Math.floor(Math.random() * equations.length);
        setHighlightedIndex(randomIndex);
        setFeedback('');
        setActiveButton(null); // Reset active button
        // Optionally, clear the highlighted button after some time
        setTimeout(() => setHighlightedIndex(null), 2000); // Adjust timeout as needed
    };

    // Function to handle input change
    const handleInputChange = (index, value) => {
        setUserAnswers((prev) => ({ ...prev, [index]: value }));
    };

    // Function to validate input and provide feedback
    const validateAnswer = (index) => {
        const equation = equations[index];
        const userAnswer = parseInt(userAnswers[index], 10);
        if (userAnswer === equation.answer) {
            setFeedback('Correct!');
        } else {
            setFeedback('Incorrect, try again.');
        }
    };

    // Function to handle game end
    const handleGameEnd = (finalScore) => {
        setIsPlaying(false);
        alert(`Game over! Your score: ${finalScore}`);
    };

    return (
        <div className="multiplication-machine-container">
            <div className="multiplication-machine">
                <h2>Multiplication Machine</h2>
                <div className="equation-grid">
                    {equations.map((eq, index) => (
                        <div
                            key={index}
                            className={`equation-button ${revealed[index] ? 'revealed' : ''} ${highlightedIndex === index ? 'highlighted' : ''}`}
                            onClick={() => handleClick(index)}
                        >
                            {/* Show the equation or input field */}
                            {isPlaying && activeButton === index ? (
                                <input
                                    type="number"
                                    value={userAnswers[index] || ''}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onBlur={() => validateAnswer(index)}
                                    placeholder="Your answer"
                                    className="answer-input"
                                />
                            ) : (
                                <>
                                    <div className="equation-text">
                                        {revealed[index] ? (
                                            `${eq.answer}`
                                        ) : (
                                            <>
                                                <span className="bold-text">{eq.num1}</span>
                                                <span className="operator"> × </span>
                                                <span className="bold-text">{eq.num2}</span>
                                            </>
                                        )}
                                    </div>
                                    {isPlaying && activeButton === index && (
                                        <input
                                            type="number"
                                            value={userAnswers[index] || ''}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            onBlur={() => validateAnswer(index)}
                                            placeholder="Your answer"
                                            className="answer-input"
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <button className="play-game-button" onClick={startGame}>
                    Play Game
                </button>

                {/* Display feedback */}
                {feedback && <p className="feedback">{feedback}</p>}
            </div>

            {/* Display GameConsole component on the left when playing */}
            {isPlaying && <GameConsole onGameEnd={handleGameEnd} />}
        </div>
    );
};

export default MultiplicationMachine;