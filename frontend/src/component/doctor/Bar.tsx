import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

import type { AppointmentCountByDate } from '../../Interface/interface'
import {getAppointmentsFiltered} from '../../api/doctorapi/appoinment';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function DashboardBarChart({
  setAppointmentCountfordash,
  setType,
  startdate,
  enddate
}: {
  setAppointmentCountfordash: React.Dispatch<React.SetStateAction<AppointmentCountByDate[]>>,
  setType: React.Dispatch<React.SetStateAction<'completed' | 'cancelled' | 'pending'>>,
  startdate:React.Dispatch<React.SetStateAction<string>>,
  enddate:React.Dispatch<React.SetStateAction<string>>
}) {
  const [status, setStatus] = useState<'completed' | 'cancelled' | 'pending'>('completed')
  const [appointmentCount, setAppointmentCount] = useState<AppointmentCountByDate[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

 
  useEffect(() => {
    const today = new Date()
    const lastWeek = new Date()
    lastWeek.setDate(today.getDate() - 6) 
    const startStr = lastWeek.toISOString().split('T')[0]
    const endStr = today.toISOString().split('T')[0]

    setStartDate(startStr)
    setEndDate(endStr)

    getAppointmentsFiltered('completed', lastWeek, today).then((result) => {
      if (result){
         setAppointmentCount(result)
          setAppointmentCountfordash(result)
      }
    })
  }, [])

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.')
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (end <= start) {
      alert('End date must be greater than start date.')
      return
    }

    const result = await getAppointmentsFiltered(status, start, end)
    if (result) {
      setAppointmentCount(result)
      setAppointmentCountfordash(result)
    }
  }

  const data = {
    labels: appointmentCount.map((doc) => doc._id),
    datasets: [
      {
        label: 'Appointments',
        data: appointmentCount.map((doc) => doc.count),
        backgroundColor: '#60A5FA ' 
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Appointment Count',
        },
      },
    },
  }

  return (
    <div className="w-full">

      <div className="flex flex-wrap gap-4 mt-5 mb-2 items-end">
        <div className="flex gap-2">
          <button
            onClick={() =>{ 
              setStatus('completed')
               setType('completed')
            }}
            className={`px-4 py-1 rounded ${status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Completed
          </button>
          <button
            onClick={() => {
              setStatus('cancelled')
              setType('cancelled')
            }}
            className={`px-4 py-1 rounded ${status === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            Cancelled
          </button>
          <button
            onClick={() => {
              setStatus('pending')
              setType('pending')
            }}
            className={`px-4 py-1 rounded ${status === 'pending' ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}
          >
            Pending
          </button>
        </div>

   
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label htmlFor="start-date" className="text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                startdate(e.target.value)
              }}
              className="border p-1 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="end-date" className="text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value)
                enddate(e.target.value)
              
              }}
              className="border p-1 rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-1 rounded h-[38px]"
        >
          Submit
        </button>
      </div>

     
      <div style={{ width: '100%', height: '250px' }}>
        {appointmentCount.length>0?(
          <Bar data={data} options={options} />
        ):(
           <p className="text-center text-gray-500">No data available to display the chart.</p>
        )}
       
      </div>
    </div>
  )
}
