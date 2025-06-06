import {useEffect,useState}from 'react'
import { getAlldoctors } from '../../api/userapi/doctor';
import type{Idoctor} from '../../Interface/interface'


function Chatsidebar({getUserId,onlineuser}:{getUserId:(id:string,name:string)=>void,onlineuser:string[]}) {
     const [singledepartment,setSingledepartment]=useState<string>("")
    const [search,setSearch]=useState<string>("")
    const [doctors, setDoctors] = useState<Idoctor[] | null>(null);
 useEffect(() => {
     const fetchDoctors = async () => {
       const doctorData = await getAlldoctors(singledepartment,search);
       setDoctors(doctorData);
     };
 
     fetchDoctors();
   }, [singledepartment,search]);

  const getUser = (id: string,name:string) => {
    getUserId(id,name);

  }

   const person = doctors?.map((item) => (
  <div
    key={item._id}
    className="flex items-center gap-3 p-3 hover:bg-green-100 cursor-pointer border-b"
    onClick={() => getUser(item._id!,item.firstname!)}
  >
    <div>
      <img
        src={item.profilePicture}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    </div>
    <div className="flex flex-col">
      <p className="text-sm font-medium text-gray-800">
        Dr. {item.firstname} {item.lastname}
      </p>
      <p className={`text-xs font-semibold ${onlineuser.includes(item._id) ? 'text-green-500' : 'text-gray-500'}`}>
        {onlineuser.includes(item._id!) ? 'Online' : 'Offline'}
      </p>
    </div>
  </div>
));


  return (
 
  <div className="w-64 bg-teal-50 shadow-xl p-4 flex flex-col gap-4  h-[calc(100vh-4rem)]">
    
    {/* Search Box */}
    <div>
      <input
        type="text"
        placeholder="Search doctors..."
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Doctor List */}
    <div className="flex flex-col gap-4 overflow-y-auto">
      {person}
    </div>
    
  </div>

   
  )
}

export default Chatsidebar