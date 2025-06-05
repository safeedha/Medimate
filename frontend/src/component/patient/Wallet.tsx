import React, { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import { getwallet } from '../../api/userapi/wallet';
import Navbar from './Navbar';

function Wallet() {
  const [walletData, setWalletData] = useState([]);
  const [balence,setBalence]=useState(0)
  const [message,setMessage]=useState('')

 useEffect(() => {
  const fetchWallet = async () => {
    try {
      const response = await getwallet();
      if (response === 'no wallet available') {
        setMessage('No wallet available');
        return;
      }

      // ✅ Use response.data directly if it's an object
      setWalletData(response.transactions); 
      setBalence(response.balance);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  };

  fetchWallet();
}, []);

  return (
    <div className="flex min-h-screen">
      <Navbar/>
      <div className="bg-gray-100 p-4">
        <UserSidebar />
      </div>

      <div className="flex-1 p-24 bg-teal-50 ml-52">
        {message?(<div className='text-center text-3xl'>No wallet transaction occured</div>):(
          <div>
        <h1 className="text-2xl font-bold mb-4">Wallet</h1>

        {walletData ? (
          <div>
            <p><strong>Balance:</strong> ₹{balence}</p>
            
            <h2 className="text-xl font-semibold mt-4">Transactions:</h2>
            
            <table className="min-w-full mt-2 border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left">#</th>
                  <th className="border px-4 py-2 text-left">Type</th>
                  <th className="border px-4 py-2 text-left">Amount</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {walletData.map((tx: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 capitalize">{tx.type}</td>
                    <td className="border px-4 py-2">₹{tx.amount}</td>
                    <td className="border px-4 py-2">{new Date(tx.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading wallet data...</p>
        )}
      </div>
       )}
      </div>
   
    </div>
  );
}

export default Wallet;
