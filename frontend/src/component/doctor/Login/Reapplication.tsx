import bgImage from '../../../assets/doc.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useState,useEffect } from 'react';
import {getDepartment} from '../../../api/doctorapi/department'
import {reappliction} from "../../../api/doctorapi/doclogin"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
interface DepartmentProps {
  _id: string;
  deptname: string;
  description: string;
  createdAt: string;   
  updatedAt: string; 
}
function Reapplication() {

  const [email, setEmail] = useState<string>('');
  const [specialisation, setSpecialisation] = useState<string>('');
  const [experience, setExperience] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [medicalLicence, setMedicalLicence] = useState<File>();
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);

   useEffect(() => {
      async function getAllDepartment() {
        try {
          const result = await getDepartment();
          setDepartments(result);
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
    try{
       if(!email)
       {
         toast.error("Please fill email")
         return
       }
       if(!specialisation)
       {
          toast.error("Please fill specialisation")
          return
       }
         if(!experience)
       {
          toast.error("Please fill experience")
          return
       }
         if(!fee)
       {
          toast.error("Please fill fee field")
          return
       }
         if(!medicalLicence)
       {
          toast.error("Please fill medicalLicence field")
          return
       }
         const emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
          }
            const formData = new FormData();
            formData.append("file",medicalLicence );
            formData.append("upload_preset", "products");
            const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dwerqkqou/image/upload",
            formData
          );
          const uploadedUrl:string = res.data.secure_url;

       const response=await reappliction(email,specialisation,experience,fee,uploadedUrl)
       if(response==='Reapplication sucess')
       {
        toast.success("Your reapplication suceed")
        setTimeout(() => {
          navigate("/doctor/login")
        }, 2000);
       }
       else{
        toast.error(response)
       }
    }
    catch(error)
    {
         console.log(error)
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
            Reapplication form
          </h3>


            

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
            Submit
          </button>
        

        </form>
      </div>
    </div>
  );
}

export default Reapplication;
