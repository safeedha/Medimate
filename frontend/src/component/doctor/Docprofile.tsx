import DoctorSidebar from './Docsidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import type { RootState } from '../../app/store';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import {profileUpdate} from '../../api/doctorapi/doclogin'; // Assuming you have an action to update doctor profile
import {getDepartment} from '../../api/doctorapi/department'

interface DepartmentProps {
  _id: string;
  deptname: string;
  description: string;
  createdAt: string;   
  updatedAt: string; 
}
function DoctorProfile() {
  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const dispatch=useDispatch()

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
    
        getAllDepartment();
      }, []);
   
  const [disabled,setDisabled]=useState<boolean>(true)
  const [formData, setFormData] = useState({
    firstname: doctor?.firstname || '',
    lastname: doctor?.lastname || '',
    experience: doctor?.experience || '',
    fee: doctor?.fee || '' ,// Added fee field
    phone:doctor?.phone||'',
    specialisation:doctor?.specialisation||'',
    qualification:doctor?.qualification||'',
  });

  const [profilePicture, setProfilePicture] = useState(doctor?.profilePicture || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const update=()=>{
    setDisabled(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
   const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
     let uploadedUrl:string
         if (!formData.firstname.trim()) {
          toast.error("First name is required");
          return 
        }
        if (!formData.lastname.trim()) {
          toast.error("Last name is required");
          return 
        }
        if (!formData.experience || isNaN(Number(formData.experience))) {
          toast.error("Valid experience is required");
          return 
        }
        if (!formData.fee || isNaN(Number(formData.fee))) {
          toast.error("Valid consultation fee is required");
          return
        }
        if (!/^\d{10}$/.test(formData.phone)) {
          toast.error("Phone number must be exactly 10 digits");
          return 
        }
     if(profilePicture!==doctor?.profilePicture)
     {
         const formData = new FormData();
         formData.append("file",profilePicture );
         formData.append("upload_preset", "products");
  
   
         const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwerqkqou/image/upload",
          formData
        );
       uploadedUrl = response.data.secure_url;

     }
     else{
        uploadedUrl=profilePicture
     }
     const data={
      firstname:formData.firstname,
      lastname:formData.lastname,
      experience:Number(formData.experience),
      fee:Number(formData.fee),
      image:uploadedUrl,
      phone:formData.phone,
      email:doctor?.email,
      specialisation:formData.specialisation,
      qualification:formData.qualification
     }
      const update={...doctor, firstname:formData.firstname,
      lastname:formData.lastname,
      experience:Number(formData.experience),
      fee:Number(formData.fee),
      profilePicture:uploadedUrl,
      email:doctor?.email,
      phone:formData.phone,
      specialisation:formData.specialisation,
      qualification:formData.qualification
    }
      const response=await profileUpdate(data,update,dispatch)
      if(response==='Profile updated suceesfully')
      {
        toast.success(response)
        setDisabled(true)
      }
      if(response==='Phone number already exists for another doctor')
       {
        toast.success(response)
      }
   }
  return (
    <div className="flex min-h-screen overflow-hidden">
     <Toaster/>
      <DoctorSidebar />


      <div className="ml-64 flex-1 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <header className="text-center py-3 px-6">
          <h1 className="text-4xl md:text-5xl font-medium text-indigo-700 mb-4">
            Dr. {doctor?.firstname || 'Doctor'}
          </h1>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Manage your personal and professional details, and update your information as needed.
          </p>
        </header>

        <main className="px-6 md:px-20 py-1 flex-grow">
          <div className=" sm:grid-cols-1 md:grid-cols-1 gap-8 flex justify-center items-center">
   
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl border-2 border-indigo-300 transition-transform transform hover:-translate-y-1 text-center w-full max-w-md ml-40">
      
              <div className="mb-4">
                <img
                  src={profilePicture || '/default-profile.png'} // Use a default profile image if no image is available
                  alt="Profile"
                  className="w-16 h-16 mx-auto rounded-full cursor-pointer"
                  onClick={() => document.getElementById('fileInput')?.click()} // Trigger file input when the image is clicked
                />
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  disabled={disabled}
                  onChange={handleImageChange} // Handle image selection
                />
              </div>

              <h3 className="text-xl font-semibold text-indigo-600 mb-1">Personal Information</h3>
              <p className="text-gray-600 text-sm">View and update your personal information, including your contact details, specialty, experience, and fee.</p>

            
            <form className="mt-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* First Name and Last Name on the same line */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-left text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-left text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Phone Number and Specialisation */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-left text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., 9876543210"
                    pattern="[0-9]{10}"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-left text-gray-700">Specialisation</label>
                  <select
                    name="specialisation"
                    value={formData.specialisation}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    disabled={disabled}
                  >
                    <option value="" disabled>Select Department</option>
                    {departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.deptname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Qualification Details */}
              <div>
                <label className="block text-left text-gray-700">Qualification Details</label>
                <textarea
                  name="qualification"
                  disabled={disabled}
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., MBBS - AIIMS, New Delhi (2015)"
                  rows={3}
                />
              </div>

              {/* Experience and Fee on the same line */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-left text-gray-700">Experience (years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-left text-gray-700">Consultation Fee</label>
                  <input
                    type="number"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    min="0"
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Submit Button */}
              {disabled?(
              <p
                onClick={update}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-colors inline-block"
              >
                Update Profile
              </p>
              ):(
              <button
                type="submit"
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition-colors"
              >
                Save changes
              </button>
              )
             }
              
            </div>
          </form>


            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorProfile;
