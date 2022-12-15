import './App.css';
import React, {useEffect} from 'react';
import gitlogo from './assets/gitlogo.svg';
// Constants
const GIT_HANDLE = '/pj541';
const GIT_LINK = `https://github.com/${GIT_HANDLE}`;

const App = () => {
  useEffect(() => {
    const walletConnected = async ()=>{
      if(window?.solana?.isPhantom){
        console.log("Phantom Found");
      }
      else{
        alert("Where is your phantom? ");
      }
    }
    const onload = async ()=>{
      await walletConnected();
    }
    window.addEventListener('load', onload());
  },[]);
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">💃 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={gitlogo} />
          <a
            className="footer-text"
            href={GIT_LINK}
            target="_blank"
            rel="noreferrer"
          >{` built on @${GIT_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
