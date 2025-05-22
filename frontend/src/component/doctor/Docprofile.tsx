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
        if(!formData.qualification)
        {
           toast.error("To update qualifiaction compulsory");
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
  <div className="flex min-h-screen overflow-hidden font-sans">
  <Toaster />
  <DoctorSidebar />

  <div className="ml-64 flex-1 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
    <header className="text-center py-6 px-6">
      <h1 className="text-4xl md:text-5xl font-semibold text-indigo-700 mb-2">
        Dr. {doctor?.firstname || 'Doctor'}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Manage your personal and professional details. Keep your profile up to date.
      </p>
    </header>

    <main className="px-6 md:px-20 py-4 flex-grow flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-lg border border-indigo-200 transition hover:shadow-xl">
        {/* Profile Picture Upload */}
        <div className="mb-6 text-center">
          <img
            src={profilePicture || '/default-profile.png'}
            alt="Profile"
            className="w-20 h-20 mx-auto rounded-full border-2 border-indigo-300 cursor-pointer"
            onClick={() => document.getElementById('fileInput')?.click()}
          />
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            disabled={disabled}
            onChange={handleImageChange}
          />
        </div>

        <h3 className="text-2xl font-semibold text-indigo-600 text-center mb-2">
          Personal Information
        </h3>
        <p className="text-center text-gray-500 mb-6 text-sm">
          View and update your contact, specialty, and professional details.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First & Last Name */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="text-sm text-gray-700">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                disabled={disabled}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                disabled={disabled}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* Phone & Specialisation */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="text-sm text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={disabled}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="e.g., 9876543210"
                pattern="[0-9]{10}"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-700">Specialisation</label>
              <select
                name="specialisation"
                value={formData.specialisation}
                onChange={handleChange}
                disabled={disabled}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
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

          {/* Qualification */}
          <div>
            <label className="text-sm text-gray-700">Qualification</label>
            <textarea
              name="qualification"
              value={formData.qualification === "false" ? "" : formData.qualification}
              onChange={handleChange}
              disabled={disabled}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              rows={3}
              placeholder="e.g., MBBS - AIIMS, New Delhi (2015)"
            />
          </div>

          {/* Experience & Fee */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="text-sm text-gray-700">Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                disabled={disabled}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                min="0"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-700">Consultation Fee</label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                disabled={disabled}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                min="0"
              />
            </div>
          </div>

          {/* Button */}
          <div className="text-center">
            {disabled ? (
              <p
                onClick={update}
                className="inline-block mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full cursor-pointer"
              >
                Update Profile
              </p>
            ) : (
              <button
                type="submit"
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition duration-300"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  </div>
</div>

  );
}

export default DoctorProfile;
