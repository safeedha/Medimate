import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { getCountforDoc } from '../../../api/adminapi/appoinment'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoctorCompletedPieChart() {
  const [doctorData, setDoctorData] = useState<Record<string,string>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result=await getCountforDoc()
        setDoctorData(result)
      } catch (error) {
        console.error('Failed to fetch doctor appointment counts:', error)
      }
    }

    fetchData()
  }, [])

  const data = {
    labels: Object.keys(doctorData),
    datasets: [
      {
        label: 'Completed Appointments',
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
        Completed Appointments by Doctor
      </h2>
      <Pie data={data} options={options} />
    </div>
  )
}
