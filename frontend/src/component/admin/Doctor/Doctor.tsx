import { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar';
import { toast, Toaster } from 'react-hot-toast';
import { getAllDoctor, changeblockStatus } from '../../../api/adminapi/doctor';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import type { Idoctor } from '../../../Interface/interface';
import Table from '../../common/Table'; // <-- Import reusable Table!

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
};

Modal.setAppElement('#root');

function Doctor() {
  const [doctors, setDoctors] = useState<Idoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Idoctor | null>(null);
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [change,setChange]=useState(false)
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await getAllDoctor(currentPage, itemsPerPage, searchTerm.trim());
        setDoctors(response.doctors);
        setTotalDoctors(response.total);
      } catch {
        toast.error('An error occurred while fetching doctors');
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [currentPage, itemsPerPage, searchTerm,change]);

  const openModal = (doctor: Idoctor) => {
    setSelectedDoctor(doctor);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedDoctor(null);
  };

  const afterOpenModal = () => {
    if (subtitleRef.current) subtitleRef.current.style.color = '#1f2937';
  };

  const blockHandle = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to change status?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, change it!',
    });

    if (result.isConfirmed) {
       await changeblockStatus(id);
      toast.success('Status is updated');
      setChange((prev)=>!prev)
    }
  };

  const totalPages = Math.ceil(totalDoctors / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // --- Doctor Table Columns ---
  const doctorColumns = [
    {
      header: "Name",
      accessor: (doctor: Idoctor) => `${doctor.firstname} ${doctor.lastname}`,
    },
    {
      header: "Email",
      accessor: (doctor: Idoctor) => doctor.email,
    },
    {
      header: "More details",
      accessor: (doctor: Idoctor) => (
        <button
          onClick={() => openModal(doctor)}
          className="text-cyan-600 underline hover:text-cyan-800"
        >
          View Item
        </button>
      ),
    },
    {
      header: "Action",
      accessor: (doctor: Idoctor) => (
        <button
          className={`px-4 py-1 rounded text-white ${doctor.isBlocked ? 'bg-green-500' : 'bg-red-500'}`}
          onClick={() => blockHandle(doctor._id!)}
        >
          {doctor.isBlocked ? 'Unblock' : 'Block'}
        </button>
      ),
    },
  ];

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
        <h1 className="text-2xl font-bold text-center mb-6">Doctors List</h1>

      
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search doctors by name or email..."
            className="w-full max-w-md px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={doctorColumns}
            data={doctors}
            getRowClassName={(doctor) => doctor.isBlocked ? 'bg-red-100' : 'bg-white'}
          />
          {doctors.length === 0 && (
            <div className="py-4 text-center text-gray-500">
              No doctors found.
            </div>
          )}
        </div>

     
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNum ? 'bg-cyan-600 text-white' : 'bg-gray-300'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Modal for doctor details */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
                <div className="space-y-3">
                  <div><strong>Name:</strong> {selectedDoctor.firstname} {selectedDoctor.lastname}</div>
                  <div><strong>Email:</strong> {selectedDoctor.email}</div>
                  <div><strong>Phone:</strong> {selectedDoctor.phone}</div>
                  <div><strong>Specialisation:</strong> {selectedDoctor.specialisation?.deptname ?? 'N/A'}</div>
                  <div><strong>Experience:</strong> {selectedDoctor.experience} years</div>
                  <div><strong>Fee:</strong> ₹{selectedDoctor.fee}</div>
                  {selectedDoctor.additionalInfo && (
                    <div><strong>Additional Info:</strong> {selectedDoctor.additionalInfo}</div>
                  )}
                </div>

                {/* Right Column (Profile Picture and License Link) */}
                <div className="flex flex-col justify-start items-center space-y-3">
                  {selectedDoctor.profilePicture && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
                      <img
                        src={`https://res.cloudinary.com/dwerqkqou/image/upload/${selectedDoctor.profilePicture}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {selectedDoctor.medicalLicence && (
                    <div className="border border-gray-200 rounded p-2">
                      <a
                        href={`https://res.cloudinary.com/dwerqkqou/image/upload/${selectedDoctor.medicalLicence}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Licence Document
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p>No doctor selected.</p>
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
      </div>
    </div>
  );
}

export default Doctor;
