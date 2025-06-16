import Sidebar from '../Sidebar'
import { useState, useEffect, useRef } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { getAllunVerfiedDoctors, changeStatus } from '../../../api/adminapi/doctor'
import type { Idoctor } from '../../../Interface/interface'
import Modal from 'react-modal'
import Swal from 'sweetalert2'

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
    borderRadius: '0.75rem',
    overflow: 'visible',
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'transparent',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 50,
  },
}

Modal.setAppElement('#root')

function Docverify() {
  const [doctors, setDoctors] = useState<Idoctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Idoctor | null>(null)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState<string>("")
  const [submodalIsOpen, setSubIsOpen] = useState(false)
  const [selected, setSelected] = useState("")
  const [total, setTotal] = useState(0)
  const [currentpage, setCurrentpage] = useState(1)
  const limit = 4

  const subtitleRef = useRef<HTMLHeadingElement>(null)

  function afterOpenModal() {
    if (subtitleRef.current) subtitleRef.current.style.color = '#1f2937'
  }

  function closeModal() {
    setIsOpen(false)
    setSelectedDoctor(null)
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllunVerfiedDoctors(currentpage, limit)
        if (response) {
          setDoctors(response.doctors)
          setTotal(response.total)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else toast.error('Failed to fetch doctors')
      } catch {
        toast.error('An error occurred while fetching doctors')
      }
    })()
  }, [currentpage])

  const getSingledetails = (id: string) => {
    const doc = doctors.find((d) => d._id === id) ?? null
    setSelectedDoctor(doc)
    setIsOpen(true)
  }

  const RejectHandler = async (id: string, reason: string) => {
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
      const response = await changeStatus(id, 'Rejected', reason)
      setDoctors(response)
      setIsOpen(false)
      setSubIsOpen(false)
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
      const response = await changeStatus(id, 'Approved')
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
            <p className="text-2xl text-red-700">No new registered doctors.</p>
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
                    className={`border-b hover:bg-gray-50 ${doctor.isBlocked ? 'bg-red-100 text-red-700' : ''}`}
                  >
                    <td className="py-3 px-6 border border-gray-200">{doctor.firstname} {doctor.lastname}</td>
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

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center space-x-4">
              <button
                onClick={() => setCurrentpage((prev) => Math.max(prev - 1, 1))}
                disabled={currentpage === 1}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 ${
                  currentpage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Previous
              </button>
              <span className="text-sm font-medium">
                Page {currentpage} of {Math.ceil(total / limit)}
              </span>
              <button
                onClick={() => {
                  const totalPages = Math.ceil(total / limit)
                  if (currentpage < totalPages) setCurrentpage((prev) => prev + 1)
                }}
                disabled={currentpage >= Math.ceil(total / limit)}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 ${
                  currentpage >= Math.ceil(total / limit) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

     
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Doctor Details"
        >
          <div className="bg-white p-6 relative">
            <h2 ref={subtitleRef} className="text-xl font-semibold mb-4">Doctor Details</h2>

            <Modal
              isOpen={submodalIsOpen}
              style={customStyles}
              contentLabel="Reason for doctor rejection"
            >
              <div className="bg-white border-2 border-gray-300 rounded-xl p-6 max-w-md mx-auto shadow-lg">
                <p className="text-lg font-semibold mb-4">
                  Please write reason for Rejection:
                </p>
                <textarea
                  className="w-full h-28 p-3 border border-gray-400 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter reason here..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <div className="mt-4 text-right">
                  <button
                    type="button"
                    onClick={() => RejectHandler(selected, reason)}
                    className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Modal>

            {selectedDoctor ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div><span className="font-medium">Name:</span> {selectedDoctor.firstname} {selectedDoctor.lastname}</div>
                  <div><span className="font-medium">Email:</span> {selectedDoctor.email}</div>
                  <div><span className="font-medium">Phone:</span> {selectedDoctor.phone}</div>
                  <div><span className="font-medium">Specialisation:</span> {selectedDoctor?.specialisation?.deptname ?? 'N/A'}</div>
                  <div><span className="font-medium">Experience:</span> {selectedDoctor.experience} years</div>
                  <div><span className="font-medium">Consultation Fee:</span> ₹{selectedDoctor.fee}</div>
                  {selectedDoctor.additionalInfo && <div><span className="font-medium">Additional Info:</span> {selectedDoctor.additionalInfo}</div>}
                </div>

                <div className="space-y-4 flex flex-col items-center">
                  {selectedDoctor.profilePicture && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
                      <img src={selectedDoctor.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {selectedDoctor.medicalLicence && (
                    <div className="w-full">
                      <span className="font-medium">Medical Licence:</span>
                      <div className="mt-2 border border-gray-200 rounded p-2">
                        <a href={selectedDoctor.medicalLicence} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Licence Document
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : <p>No doctor selected.</p>}

            <div className="mt-6 text-right flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                onClick={() => {
                  setSubIsOpen(true)
                  setSelected(selectedDoctor?._id!)
                }}
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
        </Modal>
      </div>
    </div>
  )
}

export default Docverify
