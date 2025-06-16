import { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import { getwallet } from '../../api/userapi/wallet';
import Navbar from './Navbar';
import Pagination from '../../component/common/Pgination';

function Wallet() {
  const [walletData, setWalletData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await getwallet(currentPage, itemsPerPage);
        if (response === 'No wallet available') {
          setMessage('No wallet transaction occurred');
          return;
        }

        setWalletData(response.transactions);
        setBalance(response.balance);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchWallet();
  }, [currentPage]);

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="bg-gray-100 p-4">
        <UserSidebar />
      </div>

      <div className="flex-1 p-24 bg-teal-50 ml-52">
        {message ? (
          <div className="text-center text-3xl">{message}</div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Wallet</h1>
            <p><strong>Balance:</strong> ₹{balance}</p>

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
                    <td className="border px-4 py-2">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="border px-4 py-2 capitalize">{tx.type}</td>
                    <td className="border px-4 py-2">₹{tx.amount}</td>
                    <td className="border px-4 py-2">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wallet;
