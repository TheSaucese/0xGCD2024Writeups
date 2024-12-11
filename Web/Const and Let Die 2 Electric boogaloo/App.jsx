import './App.css'
import uvillage from './assets/uvillagephantomliberty.png'
import { useEffect } from 'react';
import React, { useState } from 'react';

let letmein = false;

const GlitchEffect = ({ isActive }) => {
  const [rectangles, setRectangles] = useState([]);

  useEffect(() => {
    if (isActive) {
      const intervalId = setInterval(() => {
        const newRectangle = {
          top: Math.random() * (window.innerHeight - 200) + 'px', 
          left: Math.random() * (window.innerWidth - 200) + 'px', 
          width: Math.random() * 200 + 'px',
          height: Math.random() * 200 + 'px',
        };
        setRectangles((prevRectangles) => [...prevRectangles, newRectangle]);

        setTimeout(() => {
          setRectangles((prevRectangles) =>
            prevRectangles.filter((rect) => rect !== newRectangle)
          );
        }, 10000);
      }, 5);

      return () => clearInterval(intervalId);
    }
  }, [isActive]);



  return (
    <div className={`${isActive ? "glitch" : ""}`}>
      {rectangles.map((rect, index) => (
        <div
          key={index}
          className="glitch-rectangle"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
          hidden={!isActive}
        />
      ))}
    </div>
  );
};

function App() {

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPos = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursorPos);

    return () => {
      window.removeEventListener('mousemove', updateCursorPos);
    };
  }, []);


  const [isShutdown, setIsShutdown] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const [inputUserAndPass, setInputUserAndPass] = useState(['', '']);

  const [bgColor, setBgColor] = useState('#9A3E33');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [shutdownText, setShutdownText] = useState('');

  useEffect(() => {
    if (isGlitching) {
      setTimeout(() => {
        setIsGlitching(false);
      }, 10000);
    }
  }, [isGlitching]);

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const [userAndPass, setUserAndPass] = useState([generateRandomString(10), generateRandomString(10)]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let newUsername = generateRandomString(10);
    let newPassword = generateRandomString(10);
    setUserAndPass(newUsername, newPassword);
    if (username === newUsername && password === newPassword && letmein === true) {
      setUserAndPass(newUsername, newPassword);
      setInputUserAndPass(username, password);
      setIsGlitching(true);
      setTimeout(() => {
        setIsShutdown(true);
      }, 10000);

    } else {
      console.log('not that easy');
    }

  };

  async function handleClick(event) {
    if (userAndPass[0] === inputUserAndPass[0] && userAndPass[1] === inputUserAndPass[1]) {
      setShutdownText('🕯️You did not pay rent for your PFE semester...check the console peasant🕯️');
      const { default: secret } = await import('./secret.js');
      console.log(secret);
    }
    else {
      console.log('no');
      event.target.hidden = true;
      
    }
  };

  return (
    <div className={`container ${isShutdown ? 'shutdown' : ''}`}>
      <button className="shutdown-button" hidden={!isShutdown} onClick={handleClick}> {shutdownText} </button>
      <GlitchEffect isActive={isGlitching} />
      <div className={`${isGlitching ? 'glitch minicontainer' : 'minicontainer'}`}>
        <img draggable="false" src={uvillage} style={{ visibility: isShutdown || isGlitching ? 'hidden' : 'visible' }} alt="logo" />
        <form onSubmit={handleSubmit} style={{ visibility: isShutdown || isGlitching ? 'hidden' : 'visible' }}>
          <label>
            USERNAME
            <input type="text" className='first-input' value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            PASSWORD
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <div className="button-container" style={{ backgroundColor: bgColor }}>
            <button className="cool-button" onMouseEnter={() => setBgColor('#6CC7D1')}
              onMouseLeave={() => setBgColor('#9A3E33')} type="submit">LOGIN</button>
          </div>
        </form>
      </div>
      <div
        hidden={!isShutdown}
        style={{
          position: 'fixed',
          top: cursorPos.y-35,
          left: cursorPos.x-40,
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
          overflow: 'hidden',
          filter: 'blur(20px)',
        }}
      />
    </div>


  );
}

export default App
