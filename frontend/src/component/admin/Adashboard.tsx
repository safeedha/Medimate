import { useEffect, useRef, useState } from 'react'
import html2pdf from 'html2pdf.js'
import Sidebar from './Sidebar'
import DashboardBarChart from './graph/Bar'
import DoctorPieCharts from './graph/Pie'
import { getAllDoctor } from '../../api/adminapi/doctor'
import { getAlluser } from '../../api/adminapi/user'
import { gettotalappoinment,departmentsummary } from '../../api/adminapi/appoinment'
import { FaUserMd, FaUsers } from 'react-icons/fa'
import { MdEventNote } from 'react-icons/md'
import type { AppointmentCountByDate,deptSummary } from '../../Interface/interface'

function Adashboard() {
  const reportRef = useRef<HTMLDivElement>(null)
  const [type, setType] = useState<'completed' | 'cancelled' | 'pending'>('completed')
  const [totaldoc, setTotaldoc] = useState(0)
  const [totaluser, setTotalUsers] = useState(0)
  const [overview, setOverview] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  })
  const [appointmentCountfordash, setAppointmentCountfordash] = useState<AppointmentCountByDate[]>([])
  const [doctorDatafordash, setDoctorDatafordash] = useState<Record<string, string>>({})
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [departmentSummary, setDepartmentSummary] = useState<deptSummary[]>([])

  useEffect(()=>{
   const getDepartmentsummary=async()=>{
     const response=await departmentsummary()
     setDepartmentSummary(response)
   }
   getDepartmentsummary()
  },[])

  useEffect(() => {
    const today = new Date()
    const lastWeek = new Date()
    lastWeek.setDate(today.getDate() - 6)
    const startStr = lastWeek.toISOString().split('T')[0]
    const endStr = today.toISOString().split('T')[0]
    setStartDate(startStr)
    setEndDate(endStr)
  }, [])

  const handleDownloadPDF = () => {
    if (!reportRef.current) return
    const opt = {
      margin: 0.5,
      filename: 'dashboard_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }
    html2pdf().set(opt).from(reportRef.current).save()
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctor(0, 0, '')
        setTotaldoc(response.total)
      } catch (error) {
        console.error('Failed to fetch doctors:', error)
      }
    }
    fetchDoctors()
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAlluser(0, 0, '')
        setTotalUsers(response?.total || 0)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await gettotalappoinment()
        setOverview(response)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }
    fetchAppointments()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50 text-sm">
      <div className="w-1/6 border-r bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-indigo-700">Admin Dashboard</h2>
          <button
            onClick={handleDownloadPDF}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow-md transition"
          >
            Download PDF
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <FaUserMd className="text-blue-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Doctors</p>
                <p className="text-lg font-semibold text-blue-800">{totaldoc}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <FaUsers className="text-green-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Users</p>
                <p className="text-lg font-semibold text-green-800">{totaluser}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-start gap-3">
              <MdEventNote className="text-purple-600 text-2xl mt-1" />
              <div className="space-y-1">
                <p className="text-sm text-gray-500 font-semibold">Appointments</p>
                <p><span className="font-medium text-gray-700">Total:</span> {overview.total}</p>
                <p><span className="font-medium text-yellow-600">Pending:</span> {overview.pending}</p>
                <p><span className="font-medium text-green-600">Completed:</span> {overview.completed}</p>
                <p><span className="font-medium text-red-600">Cancelled:</span> {overview.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DashboardBarChart
            setAppointmentCountfordash={setAppointmentCountfordash}
            setType={setType}
            startdate={setStartDate}
            enddate={setEndDate}
          />
          <DoctorPieCharts
            setDoctorDatafordash={setDoctorDatafordash}
            status={type}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Doctor-wise Total {type} Appointments
            </h3>
            {Object.keys(doctorDatafordash).length > 0 ? (
              <table className="w-full table-auto border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2 text-left">Doctor Name</th>
                    <th className="border px-3 py-2 text-left">{type} Appointments</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(doctorDatafordash).map(([name, count], index) => (
                    <tr key={index}>
                      <td className="border px-3 py-1">{name}</td>
                      <td className="border px-3 py-1">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {type} Appointments from {startDate} to {endDate}
            </h3>
            {appointmentCountfordash.length > 0 ? (
              <table className="w-full table-auto border border-gray-300 text-sm">
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
            ) : (
              <p className="text-gray-500">No appointment data available</p>
            )}
          </div>
        </div>

        {/* 🆕 Department Summary */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Department-wise Booking Summary
          </h3>
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Department</th>
                <th className="border px-3 py-2 text-left">Total</th>
                <th className="border px-3 py-2 text-left">Completed</th>
                <th className="border px-3 py-2 text-left">Pending</th>
                <th className="border px-3 py-2 text-left">Cancelled</th>
              </tr>
            </thead>
            <tbody>
              {departmentSummary.map((dept, index) => (
                <tr key={index}>
                  <td className="border px-3 py-1">{dept.departmentName}</td>
                  <td className="border px-3 py-1">{dept.total}</td>
                  <td className="border px-3 py-1 text-green-600">{dept.completed}</td>
                  <td className="border px-3 py-1 text-yellow-600">{dept.pending}</td>
                  <td className="border px-3 py-1 text-red-600">{dept.cancelled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PDF export content */}
        <div className="hidden">
          <div ref={reportRef} className="p-6 font-sans text-sm text-gray-800 bg-white">
            <h1 className="text-2xl font-bold text-center mb-6 underline">Admin Dashboard Report</h1>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 border-b pb-1">Summary</h2>
              <p><strong>Total Users:</strong> {totaluser}</p>
              <p><strong>Total Doctors:</strong> {totaldoc}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 border-b pb-1">Appointments Overview</h2>
              <p><strong>Total:</strong> {overview.total}</p>
              <p><strong>Pending:</strong> {overview.pending}</p>
              <p><strong>Completed:</strong> {overview.completed}</p>
              <p><strong>Cancelled:</strong> {overview.cancelled}</p>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2 border-b pb-1">{type} Appointments from {startDate} to {endDate}</h2>
              {appointmentCountfordash.length > 0 ? (
                <table className="w-full table-auto border border-gray-400 text-sm mt-2">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-left">Date</th>
                      <th className="border px-4 py-2 text-left">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentCountfordash.map((item, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-1">{item._id}</td>
                        <td className="border px-4 py-1">{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600 mt-2">No appointment data available</p>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2 border-b pb-1">Department-wise Booking Summary</h2>
              <table className="w-full table-auto border border-gray-400 text-sm mt-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Department</th>
                    <th className="border px-4 py-2 text-left">Total</th>
                    <th className="border px-4 py-2 text-left">Completed</th>
                    <th className="border px-4 py-2 text-left">Pending</th>
                    <th className="border px-4 py-2 text-left">Cancelled</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentSummary.map((dept, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-1">{dept.departmentName}</td>
                      <td className="border px-4 py-1">{dept.total}</td>
                      <td className="border px-4 py-1 text-green-700">{dept.completed}</td>
                      <td className="border px-4 py-1 text-yellow-700">{dept.pending}</td>
                      <td className="border px-4 py-1 text-red-700">{dept.cancelled}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adashboard

