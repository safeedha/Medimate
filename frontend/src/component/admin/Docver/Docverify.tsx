import Sidebar from '../Sidebar'
import { useState, useEffect, useRef } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { getAllunVerfiedDoctors } from '../../../api/adminapi/doctor'
import { changeStatus } from '../../../api/adminapi/doctor'

import Modal from 'react-modal'
import Swal from 'sweetalert2'

interface Idoctor {
  _id?: string
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  specialisation: string | null
  experience: number
  fee: number
  status: 'Approved' | 'Rejected'
  isBlocked: boolean
  additionalInfo?: string
  profilePicture?: string
  medicalLicence?: string
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
    width: '90%',
    maxWidth: '500px',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
}

Modal.setAppElement('#root') // or whatever your root ID is

function Docverify() {
  const [doctors, setDoctors] = useState<Idoctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Idoctor | null>(null)
  const [modalIsOpen, setIsOpen] = useState(false)

  const subtitleRef = useRef<HTMLHeadingElement>(null)
  function afterOpenModal() {
    if (subtitleRef.current) subtitleRef.current.style.color = '#1f2937' // slate-800
  }
  function closeModal() {
    setIsOpen(false)
    setSelectedDoctor(null)
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllunVerfiedDoctors()
        if (response) setDoctors(response)
        else toast.error('Failed to fetch doctors')
      } catch {
        toast.error('An error occurred while fetching doctors')
      }
    })()
  }, [])

  const getSingledetails = (id: string) => {
    const doc = doctors.find((d) => d._id === id) ?? null
    setSelectedDoctor(doc)
    setIsOpen(true)
  }

  const RejectHandler = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Reject it!',
    })

    if (result.isConfirmed) {
      let status: 'Approved' | 'Rejected' = 'Rejected'
      const response = await changeStatus(id, status)
      setDoctors(response)
      setIsOpen(false)
      toast.success('Doctor Rejected successfully')
    }
  }

  const ApproveHandler = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to approve this request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Approve it!',
    })

    if (result.isConfirmed) {
      let status: 'Approved' | 'Rejected' = 'Approved'
      const response = await changeStatus(id, status)
      setDoctors(response)
      setIsOpen(false)
      toast.success('Doctor Approved successfully')
    }
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
      <div className="w-5/6 bg-gray-100 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Doctor Verification</h1>

        {doctors.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className='text-2xl text-red-700'>No new registered doctors.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-md shadow-md border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase">
                  <th className="py-3 px-6 border border-gray-300">Name</th>
                  <th className="py-3 px-6 border border-gray-300">Email</th>
                  <th className="py-3 px-6 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr
                    key={doctor._id}
                    className={`border-b hover:bg-gray-50 ${
                      doctor.isBlocked ? 'bg-red-100 text-red-700' : ''
                    }`}
                  >
                    <td className="py-3 px-6 border border-gray-200">
                      {doctor.firstname} {doctor.lastname}
                    </td>
                    <td className="py-3 px-6 border border-gray-200">{doctor.email}</td>
                    <td className="py-3 px-6 border border-gray-200">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => getSingledetails(doctor._id!)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Doctor Details"
        >
          <div className="bg-white p-6">
            <h2 ref={subtitleRef} className="text-xl font-semibold mb-4">
              Doctor Details
            </h2>

            {selectedDoctor ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Left Column: Text Details */}
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Name:</span>{' '}
                    {selectedDoctor.firstname} {selectedDoctor.lastname}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {selectedDoctor.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {selectedDoctor.phone}
                  </div>
                  <div>
                    <span className="font-medium">Specialisation:</span>{' '}
                    {selectedDoctor.specialisation ?? 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span>{' '}
                    {selectedDoctor.experience} years
                  </div>
                  <div>
                    <span className="font-medium">Consultation Fee:</span> ₹
                    {selectedDoctor.fee}
                  </div>

                  {selectedDoctor.additionalInfo && (
                    <div>
                      <span className="font-medium">Additional Info:</span>{' '}
                      {selectedDoctor.additionalInfo}
                    </div>
                  )}
                </div>

                {/* Right Column: Images */}
                <div className="space-y-4 flex flex-col items-center">
                  {selectedDoctor.profilePicture && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
                      <img
                        src={selectedDoctor.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {selectedDoctor.medicalLicence && (
                    <div className="w-full">
                      <span className="font-medium">Medical Licence:</span>
                      <div className="mt-2 border border-gray-200 rounded p-2">
                        <a
                          href={selectedDoctor.medicalLicence}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Licence Document
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p>No doctor selected.</p>
            )}

            <div className="mt-6 text-right">
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => RejectHandler(selectedDoctor?._id!)}
                >
                  Reject
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  onClick={() => ApproveHandler(selectedDoctor?._id!)}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Docverify
