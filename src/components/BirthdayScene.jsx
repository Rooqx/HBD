import React from 'react';
import './BirthdayScene.css';

const BirthdayScene = () => {
    return (
        <div className="birthday-scene">
            <div className="floating-particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`
                    }} />
                ))}
            </div>
            
            <h1 className="birthday-title">
                <span className="glow-text">Happy Birthday</span>
                <span className="name-text">Itunu</span>
            </h1>
            
            <div className="cake-container">
                <img src="/cake.png" alt="Birthday Cake" className="cake-image" />
                <div className="candle-glow"></div>
            </div>
        </div>
    );
};

export default BirthdayScene;
