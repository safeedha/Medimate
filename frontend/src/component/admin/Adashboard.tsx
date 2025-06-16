import Sidebar from './Sidebar'
import { useEffect, useState } from 'react'
import { getAllDoctor } from '../../api/adminapi/doctor'
import { getAlluser } from '../../api/adminapi/user'
import { gettotalappoinment } from '../../api/adminapi/appoinment'
import { FaUserMd, FaUsers } from 'react-icons/fa'
import { MdEventNote } from 'react-icons/md' // New icon for appointments
import DashboardBarChart from './graph/Bar'
import  DoctorPieCharts from './graph/Pie'
function Adashboard() {
  const [totaldoc, setTotaldoc] = useState(0)
  const [totaluser, setTotalUsers] = useState(0)
  const [overview, setOverview] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

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
    const fetchData = async () => {
      try {
        const response = await getAlluser(0, 0, '')
        if (response) {
          setTotalUsers(response.total)
        } else {
          setTotalUsers(0)
          console.error('No users found')
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchAppoinment = async () => {
      try {
        const response = await gettotalappoinment()
        setOverview(response)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }
    fetchAppoinment()
  }, [])

  return (
    <div className="flex flex-row text-sm">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="ml-24 w-full">
        <h2 className="text-center text-base font-semibold my-2">Dashboard Overview</h2>
        <div className="flex flex-row gap-2 flex-wrap">
          {/* Doctors */}
          <div className="border border-gray-300 rounded-md shadow-sm">
            <div className="flex items-center gap-2 bg-white p-2 border-l-4 border-blue-500 w-44">
              <FaUserMd className="text-blue-600 text-base" />
              <div>
                <p className="text-xs text-gray-500">Doctors</p>
                <p className="text-base font-medium text-blue-700">{totaldoc}</p>
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="border border-gray-300 rounded-md shadow-sm">
            <div className="flex items-center gap-2 bg-white p-2 border-l-4 border-green-500 w-44">
              <FaUsers className="text-green-600 text-base" />
              <div>
                <p className="text-xs text-gray-500">Users</p>
                <p className="text-base font-medium text-green-700">{totaluser}</p>
              </div>
            </div>
          </div>

          {/* Appointments */}
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
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          
            <div className="w-full md:w-1/2">
              <DashboardBarChart />
            </div>

            <div className="w-full md:w-1/2">
              <DoctorPieCharts />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Adashboard

