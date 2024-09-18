import React, { useState, useEffect } from 'react';
import './MultiplicationMachine.css'; // Import the CSS for styling
import GameConsole from '../gameconsole/GameConsole'; // Import the GameConsole component

const MultiplicationMachine = () => {
    const equations = [];
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            equations.push({ num1: i, num2: j, answer: i * j });
        }
    }

    const [revealed, setRevealed] = useState({});
    const [isPlaying, setIsPlaying] = useState(false); // Track game mode
    const [feedback, setFeedback] = useState(''); // Track feedback for the user
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480); // State to track if it's mobile

    // Function to handle button clicks
    const handleClick = (index) => {
        if (!isPlaying) {
            setRevealed((prev) => ({ ...prev, [index]: !prev[index] }));
            setTimeout(() => {
                setRevealed((prev) => ({ ...prev, [index]: false }));
            }, 2000);
        }
    };

    // Function to start the game
    const startGame = () => {
        setIsPlaying(true);
        Math.floor(Math.random() * equations.length);
        setFeedback('');
    };

    // Handle window resizing for mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480); // Update state when screen size changes
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup the event listener
        };
    }, []);

    return (
        <div className="multiplication-machine-container">
            <div className={`multiplication-machine ${isMobile ? 'mobile' : 'desktop'}`}>
                <h2>Multiplication Machine</h2>
                <div className={`equation-grid ${isMobile ? 'mobile-grid' : ''}`}>
                    {equations.map((eq, index) => (
                        <div
                            key={index}
                            className={`equation-button ${revealed[index] ? 'revealed' : ''}`}
                            onClick={() => handleClick(index)}
                        >
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
            {isPlaying && <GameConsole onGameEnd={() => setIsPlaying(false)} />}
        </div>
    );
};

export default MultiplicationMachine;
