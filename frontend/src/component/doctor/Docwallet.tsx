import React, { useEffect, useState } from 'react';
import DoctorSidebar from './Docsidebar';
import { toast, Toaster } from 'react-hot-toast';
import { walletInformation } from '../../api/doctorapi/wallet';

function Docwallet() {
  const [walletData, setWalletData] = useState<any>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await walletInformation();
        setWalletData(response);
      } catch (error) {
        console.error('Error fetching wallet:', error);
        toast.error('Failed to load wallet info');
      }
    };

    fetchWallet();
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden font-sans">
      <DoctorSidebar />
      <Toaster />
      <div className="ml-52 flex-1 bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-4">Wallet Information</h2>

        {walletData ? (
          <div>
            <p className="text-lg mb-2"><strong>Balance:</strong> ₹{walletData.balance}</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Transactions</h3>

            {walletData.transactions.length === 0 ? (
              <p className="text-gray-500">No transactions available.</p>
            ) : (
              <div className="overflow-auto max-h-[60vh] border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                        Appointment ID
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {walletData.transactions.map((txn: any) => (
                      <tr key={txn._id}>
                        <td className="px-6 py-4 text-gray-800">{txn.type}</td>
                        <td className="px-6 py-4 text-gray-800">₹ {txn.amount}</td>
                        <td className="px-6 py-4 text-gray-800">{txn.appointmentId}</td>
                        <td className="px-6 py-4 text-gray-800">
                          {new Date(txn.date).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Loading wallet details...</p>
        )}
      </div>
    </div>
  );
}

export default Docwallet;
