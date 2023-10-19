import React, { useState, useEffect } from 'react';
import Store from './Store.js';
import getBlockchain from './ethereum.js';

function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined); 
  const [dai, setDai] = useState(undefined); 

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, dai } = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    }
    init();
  }, []);

  if(typeof window.ethereum === 'undefined') {
    return (
      <div className='container'>
        <div className='col-sm-1'>
          <h1>WearVerse<h2>Metaverse E-commerce App</h2></h1>
          <p>You need to install the latest version of Metamask to use this app. MEtamask is an Ethereum wallet, available as a Google chrome extension.</p>
          <ul>
            <li>Go to the <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>Metamask page</a> on the chrome webstore and install it</li>  
            <li>If you already have it installed, uninstall and re-install it</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='col-sm-12'>
      <div className='justify-content-center'><h1>WearVerse</h1><h4>Metaverse E-commerce App</h4></div>
        <Store paymentProcessor={paymentProcessor} dai={dai} />
      </div>
    </div>
  );
}

export default App;

