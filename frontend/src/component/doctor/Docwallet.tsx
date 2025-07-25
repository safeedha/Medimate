import { useEffect, useState } from 'react';
import DoctorSidebar from '../common/Docsidebar';
import { toast, Toaster } from 'react-hot-toast';
import { walletInformation } from '../../api/doctorapi/wallet';
import { getsingleappoinment } from '../../api/doctorapi/appoinment';
import Table from '../../component/common/Table';
import type { Appointment, Transaction } from '../../Interface/interface';

function Docwallet() {
  const [walletData, setWalletData] = useState<Transaction[]>([]);
  const [appoinment, setAppoinment] = useState<Appointment>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [message, setMessage] = useState('');
  const limit = 4;

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await walletInformation(currentpage, limit);
        if (response === 'No matching wallet or transactions found') {
          setMessage(response);
        } else {
          setBalance(response.balance);
          setWalletData(response.transaction);
          setTotal(response.total);
          setMessage('');
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
        toast.error('Failed to load wallet info');
      }
    };
    fetchWallet();
  }, [currentpage]);

  const getAppoinmentInformation = async (id: string) => {
    try {
      const result = await getsingleappoinment(id);
      setAppoinment(result);
      setIsModalOpen(true);
    } catch (error) {
      toast.error('Failed to load appointment details');
      console.error(error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentpage(page);
    }
  };

  // --- Table columns for wallet info ---
  const columns = [
    {
      header: "Type",
      accessor: (txn: Transaction) => (
        <span className="capitalize">{txn.type}</span>
      ),
    },
    {
      header: "Amount",
      accessor: (txn: Transaction) => <>₹ {txn.amount}</>,
    },
    {
      header: "Appointment ID",
      accessor: (txn: Transaction) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => getAppoinmentInformation(txn.appointmentId as string)}
        >
          {txn.appointmentId as string}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: (txn: Transaction) => (
        <span>{new Date(txn.date).toLocaleString()}</span>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen overflow-hidden font-sans">
      <DoctorSidebar />
      <Toaster />
      <div className="ml-52 flex-1 bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-4">Wallet Information</h2>
        <p className="text-lg mb-2">
          <strong>Balance:</strong> ₹{balance}
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Transactions</h3>
        {message ? (
          <p className="text-red-500">Currently there is no transaction occurred</p>
        ) : (walletData && walletData.length === 0) ? (
          <p className="text-gray-500">No transactions available.</p>
        ) : (
          <>
            <div className="overflow-auto max-h-[60vh] border rounded-lg">
              <Table
                columns={columns}
                data={walletData}
                getRowClassName={() => ''}
              />
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => handlePageChange(currentpage - 1)}
                disabled={currentpage === 1}
                className={`px-3 py-1 rounded ${currentpage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${currentpage === index + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentpage + 1)}
                disabled={currentpage === totalPages}
                className={`px-3 py-1 rounded ${currentpage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Modal for Appointment Details */}
        {isModalOpen && appoinment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">Appointment Details</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Patient Name:</strong> {appoinment.patient_name}</p>
                <p><strong>Email:</strong> {appoinment.patient_email}</p>
                <p><strong>Age:</strong> {appoinment.patient_age}</p>
                <p><strong>Gender:</strong> {appoinment.patient_gender}</p>
                <p><strong>Reason:</strong> {appoinment.reason}</p>
                {typeof appoinment.schedule_id === 'object' && (
                  <>
                    <p><strong>Starting time:</strong> {appoinment.schedule_id.startingTime}</p>
                    <p><strong>End time:</strong> {appoinment.schedule_id.endTime}</p>
                  </>
                )}
                <p><strong>Status:</strong> {appoinment.status}</p>
                <p><strong>Payment:</strong> {appoinment.payment_status}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Docwallet;
