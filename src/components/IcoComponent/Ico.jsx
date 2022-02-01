import { useState, useContext } from 'react';

// components
import Loading from '../Loading/Loading';
import Input from '../Welcome/Input';

//context
import { TransactionContext } from '../../context/TransactionContext';

const Ico = () => {

  const { connectWallet, connectedAccount, formData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext);


  const handleSubmit = () => {

  }

  // const handleChange = () => {

  // }

  const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';
  
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

            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} maximum={"0.1"}/>

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {isLoading ? (
                <Loading />
              ) : (
                <button type="button" onClick={handleSubmit} className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'>
                  Invest
                </button>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Ico;