import { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import { getwallet } from '../../api/userapi/wallet';
import Navbar from '../common/Navbar';
import Pagination from "../../component/common/Pgination";
import Table from '../../component/common/Table';
import type { Transaction } from '../../Interface/interface';

function Wallet() {
  const [walletData, setWalletData] = useState<Transaction[]>([]);
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
          setWalletData([]);
          return;
        }
        setWalletData(response.transactions || []);
        setBalance(response.balance || 0);
        setTotalPages(response.totalPages || 1);
        setMessage('');
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setMessage('Something went wrong while fetching data');
      }
    };

    fetchWallet();
  }, [currentPage]);


  const columns = [
    {
      header: 'Type',
      accessor: (tx: Transaction) => (
        <span className="capitalize">{tx.type}</span>
      ),
    },
    {
      header: 'Amount',
      accessor: (tx: Transaction) => <>₹{tx.amount}</>,
    },
    {
      header: 'Date',
      accessor: (tx: Transaction) =>
        new Date(tx.date).toLocaleDateString(),
    },
  ];

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
            <p>
              <strong>Balance:</strong> ₹{balance}
            </p>
            <h2 className="text-xl font-semibold mt-4">Transactions:</h2>

            <Table
              columns={columns}
              data={walletData}
              getRowClassName={() => ''}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalPages / itemsPerPage )}
              onPageChange={(page) => setCurrentPage(page)}
            />

            <p className="text-sm text-center mt-2 text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wallet;
