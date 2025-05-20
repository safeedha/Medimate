import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Modal from 'react-modal';
import { toast, Toaster } from 'react-hot-toast';
import { createDepartment, getDepartment ,Editdepartnemt,blockdepartnemt} from '../../../api/adminapi/departnment';
import Pagination from '../../../component/common/Pgination';
import Swal from 'sweetalert2';

interface DepartmentProps {
  _id: string;
  deptname: string;
  isblocked: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Department() {
  let subtitle: any;
  Modal.setAppElement('body');

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [deptname, setDeptname] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deptid, setDeptid] = useState<string>('');
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  
useEffect(() => {
    async function getAllDepartment() {
      try {
        const result = await getDepartment();
        setDepartments(result);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }

    getAllDepartment();
  }, [isBlocked]);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(departments.length / itemsPerPage);
  const paginatedDepartments = departments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 const handleBlock = async (id: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to change the department status?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, change it!'
  });

  if (result.isConfirmed) {
    try {
       await blockdepartnemt(id); // Your API call
      setIsBlocked(prev => !prev);

      Swal.fire(
        'Updated!',
        'Department status has been changed.',
        'success'
      );
    } catch (error) {
      Swal.fire(
        'Error!',
        'Something went wrong while updating the status.',
        'error'
      );
    }
  }
};


  const handleEdit = async(dept: DepartmentProps) => {
    setDeptid(dept._id);
    setDeptname(dept.deptname);
    setDescription(dept.description);
    setIsOpen(true);
    setEdit(true);
    
  };



  function openModal() {
    setDeptname('');
    setDescription('');
    setEdit(false);
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!deptname || !description) {
      toast.error('Please fill all fields');
      return;
    }
    if (deptname.length < 3 || description.length < 3) {
      toast.error('Please enter valid name and description');
      return;
    }

    const result = await createDepartment(deptname, description);

    if (result.success) {
      toast.success('Department added successfully');
      setDeptname('');
      setDescription('');
      setIsOpen(false);
      const updatedDepartments = await getDepartment();
      setDepartments(updatedDepartments);
    } else {
      toast.error(result.message);
    }
  };

  const editHandle = async(e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!deptname || !description) {
      toast.error('Please fill all fields');
      return;
    }
    if (deptname.length < 3 || description.length < 3) {
      toast.error('Please enter valid name and description');
      return;
    }
    const result=await Editdepartnemt(deptid,deptname,description)
    if(result==='Department edited successfully')
    {
      toast.success('Department edited successfully')
      setEdit(false);
    }
    else
    {
      toast.error(result)
      setEdit(false);
    }
  };

  return (
    <div className="flex flex-row">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: '14px',
            padding: '10px 20px',
            maxWidth: '400px',
          },
        }}
      />
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mt-4">Department Management</h1>
        <button
          className="rounded-full bg-cyan-500 text-white px-6 py-2 font-semibold shadow-md hover:bg-cyan-600 transition duration-300"
          onClick={openModal}
        >
          Add Department
        </button>

        <table className="min-w-full divide-y divide-gray-200 border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Department Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedDepartments.map((dept) => (
             <tr
              key={dept._id}
              className={dept.isblocked ? 'bg-red-100' : 'bg-white'}
            >
              <td className="px-6 py-4 text-sm text-gray-800">{dept.deptname}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{dept.description}</td>
              <td className="px-6 py-4 text-sm text-gray-800 space-x-2">
                <button
                  onClick={() => handleBlock(dept._id)}
                  className={`px-3 py-1 rounded text-white ${
                    dept.isblocked
                      ? 'bg-green-500 hover:bg-green-600' // Unblock button style
                      : 'bg-red-500 hover:bg-red-600'     // Block button style
                  }`}
                >
                  {dept.isblocked ? 'Unblock' : 'Block'}
                </button>
                <br /><br />
                <button
                  onClick={() => handleEdit(dept)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>

            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {departments.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Department Modal"
        >
          <div>
            <h2 className="text-red-700 font-medium mb-2">Add new department</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">Department Name:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Enter department name"
                value={deptname}
                onChange={(e) => setDeptname(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">Description:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {!edit ? (
              <button
                onClick={formSubmit}
                className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-blue-700"
              >
                Add Department
              </button>
            ) : (
              <button
                onClick={editHandle}
                className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-blue-700"
              >
                Update Department
              </button>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Department;
