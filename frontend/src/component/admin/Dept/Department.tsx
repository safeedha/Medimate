import React,{useState,useEffect} from 'react'
import Sidebar from '../Sidebar'
import Modal from 'react-modal';
import {toast, Toaster} from 'react-hot-toast'
import {createDepartment} from '../../../api/adminapi/departnment'
import {getDepartment} from '../../../api/adminapi/departnment'


interface DepartmentProps {
  _id: string;
  deptname: string;
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
  Modal.setAppElement('body'); // Set the app element for accessibility

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [deptname, setDeptname] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [edit,setEdit]=useState<boolean>(false)
  

const handleBlock = (id: string) => {
  console.log("Block department with ID:", id);
  // Add your logic here
};

const handleEdit = (dept: DepartmentProps) => {
  console.log("Edit department:", dept);
  // Prefill modal fields or navigate to edit form
  setDeptname(dept.deptname);
  setDescription(dept.description);
  setIsOpen(true); 
  setEdit(true)
};




 useEffect(() => {
    async function getAllDepartment() {
      try {
        const result = await getDepartment();
        setDepartments(result); // Set the fetched departments to state
        console.log(result); 
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }

    getAllDepartment(); // call the async function
  }, []);





  function openModal() {
    setDeptname('')
    setDescription('')
    setEdit(false)
    setIsOpen(true);
  }

  function afterOpenModal() {
    
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const formSubmit=async(e: React.MouseEvent<HTMLElement>)=>{
    e.preventDefault()
    if(!deptname || !description){
      toast.error('Please fill all fields')
      return
    }
    if(deptname.length<3 || description.length<3){
      toast.error('Please enter valid name and description')
      return
    }
     
    
const result = await createDepartment(deptname, description);

if (result.success) {
  toast.success("Department added successfully");
  setDeptname("");
  setDescription("");
  setIsOpen(false);
  const updatedDepartments = await getDepartment();
  setDepartments(updatedDepartments);
} else {
  toast.error(result.message); // Show error like "Department already exists"
}
    
  }

  const editHandle=(e: React.MouseEvent<HTMLElement>)=>{
   e.preventDefault()
    if(!deptname || !description){
      toast.error('Please fill all fields')
      return
    }
    if(deptname.length<3 || description.length<3){
      toast.error('Please enter valid name and description')
      return
    }
    try{

    }
    catch(error)
    {
      
    }
  }

  return (
    <div className="flex flex-row">
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontSize: '14px',          // Set global font size
          padding: '10px 20px',      // Set global padding
          maxWidth: '400px',         
        },
      }}
    />
    <div className="w-1/6"><Sidebar/></div>
    <div className="w-5/6 bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mt-4">Departnment Management</h1>
      <button className="rounded-full bg-cyan-500 text-white px-6 py-2 font-semibold shadow-md hover:bg-cyan-600 transition duration-300" onClick={openModal}>
        Add departnment
      </button>
      <table className="min-w-full divide-y divide-gray-200 border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Department Name</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {departments.map((dept) => (
          <tr key={dept._id}>
            <td className="px-6 py-4 text-sm text-gray-800">{dept.deptname}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{dept.description}</td>
            <td className="px-6 py-4 text-sm text-gray-800 space-x-2">
              <button
                onClick={() => handleBlock(dept._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Block
              </button>
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

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
        {/* <button onClick={closeModal}>*</button> */}
        <div><h2 className="text-red-700 font-medium mb-2">Add new departnment</h2></div>
        <div >
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
              placeholder="Enter deescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
         {!edit&&(
          <button
            onClick={formSubmit}
            className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-blue-700"
          >
            Add Department
          </button>
         )}

          {edit&&(
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
  )
}

export default Department