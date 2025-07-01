import { useEffect, useState, useRef, useCallback } from 'react'
import DoctorSidebar from './Docsidebar'
import { getOverviewofappoinment } from '../../api/doctorapi/appoinment'
import { FaCheckCircle, FaClock, FaTimesCircle, FaClipboardList } from 'react-icons/fa'
import DashboardBarChart from './Bar'
import type { AppointmentCountByDate } from '../../Interface/interface'
import html2pdf from 'html2pdf.js'

function Dashboard() {
  const [count, setCount] = useState({
    completed: 0,
    pending: 0,
    cancelled: 0,
    total: 0,
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [appointmentCountfordash, setAppointmentCountfordash] = useState<AppointmentCountByDate[]>([])
  const [type, setType] = useState<'completed' | 'cancelled' | 'pending'>('completed')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOverviewofappoinment()
      setCount(result)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const today = new Date()
    const lastWeek = new Date()
    lastWeek.setDate(today.getDate() - 6)
    const startStr = lastWeek.toISOString().split('T')[0]
    const endStr = today.toISOString().split('T')[0]
    setStartDate(startStr)
    setEndDate(endStr)
  }, [])

  const memoizedSetAppointmentCountfordash = useCallback((data: AppointmentCountByDate[]) => {
    setAppointmentCountfordash(data)
  }, [])

  const memoizedSetType = useCallback((value: 'completed' | 'cancelled' | 'pending') => {
    setType(value)
  }, [])

  const memoizedSetStartDate = useCallback((date: string) => {
    setStartDate(date)
  }, [])

  const memoizedSetEndDate = useCallback((date: string) => {
    setEndDate(date)
  }, [])

  const handleDownloadPDF = () => {
    if (contentRef.current) {
      const opt = {
        margin: 0.3,
        filename: `dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }
      html2pdf().set(opt).from(contentRef.current).save()
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-emerald-50 to-cyan-100">
      <DoctorSidebar />
      <div className="ml-64 flex-1 p-10">

        {/* Header with Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-emerald-700">📊 Appointment Overview</h2>
          <button
            onClick={handleDownloadPDF}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow-md transition"
          >
            Download PDF
          </button>
        </div>

        {/* Hidden PDF content */}
        <div className="hidden">
          <div ref={contentRef} className="p-6 text-sm font-sans bg-white">
            <h2 className="text-2xl font-bold text-center mb-4 text-emerald-700">Dashboard Detail</h2>
            <div className="mb-4">
              <p><strong>Total Appointments:</strong> {count.total}</p>
              <p><strong>Completed:</strong> {count.completed}</p>
              <p><strong>Pending:</strong> {count.pending}</p>
              <p><strong>Cancelled:</strong> {count.cancelled}</p>
            </div>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-emerald-600">
              {type} Appointment from {startDate} to {endDate}
            </h3>
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-2 py-1 bg-gray-100 text-left">Date</th>
                  <th className="border border-gray-400 px-2 py-1 bg-gray-100 text-left">Count</th>
                </tr>
              </thead>
              <tbody>
                {appointmentCountfordash.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="border px-2 py-1 text-center">No data available</td>
                  </tr>
                ) : (
                  appointmentCountfordash.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1">{item._id}</td>
                      <td className="border px-2 py-1">{item.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 border-l-4 border-emerald-500">
            <FaClipboardList className="text-2xl text-emerald-500" />
            <div>
              <p className="text-gray-600 text-sm">Total Appointments</p>
              <p className="text-xl font-bold text-emerald-700">{count.total}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 border-l-4 border-blue-500">
            <FaCheckCircle className="text-2xl text-blue-500" />
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-xl font-bold text-blue-700">{count.completed}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 border-l-4 border-yellow-500">
            <FaClock className="text-2xl text-yellow-500" />
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-xl font-bold text-yellow-700">{count.pending}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 border-l-4 border-red-500">
            <FaTimesCircle className="text-2xl text-red-500" />
            <div>
              <p className="text-gray-600 text-sm">Cancelled</p>
              <p className="text-xl font-bold text-red-700">{count.cancelled}</p>
            </div>
          </div>
        </div>

        {/* Chart & Table */}
        <div className="mb-8">
          <DashboardBarChart
            setAppointmentCountfordash={memoizedSetAppointmentCountfordash}
            setType={memoizedSetType}
            startdate={memoizedSetStartDate}
            enddate={memoizedSetEndDate}
          />
        </div>

        {/* Table Section */}
        {appointmentCountfordash.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-emerald-700">
              {type} Appointment from {startDate} to {endDate}
            </h3>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">Date</th>
                  <th className="border px-3 py-2 text-left">Count</th>
                </tr>
              </thead>
              <tbody>
                {appointmentCountfordash.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-3 py-1">{item._id}</td>
                    <td className="border px-3 py-1">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
