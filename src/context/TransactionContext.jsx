import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

// jeśli w przeglądarce jest zainstalowany metamask, do obiektu globalnego window
// jest dodawany obiekt ethereum.
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionContract;
}

export const TransactionProvider = ({ children }) => {

  const [connectedAccount, setConnectedAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [transactions, setTransactions] = useState([])

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  const getAllTransactions = async () => {
    try {
      if(!ethereum) return alert("Please install metamask");

      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map((item) => ({
        addressTo: item.receiver,
        addressFrom: item.sender,
        timestamp: new Date(item.timestamp.toNumber() * 1000).toLocaleString(),
        message: item.message,
        keyword: item.keyword,
        amount: parseInt(item.amount._hex) / (10 ** 18)
      }));

      setTransactions(structuredTransactions);

    } catch (error) {
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {

    try {
      // jeśli nie ma tego obiektu
      if(!ethereum) return alert("You need metamask");
  
      const accounts = await ethereum.request({ method: 'eth_accounts'});
      if(accounts.length) {
        setConnectedAccount(accounts[0]);
    
        // get all transactions
        getAllTransactions();
      } else {
        console.log('No accounts');
      }
    } catch (error) {
      console.error(error);

      throw new Error('No Ethereum object');
    }
  }

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem('transactionCount', transactionCount);
    } catch (error) {
      console.log(error);

      throw new Error('no ethereum object');
    }
  }

  const connectWallet = async () => {
    try {
      // upewnienie się że metamask jest zainstalowany
      if(!ethereum) return alert("You need metamask");
      
      // zapytanie do metamask o adres podłączonego portfela
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });


      // ustawienie obecnego konta
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.error(error);

      throw new Error('No Ethereum object');
    }
  }

  const sendTransaction = async () => {
    try {
      if(!ethereum) return alert("You need metamask");

      // get the data
      const { addressTo, amount, keyword, message } = formData;

      const transactionContract = getEthereumContract();
      const patsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: connectedAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: patsedAmount._hex
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, patsedAmount, message, keyword);
      setIsLoading(true);

      await transactionHash.wait();

      setIsLoading(false);

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());

      
    } catch (error) {
      console.error(error);

      throw new Error('No Ethereum object');
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider value={{
      connectWallet,
      connectedAccount,
      formData,
      setFormData,
      handleChange,
      sendTransaction,
      transactions,
      isLoading
    }}>
      {children}
    </TransactionContext.Provider>
  )
}