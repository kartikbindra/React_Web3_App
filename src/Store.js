import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

const ITEMS = [
  {
    id: 1,
    price: ethers.utils.parseEther('100')
  }, 
  {
    id: 2,
    price: ethers.utils.parseEther('200')
  }
];

function Store({ paymentProcessor, dai }) {
  const buy = async item => {
    const response1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`);
    console.log(response1);

    //console.log(paymentProcessor.address);
    //console.log(item.price);

    const tx1 = await dai.approve(paymentProcessor.address, item.price);
    await tx1.wait();

    const tx2 = await paymentProcessor.pay(item.price, response1.data.paymentId);
    const receipt = await tx2.wait();

    console.log(response1.data.paymentId);
    await new Promise(resolve => setTimeout(resolve, 5000)); 
    const response2 = await axios.get(`${API_URL}/api/getItemUrl/${response1.data.paymentId}`);
    console.log(response2);
    //console.log(response2.data.url);
  };

  return (
    <ul className="list-group">
      <li className="list-group-item" style = {{display: "flex"}}>
        Buy item1 -<span className='font-weight-bold'>100 DAI</span>
        <button 
          type="button" 
          className="btn btn-primary float-right"
          style = {{marginLeft: "auto"}}
          onClick={() => buy(ITEMS[0])}
        >
          Buy
        </button>
      </li>
      <li className="list-group-item" style = {{display: "flex"}}>
        Buy item2 -<span className='font-weight-bold'>200 DAI</span>
        <button 
          type="button" 
          className="btn btn-primary float-right"
          style = {{marginLeft: "auto"}}
          onClick={() => buy(ITEMS[1])}
        >
          Buy
        </button>
      </li>
      
    </ul>
  );
}

export default Store;