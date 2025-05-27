import { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Toaster } from 'react-hot-toast'
import { walletInformation } from '../../../api/adminapi/wallet'
import Pagination from '../../../component/common/Pgination'

function Awallet() {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  useEffect(() => {
    const getWallet = async () => {
      try {
        const wallet = await walletInformation()
        if (wallet && wallet.length > 0) {
          setBalance(wallet[0].balance)
          setTransactions(wallet[0].transactions)
        }
      } catch (error) {
        console.error('Failed to fetch wallet info:', error)
      }
    }
    getWallet()
  }, [])

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  // Get current page transactions
  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle page change
  const handlePageChange = (page: number) => {
    // Ensure page is within bounds
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { fontSize: '14px', padding: '10px 20px', maxWidth: '400px' },
        }}
      />
      <div className="w-1/6 bg-white shadow">
        <Sidebar />
      </div>

      <div className="w-5/6 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Overview</h2>

        {/* Balance Display */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <p className="text-lg text-gray-500">Current Balance</p>
          <h1 className="text-4xl font-bold text-green-600">₹ {balance}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>

          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions found.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentTransactions.map((txn, index) => (
                      <tr key={txn._id || index}>
                        <td className="px-6 py-4 text-sm text-gray-800">{txn._id}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{txn.from_user_id.firstname}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{txn.to_doctor_id.firstname}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{txn.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{txn.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Component */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Awallet
