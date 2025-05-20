import bgImage from '../../../assets/doc.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {getDepartment} from '../../../api/doctorapi/department'
import {signup} from "../../../api/doctorapi/doclogin"
import {useNavigate} from 'react-router-dom'
interface DepartmentProps {
  _id: string;
  deptname: string;
  description: string;
  createdAt: string;   
  updatedAt: string; 
}
function Signup() {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [specialisation, setSpecialisation] = useState<string>('');
  const [experience, setExperience] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File>();
  const [medicalLicence, setMedicalLicence] = useState<File>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);

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



   const navigate=useNavigate()

  const addformSub = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const missingFields:string []= [];

    if (!firstname) missingFields.push("First Name");
    if (!lastname) missingFields.push("Last Name");
    if (!email) missingFields.push("Email");
    if (!contact) missingFields.push("Contact");
    if (!specialisation) missingFields.push("Specialisation");
    if (!experience) missingFields.push("Experience");
    if (!fee) missingFields.push("Consultation Fee");
    if (!medicalLicence) missingFields.push("Medical Licence");
    if (!password) missingFields.push("Password");
    if (!confirmPassword) missingFields.push("Confirm Password");
  
    if (missingFields.length > 0) {
      toast.error(`Please fill the following fields: ${missingFields.join(", ")}`);
      return;
    }

    const emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
   
    
    const contactRegex: RegExp = /^\d{10}$/;

    if (!contactRegex.test(contact)) {
      toast.error("Number should have 10 digits and only contain numbers.");
      return;
    }
     const regex = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;
      if (!regex.test(password)) {
        toast.error('Password must be at least 5 characters long and contain letters and numbers');
        return;
      }

    if(password!==confirmPassword)
    {
      toast.error("password doesnt mtch")
      return 
    }
    if (!profilePicture) {
      toast.error("Please select a profile picture.");
      return;
    }
    const formData = new FormData();
    formData.append("file",profilePicture );
    formData.append("upload_preset", "products");
  
   
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwerqkqou/image/upload",
          formData
        );
        const uploadedUrl:string = response.data.secure_url;


        if (!medicalLicence) {
          toast.error("Please select a profile picture.");
          return;
        }
      
        formData.append("file",medicalLicence );
        const response2 = await axios.post(
          "https://api.cloudinary.com/v1_1/dwerqkqou/image/upload",
          formData
        );
        const uploadedUrl2:string = response2.data.secure_url;
         console.log(uploadedUrl,uploadedUrl2)
    
    
      const result=await signup(firstname,lastname,email,contact,specialisation,experience,password,fee,additionalInfo,uploadedUrl,uploadedUrl2)
      if(result.message==="Doctor registered successfully")
      {
        toast.success("Doctor registered successfully")
        setFirstname('')
        setLastname('')
        setEmail('')
        setContact('')
        setSpecialisation('')
        setExperience(0)
        setFee(0)
        setAdditionalInfo('')
        setProfilePicture(undefined)
        setMedicalLicence(undefined)
        setPassword('')
        setConfirmPassword('')
        setTimeout(() => {
          navigate('/doctor/login')
        }, 2000);
      }
      else if(result==="Doctor with this email already exists")
      {
        toast.error("Email already exists")
      }
      else if(result==="Doctor with this phone number already exists")
      {
        toast.error("Phone number already exists")
      }
      else if(result==="Invalid email or password")
      {
        toast.error("Invalid email or password")
      }
      else
      {
        toast.error("Internal server error")
      }
           


  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <Toaster />
        <form
          className="bg-slate-200 p-6 rounded-2xl shadow-lg w-full max-w-lg max-h-screen overflow-y-auto"
          onSubmit={addformSub}
        >
          <h3 className="font-semibold text-center mb-6 text-gray-800 underline text-lg">
            Doctor Signup
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="first-name" className="block text-gray-700 text-sm font-normal">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-gray-700 text-sm font-normal">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-normal">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-gray-700 text-sm font-normal">
                Contact Number
              </label>
              <input
                type="tel"
                id="contact"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-normal">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-normal">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>


          <div className="mb-4">
            <label htmlFor="profile-picture" className="block text-gray-700 text-sm font-normal">
              Choose Profile Picture
            </label>
            <input
              type="file"
              id="profile-picture"
              className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
              onChange={(e) => setProfilePicture(e.target.files?.[0])}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
           <div>
          <label htmlFor="specialisation" className="block text-gray-700 text-sm font-normal">
            Specialisation
          </label>
          <select
            id="specialisation"
            className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
            value={specialisation}
            onChange={(e) => setSpecialisation(e.target.value)}
          >
            <option  disabled value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.deptname}
              </option>
            ))}
          </select>
        </div>

            <div>
              <label htmlFor="experience" className="block text-gray-700 text-sm font-normal">
                Year of Experience
              </label>
              <input
                type="number"
                id="experience"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your years of experience"
                min="0"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="fee" className="block text-gray-700 text-sm font-normal">
                Fee per Consultation
              </label>
              <input
                type="number"
                id="fee"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your consultation fee"
                 min="0"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="additional-info" className="block text-gray-700 text-sm font-normal">
                Additional Info
              </label>
              <input
                type="text"
                id="additional-info"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter any additional information"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="medical_licence" className="block text-gray-700 text-sm font-normal">
              Choose Medical Licence
            </label>
            <input
              type="file"
              id="medical_licence"
              className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
              onChange={(e) => setMedicalLicence(e.target.files?.[0])}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-white-blue-700 mt-2"
          >
            Sign Up
          </button>
          <p className="text-center">Already have an account? <Link to="/doctor/login" className="text-blue-500 hover:text-violet-600">Login</Link></p>

        </form>
      </div>
    </div>
  );
}

export default Signup;
