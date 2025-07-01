import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { getCountforDoc } from '../../../api/adminapi/appoinment'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoctorCompletedPieChart({setDoctorDatafordash,status}:{setDoctorDatafordash: React.Dispatch<React.SetStateAction<Record<string,string>>>,status:'completed' | 'cancelled' | 'pending'}) {
  const [doctorData, setDoctorData] = useState<Record<string,string>>({})
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result=await getCountforDoc(status)
        setDoctorData(result)
        setDoctorDatafordash(result)
      } catch (error) {
        console.error('Failed to fetch doctor appointment counts:', error)
      }
    }

    fetchData()
  }, [status])

  const data = {
    labels: Object.keys(doctorData),
    datasets: [
      {
        label: `${status} Appointment`,
        data: Object.values(doctorData),
        backgroundColor: ['#60a5fa', '#34d399', '#facc15', '#f87171', '#a78bfa'], // Add more colors if needed
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <div className="w-[300px] h-[300px] border p-4 rounded-md shadow-md mx-auto">
      <h2 className="text-center font-semibold mb-2">
        {status} Appointments by Doctor
      </h2>
      {Object.keys(doctorData).length>0?
       (<Pie data={data} options={options} />):
       (<p className="text-center text-gray-500 mt-10">No data available for {status} appointments.</p>)
      
      }
      {/* <Pie data={data} options={options} /> */}
    </div>
  )
}
