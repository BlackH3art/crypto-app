import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import mockData from '../../utils/mockData';

import TransactionCard from './TransactionCard';


const Transactions = () => {

  const { connectedAccount, transactions } = useContext(TransactionContext)

  return (
    <>
      <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
        <div className="flex flex-col md:p-12 py-12 px-4">
          {connectedAccount ? (
            <h3 className="text-white text-3xl text-center my-2"> Latest transactions </h3>
          ) : (
            <h3 className="text-white text-3xl text-center my-2"> Connect your wallet to see latest transactions </h3>
          )}

          <div className="flex flex-wrap justify0center items-center mt-10">
            {transactions.reverse().map((item, i) => (
              <TransactionCard 
                key={i}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Transactions;