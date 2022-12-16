import './App.css';
import React, {useEffect, useState} from 'react';
import gitlogo from './assets/gitlogo.svg';
// Constants
const GIT_HANDLE = '/pj541';
const GIT_LINK = `https://github.com/${GIT_HANDLE}`;


const App = () => {
  const [walletAddress, setwalletAddress]= useState(null);
  const [phantomfound, setPhantom] = useState(null);
  const walletConnected = async ()=>{
    if(window?.solana?.isPhantom){
      console.log("Phantom Found");
      setPhantom('Found');
      
      const solana = window.solana;
      const rep = await solana.connect({onlyIfTrusted: true});
      console.log(rep.publicKey.toString());
      setwalletAddress(rep.publicKey.toString());
    }
  }

  const getPhantom = async()=>{
    if(window?.solana?.isPhantom){
      setPhantom('Found');
      
    }else{
      const url = "https://phantom.app/download";
      window.open(url, '_blank');
    }
  }

  const phantomnotfound = () =>{
    if(window?.solana?.isPhantom){
      setPhantom('Found');
      return -1;
    }
    return (<button
      className="cta-button connect-wallet-button"
      onClick={getPhantom}>
        Enable Phantom 
      </button>);
  }

  const connectwalletmethod = async ()=>{
    const solana = window.solana;
    const rep = await solana.connect();
    setwalletAddress(rep.publicKey.toString());
  }
  
  const ifnotConnected = () =>{
    return (<button
    className="cta-button connect-wallet-button"
    onClick={connectwalletmethod}>
      Connect to Wallet
    </button>);
  }  

  useEffect(() => {
    const onload = async ()=>{
      try{
        await walletConnected();
        
      }catch(err){
        console.log(err);
      }
    }
    window.addEventListener('load', onload);
    return (()=>  window.removeEventListener('load', onload));
  },[]);
  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">{phantomfound ? '💃 GIF Portal': 'Wheres your Phantom ?'}</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          { !phantomfound && phantomnotfound()}
          { phantomfound &&(!walletAddress) && ifnotConnected()}

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
