import { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Toaster } from 'react-hot-toast'
import {
  walletInformation,
  payoutrequst,
  pyoutpayment,
} from '../../../api/adminapi/wallet'
import { getsingleuser } from '../../../api/adminapi/user'
import { getsingleDoctor } from '../../../api/adminapi/doctor'
import Swal from 'sweetalert2'

function Awallet() {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [user, setUser] = useState([])
  const [doctor, setDoctor] = useState([])
  const [message, setMessage] = useState('')
  const [payout, setPayout] = useState([])
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [render, setRender] = useState(false)
  const [total, setTotal] = useState(0)
  const [currentpage, setCurrentpage] = useState(1)
  const limit = 3

  useEffect(() => {
    const getWallet = async () => {
      try {
        const wallet = await walletInformation(currentpage, limit)
        if (wallet === 'no wallet available') {
          setMessage(wallet)
        } else {
          setBalance(wallet.balance)
          setTransactions(wallet.transaction)
          setTotal(wallet.total)
        }
      } catch (error) {
        console.error('Failed to fetch wallet info:', error)
      }
    }
    getWallet()
  }, [render, currentpage])

  useEffect(() => {
    const getpayout = async () => {
      try {
        const wallet = await payoutrequst()
        setPayout(wallet)
      } catch (error) {
        console.error('Failed to fetch payout info:', error)
      }
    }
    getpayout()
  }, [render])

  const userHandele = async (userid: string) => {
    const result = await getsingleuser(userid)
    setUser(result)
    setModal(true)
  }

  const doctorHandle = async (doctorid: string) => {
    const result = await getsingleDoctor(doctorid)
    setDoctor(result)
    setModal2(true)
  }

  const handlePay = async (transId: string, doctorid: string) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to proceed with this payout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Pay Now!',
    })

    if (confirmation.isConfirmed) {
      try {
        await pyoutpayment(transId, doctorid)
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          text: 'The amount has been paid successfully.',
        })
        setRender(!render)
      } catch (error) {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Something went wrong while processing the payment.',
        })
      }
    }
  }

  const handleClose = () => setModal(false)
  const handleCloseDoc = () => setModal2(false)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Toaster position="top-center" toastOptions={{ style: { fontSize: '14px', padding: '10px 20px', maxWidth: '400px' } }} />

      {/* User Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl relative w-96 shadow-lg">
            <button className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-black" onClick={handleClose}>
              &times;
            </button>
            <h2 className="text-xl text-center font-semibold mb-4">User Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Name:</span> {user.firstname} {user.lastname}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Number:</span> {user.phone}</p>
              <p><span className="font-medium">Gender:</span> {user.gender}</p>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Modal */}
      {modal2 && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl relative w-96 shadow-lg">
            <button className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-black" onClick={handleCloseDoc}>
              &times;
            </button>
            <h2 className="text-xl text-center font-semibold mb-4">Doctor Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Name:</span> Dr. {doctor.firstname} {doctor.lastname}</p>
              <p><span className="font-medium">Email:</span> {doctor.email}</p>
              <p><span className="font-medium">Specialisation:</span> {doctor.specialisation?.deptname}</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-1/6 bg-white shadow">
        <Sidebar />
      </div>

      <div className="w-5/6 p-6 flex flex-col gap-6 overflow-y-auto">
        {message && <div>No Transaction occurred through your account</div>}

        <h2 className="text-2xl font-bold text-gray-800">Wallet Overview</h2>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-lg text-gray-500">Current Balance</p>
          <h1 className="text-4xl font-bold text-green-600">₹ {balance < 0 ? 0 : balance}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Recent Transactions</h3>

          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions found.</p>
          ) : (
            <div className="overflow-auto max-h-[60vh] rounded-lg border">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">From</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">To</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((txn, index) => (
                    <tr key={txn._id || index}>
                      <td className="px-6 py-4 text-gray-800">{txn._id}</td>
                      <td className="px-6 py-4 text-gray-800">
                        {txn.from === 'platform' ? 'Platform' : (
                          <button className="text-blue-600 hover:underline" onClick={() => userHandele(txn.from)}>
                            View user
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {txn.toModel === 'Platform' ? 'Platform' :
                          txn.toModel === 'User' ? (
                            <button className="text-blue-600 hover:underline" onClick={() => userHandele(txn.to)}>
                              View user
                            </button>
                          ) : (
                            <button className="text-blue-600 hover:underline" onClick={() => doctorHandle(txn.to)}>
                              View doctor
                            </button>
                          )}
                      </td>
                      <td className="px-6 py-4 text-gray-800">₹ {txn.amount}</td>
                      <td className="px-6 py-4 text-gray-800 capitalize">{txn.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {total > limit && (
                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    onClick={() => setCurrentpage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentpage === 1}
                    className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentpage(i + 1)}
                      className={`px-4 py-2 text-sm rounded ${currentpage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentpage((prev) => Math.min(prev + 1, Math.ceil(total / limit)))}
                    disabled={currentpage === Math.ceil(total / limit)}
                    className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Payout Requests */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4 text-center">
          <h3 className="text-xl font-semibold">Payout Requests</h3>
          {payout.length === 0 ? (
            <p className="text-gray-500">No new payout requests.</p>
          ) : (
            <div className="overflow-auto max-h-[40vh] rounded-lg border">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">To</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payout.map((r) => (
                    <tr key={r?._id}>
                      <td className="px-6 py-4 text-left text-gray-800">₹ {r.amount - 20}</td>
                      <td className="px-6 py-4 text-left text-gray-800">
                        <button className="text-blue-600 hover:underline" onClick={() => doctorHandle(r.doctorId)}>
                          View doctor
                        </button>
                      </td>
                      <td className="px-6 py-4 text-left">
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handlePay(r._id, r.doctorId)}>
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
