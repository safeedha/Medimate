import { useEffect, useRef, useState } from 'react'
import html2pdf from 'html2pdf.js'
import Sidebar from './Sidebar'
import DashboardBarChart from './graph/Bar'
import DoctorPieCharts from './graph/Pie'
import { getAllDoctor } from '../../api/adminapi/doctor'
import { getAlluser } from '../../api/adminapi/user'
import { gettotalappoinment } from '../../api/adminapi/appoinment'
import { FaUserMd, FaUsers } from 'react-icons/fa'
import { MdEventNote } from 'react-icons/md'
import type { AppointmentCountByDate } from '../../Interface/interface'

function Adashboard() {
  const reportRef = useRef<HTMLDivElement>(null)
  const [type,setType]=useState<'completed' | 'cancelled' | 'pending'>('completed')
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

 
useEffect(() => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 6); // Last 7 days including today

  const startStr = lastWeek.toISOString().split('T')[0]; // YYYY-MM-DD
  const endStr = today.toISOString().split('T')[0];

  setStartDate(startStr);
  setEndDate(endStr);
}, []);

  const handleDownloadPDF = () => {
    if (!reportRef.current) return
    const opt = {
      margin:       0.5,
      filename:     'dashboard_report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
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
        setTotalUsers(response.total || 0)
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
    <div className="flex flex-row text-sm">
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="ml-24 w-full">
        <h2 className="text-center text-base font-semibold my-2">Dashboard Overview</h2>

        {/* Wrap everything inside a ref for PDF export */}
        <div >
          <div className="flex flex-row gap-2 flex-wrap">
            {/* Doctor card */}
            <div className="border border-gray-300 rounded-md shadow-sm">
              <div className="flex items-center gap-2 bg-white p-2 border-l-4 border-blue-500 w-44">
                <FaUserMd className="text-blue-600 text-base" />
                <div>
                  <p className="text-xs text-gray-500">Doctors</p>
                  <p className="text-base font-medium text-blue-700">{totaldoc}</p>
                </div>
              </div>
            </div>

            {/* User card */}
            <div className="border border-gray-300 rounded-md shadow-sm">
              <div className="flex items-center gap-2 bg-white p-2 border-l-4 border-green-500 w-44">
                <FaUsers className="text-green-600 text-base" />
                <div>
                  <p className="text-xs text-gray-500">Users</p>
                  <p className="text-base font-medium text-green-700">{totaluser}</p>
                </div>
              </div>
            </div>

            {/* Appointments card */}
            <div className="border border-gray-300 rounded-md shadow-sm">
              <div className="bg-white p-3 border-l-4 border-purple-500 w-56">
                <div className="flex items-center gap-2 mb-1">
                  <MdEventNote className="text-purple-600 text-base" />
                  <p className="text-xs text-gray-700 font-semibold">Appointments</p>
                </div>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <p><span className="font-medium text-gray-800">Total:</span> {overview.total}</p>
                  <p><span className="font-medium text-yellow-600">Pending:</span> {overview.pending}</p>
                  <p><span className="font-medium text-green-600">Completed:</span> {overview.completed}</p>
                  <p><span className="font-medium text-red-600">Cancelled:</span> {overview.cancelled}</p>
                </div>
              </div>
            </div>

             <div className="mt-6">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition duration-200"
                onClick={handleDownloadPDF}
              >
                Download PDF
              </button>
            </div>
          </div>
         

         <div className="hidden">
     <div ref={reportRef} className="p-6 font-sans text-sm text-gray-800">

    {/* Title */}
    <h1 className="text-2xl font-bold text-center mb-6 underline">Admin Dashboard Report</h1>

    {/* Summary Section */}
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 border-b pb-1">Summary</h2>
      <div className="pl-2 space-y-1">
        <p><strong>Total Users:</strong> {totaluser}</p>
        <p><strong>Total Doctors:</strong> {totaldoc}</p>
      </div>
    </div>

    {/* Appointment Overview */}
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 border-b pb-1">Appointments Overview</h2>
      <div className="pl-2 space-y-1">
        <p><strong>Total:</strong> {overview.total}</p>
        <p><strong>Pending:</strong> {overview.pending}</p>
        <p><strong>Completed:</strong> {overview.completed}</p>
        <p><strong>Cancelled:</strong> {overview.cancelled}</p>
      </div>
    </div>

    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2 border-b pb-1">{type} Appointments from {startDate} to { endDate}</h2>
      {appointmentCountfordash.length > 0 ? (
        <table className="w-full table-auto border border-gray-400 text-sm mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Count</th>
            </tr>
          </thead>
          <tbody>
            {appointmentCountfordash.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-1">{item._id}</td>
                <td className="border border-gray-300 px-4 py-1">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 mt-2">No appointment data available</p>
      )}
    </div>

    {/* Doctor Completion Table */}
    <div>
      <h2 className="text-lg font-semibold mb-2 border-b pb-1">Doctor-wise Completed Appointments</h2>
      {Object.keys(doctorDatafordash).length > 0 ? (
        <table className="w-full table-auto border border-gray-400 text-sm mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Doctor Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Completed Appointments</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(doctorDatafordash).map(([name, count], index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-1">{name}</td>
                <td className="border border-gray-300 px-4 py-1">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 mt-2">No data available</p>
      )}
    </div>

  </div>
</div>

         

          {/* Graphs */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 mt-5">
            <div className="w-full md:w-1/2">
              <DashboardBarChart setAppointmentCountfordash={setAppointmentCountfordash} setType={setType} startdate={ setStartDate}  enddate={setEndDate} />
            </div>

            <div className="w-full md:w-1/2">
              <DoctorPieCharts setDoctorDatafordash={setDoctorDatafordash} />
            </div>
          </div>
        </div>
         

         
     
       
      </div>
    </div>
  )
}

export default Adashboard
