import { useState, useEffect, useRef } from 'react'
import Sidebar from '../Sidebar'
import { toast, Toaster } from 'react-hot-toast'
import { getAllDoctor } from '../../../api/adminapi/doctor'
import { getAllappoinment } from '../../../api/adminapi/appoinment'
import Modal from 'react-modal'
import Pagination from '../../../component/common/Pgination'

interface DepartmentProps {
  _id: string;
  deptname: string;
  description: string;
  isblocked: boolean;
  createdAt: string;   
  updatedAt: string; 
}

interface Idoctor {
  _id?: string
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  specialisation: DepartmentProps
  experience: number
  fee: number
  isBlocked: boolean
  additionalInfo?: string
  profilePicture?: string
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    width: 'fit-content',
    maxWidth: '1000px',
    maxHeight: '90vh',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
}

Modal.setAppElement('#root')

function Appoinment() {
  const [doctors, setDoctors] = useState<Idoctor[]>([])
  const [modalIsOpen, setIsOpen] = useState(false)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const [appoinment, setAppoinment] = useState<any[]>([])
  const [doc,setDoc]=useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 4

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllDoctor()
        if (response) setDoctors(response)
        else toast.error('Failed to fetch doctors')
      } catch {
        toast.error('An error occurred while fetching doctors')
      }
    })()
  }, [])

  const openModal = async (id: string,name:string) => {
    const result = await getAllappoinment(id)
    setAppoinment(result)
    setDoc(name)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const afterOpenModal = () => {
    if (subtitleRef.current) subtitleRef.current.style.color = '#1f2937'
  }

  const indexOfLastDoctor = currentPage * itemsPerPage
  const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor)

  const handleRefund = (appointmentId: string) => {
    // Implement refund logic here (API call)
    toast.success(`Refund initiated for appointment ID: ${appointmentId}`)
  }

  return (
    <div className="flex h-screen">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { fontSize: '14px', padding: '10px 20px', maxWidth: '400px' },
        }}
      />
      <div className="w-1/6">
        <Sidebar />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Appointment Details"
      >
        <div className="bg-white p-6 max-h-[80vh] w-full max-w-[900px]">
          <h2 ref={subtitleRef} className="text-xl font-semibold mb-4 text-gray-800">
            Appointment Details of Dr:{doc}
          </h2>

          {appoinment.length === 0 ? (
            <div className="text-gray-600">
              No patient has confirmed an appointment with this doctor.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[65vh] overflow-y-auto pr-2">
              {appoinment.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-300 flex flex-col space-y-2"
                >
                  <p className="text-sm font-semibold text-gray-700">
                    Patient Name: <span className="font-normal">{item.patient_name}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Email: <span className="font-normal">{item.patient_email}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Age: <span className="font-normal">{item.patient_age}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Gender: <span className="font-normal">{item.patient_gender}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Date: <span className="font-normal">{new Date(item.schedule?.date).toLocaleDateString()}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Time: <span className="font-normal">{item.schedule?.startingTime}to{item.schedule?.endTime}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Reason: <span className="font-normal">{item.reason}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Payment: <span className="font-normal">{item.payment_status}</span>
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-700">
                      Status: <span className="font-normal">{item.status}</span>
                    </p>
                    {item.status === 'cancelled' && item.payment_status === 'paid' && (
                      <button
                        onClick={() => handleRefund(item._id)}
                        className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        Refund
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-right">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <div className="w-5/6 bg-gray-100 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Doctors List</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Specialisation</th>
                <th className="py-3 px-4">Appointment Details</th>
              </tr>
            </thead>
            <tbody>
              {currentDoctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className={`border-b ${doctor.isBlocked ? 'bg-red-100' : 'bg-white'}`}
                >
                  <td className="py-3 px-4">
                    {doctor.firstname} {doctor.lastname}
                  </td>
                  <td className="py-3 px-4">
                    {doctor.specialisation?.deptname
                      ? doctor.specialisation.deptname.charAt(0).toUpperCase() +
                        doctor.specialisation.deptname.slice(1)
                      : 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openModal(doctor._id!,doctor.firstname!)}
                      className="text-cyan-600 underline hover:text-cyan-800"
                    >
                      View Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(doctors.length / itemsPerPage)}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appoinment
