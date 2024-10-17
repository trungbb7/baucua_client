import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import StartPage from "./GameBauCua/StartPage"; // Đảm bảo đường dẫn chính xác
import GameBauCua from './GameBauCua/GameBauCua';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(musicButtonStyle);

  return (
    <Router>
      <div className="App">
        <audio id="background-music" src="/music.mp3" loop />
        <Routes>
          <Route path="/" element={<StartPage  />} />
          <Route 
            path="/game" 
            element={
              <div style={{ position: 'relative' }}>
                <div className="game-container"> {/* Thêm lớp bao quanh */}
                  <GameBauCua />
                </div>
                <div style={musicButtonContainerStyle}>
                  {isPlaying ? (
                    <button 
                      
                      style={buttonStyle}
                      onMouseEnter={() => setButtonStyle(musicButtonHoverStyle)} // Hiệu ứng hover
                      onMouseLeave={() => setButtonStyle(musicButtonStyle)} // Trở về style ban đầu
                    >
                      <FontAwesomeIcon icon={faCirclePause} />
                    </button>
                  ) : (
                    <button 
                     
                      style={buttonStyle}
                      onMouseEnter={() => setButtonStyle(musicButtonHoverStyle)} // Hiệu ứng hover
                      onMouseLeave={() => setButtonStyle(musicButtonStyle)} // Trở về style ban đầu
                    >
                      <FontAwesomeIcon icon={faCirclePlay} />
                    </button>
                  )}
                </div>
              </div>
            } 
          />
        </Routes>

        {/* CSS cho .game-container */}
        <style>{`
         game-container {
          max-width: 100vw;
          height: auto; 
          margin: 0 auto; 
          border: 2px solid #ccc; 
          border-radius: 10px;
          background-color: #f9f9f9; 
          padding: 20px; 
          overflow: hidden;
          }

          .game-container > * {
            max-height: 100%; /* Đảm bảo các phần tử con không vượt quá chiều cao của game-container */
          }
        `}</style>
      </div>
    </Router>
  );
}

const musicButtonContainerStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  zIndex: 10,
};

const musicButtonStyle = {
  background: 'orange',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '36px',
  color: '#ffffff', 
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  outline: 'none', 
};

const musicButtonHoverStyle = {
  ...musicButtonStyle,
  transform: 'scale(1.1)', 
  background: 'darkorange', 
  boxShadow: '0 0 15px rgba(255, 165, 0, 0.8)', 
  transition: 'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease', // Thêm chuyển động cho bóng
};

export default App;
