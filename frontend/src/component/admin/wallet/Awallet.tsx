import { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Toaster } from 'react-hot-toast'
import { walletInformation, refundInformation, payoutrequst,pyoutpayment,handlerefundforuser } from '../../../api/adminapi/wallet'
import {getsingleuser} from '../../../api/adminapi/user'
import{getsingleDoctor}  from '../../../api/adminapi/doctor'
import Pagination from '../../../component/common/Pgination'
import Swal from 'sweetalert2';

function Awallet() {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [user,setUser]=useState([])
   const [doctor,setDoctor]=useState([])
  const [refund, setRefund] = useState([])
  const[message,setMessage]=useState('')
  const [payout,setPayout]=useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [modal,setModal]=useState(false)
   const [modal2,setModal2]=useState(false)
  const[render,setRender]=useState(false)
  const [rmessagae,setRmessage]=useState('')
  const itemsPerPage = 4

  useEffect(() => {
    const getWallet = async () => {
      try {
        const wallet = await walletInformation()
        console.log(wallet.transactions)
        if(wallet==='no wallet available')
        {
          setMessage(wallet)
        }
        else if(wallet && wallet.length > 0) {
          setBalance(wallet[0].balance)
          setTransactions(wallet[0].transactions)
        }
      } catch (error) {
        console.error('Failed to fetch wallet info:', error)
      }
    }
    getWallet()
  }, [render])

  useEffect(() => {
    const getrefund = async () => {
      try {
        const wallet = await refundInformation()
        if(wallet==='No wallet found')
        {
          setRmessage(wallet)
        }
        else{
        setRefund(wallet)
        }
      } catch (error) {
        console.error('Failed to fetch refund info:', error)
      }
    }
    getrefund()
  }, [render])

    useEffect(() => {
    const getpayout = async () => {
      try {
        const wallet = await payoutrequst()
        setPayout(wallet)
      } catch (error) {
        console.error('Failed to fetch refund info:', error)
      }
    }
    getpayout()
  }, [render])

  const userHandele=async(userid:string)=>{
   const result=await getsingleuser(userid)
   setUser(result)
   setModal(true)
  }
  const doctorHandle=async(doctorid:string)=>{
      const result=await getsingleDoctor(doctorid)
      setDoctor(result)
      setModal2(true)
  }
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  // Example handler for Pay button - replace with your actual logic
 const handlePay = async (transId: string, doctorid: string) => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to proceed with this payout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Pay Now!',
  });

  if (confirmation.isConfirmed) {
    try {
      const result = await pyoutpayment(transId, doctorid);

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'The amount has been paid successfully.',
      });
      setRender(!render)
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: 'Something went wrong while processing the payment.',
      });
    }
  }
};

  const handlerefund = async (r: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to proceed with the refund?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#10b981', // green
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, refund it!',
  });

  if (result.isConfirmed) {
    try {
      const response = await handlerefundforuser(r);
      Swal.fire('Refunded!', 'The amount has been refunded successfully.', 'success');
      setRender(!render)
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Refund process failed. Try again.', 'error');
    }
  }
};
  const handleClose=()=>{
    setModal(false)
  }
  const handleCloseDoc=()=>{
     setModal2(false)
  }
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { fontSize: '14px', padding: '10px 20px', maxWidth: '400px' },
        }}
      />

    {modal&&(
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl relative w-96 shadow-lg">
    {/* Close Button */}
    <button
      className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-black"
      onClick={handleClose} // Replace with your close handler
    >
      &times;
    </button>

    {/* Modal Content */}
    <h2 className="text-xl text-center font-semibold mb-4">User detils</h2>
      <div className="space-y-2 text-gray-700">
        <p><span className="font-medium">Name:</span> {user.firstname} {user.lastname}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Number:</span> {user.phone}</p>
        <p><span className="font-medium">Gender:</span> {user.gender}</p>
      </div>
   </div>
    </div>
    )}

    {modal2&&(
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl relative w-96 shadow-lg">
    {/* Close Button */}
    <button
      className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-black"
      onClick={handleCloseDoc} // Replace with your close handler
    >
      &times;
    </button>

    {/* Modal Content */}
    <h2 className="text-xl text-center font-semibold mb-4">Doctor detils</h2>
      <div className="space-y-2 text-gray-700">
        <p><span className="font-medium">Name:</span>DR: {doctor.firstname} {doctor.lastname}</p>
        <p><span className="font-medium">Email:</span> {doctor.email}</p>
        <p><span className="font-medium">Number:</span> {doctor.phone}</p>
         <p><span className="font-medium">Specilisation:</span> {doctor.specialisation.deptname}</p>
      </div>
   </div>
    </div>
    )}

      <div className="w-1/6 bg-white shadow">
        <Sidebar />
      </div>

      <div className="w-5/6 p-6 flex flex-col gap-6 overflow-y-auto">
         {message&&(
          <div>No Transaction occured through your account</div>
         )}
        <h2 className="text-2xl font-bold text-gray-800">Wallet Overview</h2>

        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-lg text-gray-500">Current Balance</p>
          {balance<0? <h1 className="text-4xl font-bold text-green-600">₹ 0</h1>:
          <h1 className="text-4xl font-bold text-green-600">₹ {balance}</h1>
          }
          
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Recent Transactions</h3>

          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions found.</p>
          ) : (
            <>
              <div className="overflow-auto max-h-[60vh] rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                        Transaction ID
                      </th>
                       <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                        from
                      </th>
                     <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                        to
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentTransactions.map((txn, index) => (
                      <tr key={txn._id || index}>
                        <td className="px-6 py-4 text-gray-800">{txn._id}</td>
                        <td className="px-6 py-4 text-gray-800">
                          {txn.from === 'platform' ? (
                            'Platform'
                          ) : (
                            <button className="text-blue-600 hover:underline" onClick={()=>userHandele(txn.from)}>
                              View details of user
                            </button>
                          )}
                        </td>
                         <td className="px-6 py-4 text-gray-800">
                        {txn.toModel === 'Platform' ? (
                          'Platform'
                        ) : txn.toModel === 'User' ? (
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => userHandele(txn.to)}
                          >
                            View details of user
                          </button>
                        ) : (
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => doctorHandle(txn.to)}
                          >
                            View details of doctor
                          </button>
                        )}
                      </td>

                        <td className="px-6 py-4 text-gray-800">₹ {txn.amount}</td>
                        <td className="px-6 py-4 text-gray-800 capitalize">{txn.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>

        {/* Refund Requests Section */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4 text-center">
          <h3 className="text-xl font-semibold">Refund Requests</h3>
          {rmessagae?(<div>No new refund requests.</div>):
          (<div>
                {refund.length === 0 ? (
                <p className="text-gray-500">No new refund requests.</p>
              ) : (
                <div className="overflow-auto max-h-[40vh] rounded-lg border">
                  <table className="w-full table-auto divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">To</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {refund.map((r) => (
                        <tr key={r?._id}>
                          <td className="px-4 py-3 text-gray-800 text-left">₹ {r.amount}</td>
                          <td className="px-4 py-3 text-gray-800 text-left">
                            {r.from ? (
                              <button className="text-blue-600 hover:underline text-left" onClick={()=>userHandele(r.from)}>
                                View details of user
                              </button>
                            ) : (
                              'Unknown'
                            )}
                          </td>
                          <td className="px-4 py-3 text-left">
                            <button
                              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                              onClick={() => handlerefund(r._id)}
                            >
                              Pay Amount
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>)}
         
        </div>


         <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4 text-center">
          <h3 className="text-xl font-semibold">Payout Requests</h3>

          {payout.length === 0 ? (
            <p className="text-gray-500">No new payout requests.</p>
          ) : (
            <div className="overflow-auto max-h-[40vh] rounded-lg border">
                <table className="min-w-full table-fixed divide-y divide-gray-200 text-sm">
  <thead className="bg-gray-100 sticky top-0 z-10">
    <tr>
      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
        Amount
      </th>
      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
        To
      </th>
      <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">
        Action
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {payout.map((r) => (
      <tr key={r?._id}>
        <td className="px-6 py-4 text-left text-gray-800 whitespace-nowrap">
          ₹ {r.amount - 20}
        </td>
        <td className="px-6 py-4 text-left text-gray-800 whitespace-nowrap">
          {r.from ? (
            <button className="text-blue-600 hover:underline">
              View details of doctor
            </button>
          ) : (
            'Unknown'
          )}
        </td>
        <td className="px-6 py-4 text-left whitespace-nowrap">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => handlePay(r._id, r.doctorId)}
          >
            Pay Amount
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
            </div>
          )}
        </div>



      </div>
    </div>
  )
}

export default Awallet

