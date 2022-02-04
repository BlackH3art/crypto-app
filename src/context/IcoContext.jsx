import React, { useEffect, useState, useContext } from 'react';
import { ethers } from 'ethers';

import { contractIcoABI, contractIcoAddress } from '../utils/constants';
import { TransactionContext } from './TransactionContext';
import { isAmountValid } from '../utils/validateAmount';


export const IcoContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {

  const provider = new ethers.providers.Web3Provider(ethereum);

  const signer = provider.getSigner();
  const icoContract = new ethers.Contract(contractIcoAddress, contractIcoABI, signer);

  return icoContract;
}

export const IcoProvider = ({ children }) => {

  const icoContract = getEthereumContract();

  const [amountToInvest, setAmountToInvest] = useState({ amount: "" });
  const [contractBalance, setContractBalance] = useState('');
  const [contractPrice, setContractPrice] = useState('');
  const [contractMaxAllocation, setContractMaxAllocation] = useState('');
  const [contractMaxInvestment, setContractMaxInvestment] = useState('');
  const [investor, setInvestor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { connectedAccount } = useContext(TransactionContext);

  useEffect(() => {
    getContractBalance();
    getIcoPrice();
    getMaxAlloaction();
    getMaxInvestment();
    getInvestor();
  }, []);

  const handleChange = (e, name) => {
    setAmountToInvest((prev) => ({
      ...prev,
      [name]: e.target.value
    }));
  }


  const invest = async () => {
    try {
      const { amount } = amountToInvest;

      const errorObject = isAmountValid(amount);
      if(!errorObject.valid) {
        setErrorMsg(errorObject.msg);
        return;
      } else {
        setErrorMsg(errorObject.msg);
      }

      
      if(!ethereum) return alert("You need metamask");
      if(!connectedAccount) return alert("Connect your wallet");

      setIsLoading(true);


      const transactionHash = await icoContract.invest({
        value: ethers.utils.parseEther(amount)._hex
      });

      await transactionHash.wait();
      console.log('transaction hash --> ', transactionHash);


      // 1. sprawdzić czy jest już inwestorem.
      const userInvested = await icoContract.investors(connectedAccount);
      setInvestor(userInvested);
      console.log('investor --> ', userInvested.account);

      // 2. sprawdzić balans KYT
      setIsLoading(false);
      

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  }

  // 1. udało się zainwestować. 
  // 2. podczas oczekiwania na transakcję nie wyświetlał się loader.
  // 3. stan aplikacji po zainwestowaniu się nie odświeżył.
  // 4. na zainwestowanym koncie aplikacja dalej wyświetla input

  const getContractBalance = async () => {
    setContractBalance(await icoContract.amount());
  }

  const getIcoPrice = async () => {
    setContractPrice(await icoContract.price());
  }

  const getMaxAlloaction = async () => {
    setContractMaxAllocation(await icoContract.maxAllocation());
  }

  const getMaxInvestment = async () => {
    setContractMaxInvestment(await icoContract.maxInvestment());
  }

  const getInvestor = async () => {

    connectedAccount && setInvestor(await icoContract.investors(connectedAccount));
  }

  // console.log({
  //   contractBalance,
  //   contractIcoAddress,
  //   contractMaxAllocation,
  //   contractPrice
  // });

  return (
    <IcoContext.Provider value={{
      handleChange,
      amountToInvest,
      invest,
      isLoading,
      contractBalance,
      contractPrice,
      contractMaxAllocation,
      contractMaxInvestment,
      investor,
      errorMsg
    }}>
      {children}
    </IcoContext.Provider>
  )
}