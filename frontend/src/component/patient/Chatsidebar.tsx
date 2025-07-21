import {useEffect,useState,memo}from 'react'
import {getAlldoctorsbysort} from '../../api/userapi/doctor';
import {getUnreadCounts} from '../../api/userapi/chat'
import type{Idoctor} from '../../Interface/interface'
import { socket } from '../../socket';


function Chatsidebar ({getUserId,onlineuser,sort}:{getUserId:(id:string,name:string)=>void,onlineuser:string[],sort:boolean}) {
  type UnreadCounts = {
  [key: string]: number;
};
    const [search,setSearch]=useState<string>("")
    const[unreadcount,setUnreadcount]=useState<UnreadCounts>({});
      
    const [doctors, setDoctors] = useState<Idoctor[] | null>(null);
   useEffect(() => {
  const delayDebounce = setTimeout(() => {
    const fetchDoctors = async () => {
      try {
        const doctorData = await getAlldoctorsbysort(search);
        setDoctors(doctorData.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, 500); 

  return () => clearTimeout(delayDebounce); 
}, [search, sort]);


   useEffect(()=>{
     socket.on('notification',(data)=>{
      console.log(data)
        setUnreadcount(prev => ({
          ...prev,
          [data.reciever]: (prev[data.reciever] || 0) + data.count
        }))
      
        }) 
        
     return () => {
           socket.off('notification')
        }
   },[])

     useEffect(() => {
     const fetchUnreadCounts = async () => {
       try {
         const data = await getUnreadCounts(); 
         setUnreadcount(data);
       } catch (error) {
         console.log(error)
       }
     };
   
     fetchUnreadCounts();
   }, []);
  
  const getUser = (id: string,name:string) => {
    getUserId(id,name);

  }



const person = doctors?.map((item) => (
  <div
    key={item._id}
    className="flex items-center gap-3 p-3 hover:bg-green-100 cursor-pointer border-b relative"
    onClick={() => {
      getUser(item._id!, item.firstname!)
            setUnreadcount(prev => ({
          ...prev,
          [item._id!]:0
        }))
    
    }}
  >
    <div>
      <img
        src={`https://res.cloudinary.com/dwerqkqou/image/upload/${item.profilePicture}`}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    </div>
    <div className="flex flex-col flex-1">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-800">
          Dr. {item.firstname} {item.lastname}
        </p>
     
        {unreadcount[item._id!] > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadcount[item._id!]}
          </span>
        )}
      </div>
      <p className={`text-xs font-semibold ${onlineuser.includes(item?._id!) ? 'text-green-500' : 'text-gray-500'}`}>
        {onlineuser.includes(item._id!) ? 'Online' : 'Offline'}
      </p>
    </div>
  </div>
));
  return (
 
  <div className="w-64 bg-teal-50 shadow-xl p-4 flex flex-col gap-4  h-[calc(100vh-4rem)]">
  
    <div>
      <input
        type="text"
        placeholder="Search doctors..."
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e)=>setSearch(e.target.value)}
      />
    </div>


    <div className="flex flex-col gap-4 overflow-y-auto">
      {person}
    </div>
    
  </div>

   
  )
}

export default memo(Chatsidebar);