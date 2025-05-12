import  { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { toast, Toaster } from 'react-hot-toast'
import { getAlluser, changeStatus } from '../../../api/adminapi/user'
import Swal from 'sweetalert2'
import Pagination from '../../../component/common/Pgination'

interface Iuser {
  _id?: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  phone: string,
  googleIds?: string | null,
  isBlocked: boolean,
  googleVerified?: boolean,
  gender: "male" | "female" | "other"
}

function User() {
  const [users, setUsers] = useState<Iuser[]>([])
  const [selectedUser, setSelectedUser] = useState<Iuser | null>(null)
  const [showModal, setShowModal] = useState(false)


  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 4

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAlluser();
        if (response) {
          setUsers(response);
        } else {
          console.error('No users found');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const openModal = (user: Iuser) => {
    setSelectedUser(user);
    setShowModal(true);
  }

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  }

  const blockHandle = async (id: string) => {
    try {
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
        const result2 = await changeStatus(id)
        toast.success("Status updated")
        setUsers(result2);
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

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
        <h1 className="text-2xl font-bold text-center mb-6">User List</h1>

        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Details</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr
                key={user._id}
                className={`border-t hover:bg-gray-50 ${user.isBlocked ? 'bg-red-100 text-red-700' : ''}`}
              >
                <td className="p-4">{user.firstname} {user.lastname}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <p
                    onClick={() => openModal(user)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    More Details
                  </p>
                </td>
                <td className="p-4">
                  <button
                    className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-300 shadow-md
                      ${user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                    onClick={() => blockHandle(user._id!)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination component */}
        <div className="mt-4 flex justify-center">
          <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(users.length / usersPerPage)}
          onPageChange={page => setCurrentPage(page)}
        />
        </div>

        {/* Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">User Details</h2>
              <p><strong>Name:</strong> {selectedUser.firstname} {selectedUser.lastname}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Gender:</strong> {selectedUser.gender}</p>
              <p><strong>Google Verified:</strong> {selectedUser.googleVerified ? 'Yes' : 'No'}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default User
