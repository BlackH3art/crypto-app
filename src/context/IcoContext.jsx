import React, { useEffect, useState, useContext } from 'react';
import { ethers } from 'ethers';

import { contractIcoABI, contractIcoAddress } from '../utils/constants';
import { TransactionContext } from './TransactionContext';
import { isAmountValid } from '../utils/validateAmount';

// from private folder
import { RPC_LINK } from '../private/private';


export const IcoContext = React.createContext();

const { ethereum } = window;

const getEthereumContractSigner = () => {

  const provider = new ethers.providers.Web3Provider(ethereum);

  const signer = provider.getSigner();
  const icoContract = new ethers.Contract(contractIcoAddress, contractIcoABI, signer);

  return icoContract;
}

const getEtherumContractProvider = () => {

  const RPC = RPC_LINK;
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const icoContract = new ethers.Contract(contractIcoAddress, contractIcoABI, provider);

  return icoContract;
}

export const IcoProvider = ({ children }) => {

  const icoContractSigner = getEthereumContractSigner();
  const icoContractProvider = getEtherumContractProvider();

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

      const transactionHash = await icoContractSigner.invest({
        value: ethers.utils.parseEther(amount)._hex
      });

      await transactionHash.wait();

      const userInvested = await icoContractSigner.investors(connectedAccount);
      setInvestor(userInvested);

      await getContractBalance();

      setIsLoading(false);
      

    } catch (error) {

      throw new Error("No ethereum object");
    }
  }

  const getContractBalance = async () => {
    setContractBalance(await icoContractProvider.amount());
  }

  const getIcoPrice = async () => {
    setContractPrice(await icoContractProvider.price());
  }

  const getMaxAlloaction = async () => {
    setContractMaxAllocation(await icoContractProvider.maxAllocation());
  }

  const getMaxInvestment = async () => {
    setContractMaxInvestment(await icoContractProvider.maxInvestment());
  }

  const getInvestor = async () => {
    setInvestor(await icoContractProvider.investors(connectedAccount));
  }

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
      errorMsg,
      getInvestor,

    }}>
      {children}
    </IcoContext.Provider>
  )
}