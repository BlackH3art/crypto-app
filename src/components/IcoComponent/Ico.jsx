import { useState, useContext, useEffect } from 'react';

// components
import Loading from '../Loading/Loading';
import Input from '../Welcome/Input';

//context
import { TransactionContext } from '../../context/TransactionContext';
import { IcoContext } from '../../context/IcoContext';
import { ethers } from 'ethers';

const Ico = () => {

  const { connectWallet, connectedAccount } = useContext(TransactionContext);
  const { 
    handleChange, 
    amountToInvest, 
    invest, 
    contractBalance, 
    contractPrice, 
    contractMaxAllocation, 
    contractMaxInvestment, 
    investor, 
    errorMsg, 
    isLoading,
    getInvestor,
  } = useContext(IcoContext);
  const [investorLoading, setInvestorLoading] = useState(true);

  const connectedAccountIsInvestor = investor[0]?.toLowerCase() !== connectedAccount?.toLowerCase();

  useEffect(() => {
    getInvestor();
    setTimeout(() => {
      setInvestorLoading(false);
    }, 1000);
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount } = amountToInvest;
    
    if(!amount) return;
    if(!connectedAccount) return;
    if(!connectedAccountIsInvestor) return;

    invest();
  }


  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
          <div className="flex flex-1 justify-start flex-col mf:mr-10">
            
            <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
              Public sale <br /> of KYT token
            </h1>

            <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
              Participate in the hottest public sale this coming crypto winter!
            </p>

            {!connectedAccount && (<button 
              type='button' 
              onClick={connectWallet}
              className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'
            >
              <p className='text-white text-base font-semibold'>
                Connect wallet
              </p>
            </button>)}

          </div>

          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>

            <div className="p-5 text-white font-light sm:w-96 w-full flex flex-col justify-start blue-glassmorphism">
              <p className='text-white text-base font-semibold'>
                Details:
              </p>
              <br />
              <table className="table-fixed">
                <tbody>
                  <tr>
                    <td>Total supply:</td>
                    <td>1.000.000 KYT</td>
                  </tr>
                  <tr>
                    <td>Supply on sale:</td>
                    <td>1.000.000 KYT</td>
                  </tr>
                  <tr>
                    <td>Available amount:</td>
                    <td>{contractBalance ? `${ethers.utils.formatEther(contractBalance)} KYT` : <Loading small/>}</td>
                  </tr>
                  <tr>
                    <td>Max allocation:</td>
                    <td>{contractMaxAllocation ? `${ethers.utils.formatEther(contractMaxAllocation)} KYT` : <Loading small/>} </td>
                  </tr>
                  <tr>
                    <td>Max investment:</td>
                    <td>{contractMaxInvestment ? `${ethers.utils.formatEther(contractMaxInvestment)} ETH` : <Loading small/>}</td>
                  </tr>
                  <tr>
                    <td>Public sale price:</td>
                    <td>{contractPrice ? `${ethers.utils.formatEther(contractPrice)} ETH` : <Loading small/>} </td>
                  </tr>
                </tbody>
              </table>

            </div>
            
            {investorLoading ? (
              <Loading />
            ) : (
              connectedAccountIsInvestor ? (
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
  
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <>
                      {errorMsg && (
                        <p className='text-left text-red-600 w-full text-sm'>
                          {errorMsg}
                        </p>
                      )}
                      <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} maximum={"0.1"}/>
        
                      <div className="h-[1px] w-full bg-gray-400 my-2" />
                    
                      <button type="button" onClick={handleSubmit} className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'>
                        Invest
                      </button>
                    </>
                  )}
  
                </div>
              ) : (
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
  
                  <p className='text-white text-base font-semibold text-md'>
                      Congratulations!
                  </p>
                  <p className='text-white text-sm'>
                    You successfully participated in ICO!
                  </p>

                  <div className="h-[1px] w-full bg-gray-400 my-2 mt-3 mb-5" />

                  <h1 className='text-white text-xl'>
                    Your allocation is:
                  </h1>
                  <h1 className='text-white text-xl'>
                    {ethers.utils.formatEther(investor.EXMAllocation)} KYT
                  </h1>

                  <br />
                  
                  <p className='text-white text-sm align-left w-full'>
                    Import token into your wallet to see your balance:
                  </p>

                  <p className='text-white text-sm p-5'>
                    0xb3034b773d0f6a37ec2e3b189cd564d2359f1111
                  </p>


  
                </div>
              )
            )}
            
          </div>

        </div>
      </div>
    </>
  )
}

export default Ico;