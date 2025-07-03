import React, { useState, useEffect,useCallback } from 'react';
import Sidebar from '../Sidebar';
import Modal from 'react-modal';
import { toast, Toaster } from 'react-hot-toast';
import { createDepartment, getDepartment, Editdepartnemt, blockdepartnemt } from '../../../api/adminapi/departnment';
import Swal from 'sweetalert2';
import type { IDepartment } from '../../../Interface/interface';
import Pagination from '../../../component/common/Pgination';

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
  Modal.setAppElement('body');

  const [modalIsOpen, setIsOpen] = useState(false);
  const [deptname, setDeptname] = useState('');
  const [description, setDescription] = useState('');
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [edit, setEdit] = useState(false);
  const [deptid, setDeptid] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 3;

 const fetchDepartments = useCallback(async () => {
  try {
    const result = await getDepartment(currentPage, itemsPerPage, searchTerm);
    setDepartments(result?.item);
    setTotalPages(Math.ceil(result?.total / itemsPerPage));
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
}, [currentPage, itemsPerPage, searchTerm]); 

useEffect(() => {
  fetchDepartments();
}, [fetchDepartments, isBlocked]);

  const handleBlock = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to change the department status?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    });

    if (result.isConfirmed) {  
        await blockdepartnemt(id);
        setIsBlocked((prev) => !prev);
        Swal.fire('Updated!', 'Department status has been changed.', 'success');
    }
  };

  const handleEdit = (dept: IDepartment) => {
    setDeptid(dept._id!);
    setDeptname(dept.deptname);
    setDescription(dept?.description || '');
    setIsOpen(true);
    setEdit(true);
  };

  const openModal = () => {
    setDeptname('');
    setDescription('');
    setEdit(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formSubmit = async (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();

  const trimmedName = deptname.trim();
  const trimmedDesc = description.trim();

  if (!trimmedName || !trimmedDesc) {
    toast.error('Please fill all fields');
    return;
  }

  if (trimmedName.length < 3 || trimmedDesc.length < 3) {
    toast.error('Please enter a valid name and description (min 3 characters)');
    return;
  }

  const result = await createDepartment(trimmedName, trimmedDesc);

  if (result.success) {
    toast.success('Department added successfully');
    closeModal();
    // fetchDepartments(currentPage, searchTerm);
  } else {
    toast.error(result.message);
  }
};

  const editHandle = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!deptname || !description) {
      toast.error('Please fill all fields');
      return;
    }
    if (deptname.length < 3 || description.length < 3) {
      toast.error('Please enter valid name and description');
      return;
    }

    const result = await Editdepartnemt(deptid, deptname, description);
    if (result === 'Department edited successfully') {
      toast.success(result);
      setEdit(false);
      closeModal();
      fetchDepartments();
    } else {
      toast.error(result);
    }
  };

  return (
    <div className="flex flex-row">
      <Toaster position="top-center" toastOptions={{ style: { fontSize: '14px', padding: '10px 20px', maxWidth: '400px' } }} />
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mt-4">Department Management</h1>

        {/* Search + Add */}
        <div className="flex justify-between items-center mt-4">
          <input
            type="text"
            placeholder="Search department"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-1 rounded-md"
          />
          <button
            className="rounded-full bg-cyan-500 text-white px-6 py-2 font-semibold shadow-md hover:bg-cyan-600 transition duration-300"
            onClick={openModal}
          >
            Add Department
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200 border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Department Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((dept) => (
              <tr key={dept._id} className={dept.isblocked ? 'bg-red-100' : 'bg-white'}>
                <td className="px-6 py-4 text-sm text-gray-800">{dept.deptname}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{dept.description}</td>
                <td className="px-6 py-4 text-sm text-gray-800 space-x-2">
                  <button
                    onClick={() => handleBlock(dept!._id!)}
                    className={`px-3 py-1 rounded text-white ${
                      dept.isblocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {dept.isblocked ? 'Unblock' : 'Block'}
                  </button>
                  <br />
                  <br />
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
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Department Modal"
        >
          <div>
            <h2 className="text-red-700 font-medium mb-2">
              {edit ? 'Edit Department' : 'Add new department'}
            </h2>
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
            <button
              onClick={edit ? editHandle : formSubmit}
              className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-blue-700"
            >
              {edit ? 'Update Department' : 'Add Department'}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Department;

