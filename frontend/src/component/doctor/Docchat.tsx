import {useEffect,useState} from 'react'
import ChatSidebar from '../common/ChatSidebar'
import { useSelector } from 'react-redux';
import {socket} from '../../socket'
import type { RootState } from '../../app/store';
import Nochatselected from '../common/Nochatselected'
import Chatbox from '../common/Chatbox'
import DoctorSidebar from '../common/Docsidebar';
import { useLocation } from 'react-router-dom';

function Docchat() {
  const location = useLocation();
  const { userId} = location.state || {};
 const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);
 const[onlineuser,setOnlineuser]=useState([])
 const [userid,setUserid]=useState<string>("");
  const [name,setName]=useState<string>("");
   const[sort,setSort]=useState<boolean>(false)
  
 useEffect(()=>{
  if(userId)
  {
    console.log('doctor',doctor?._id)
    console.log(userId)
    setUserid(userId)
  }
 },[userId])
  useEffect(()=>{
    console.log('doctor',doctor?._id)
 },[])


 useEffect(() => {
  if (!doctor?._id) return;
  socket.emit('register', doctor._id, 'doctor');
  socket.on('online-users',(data)=>{
    setOnlineuser(data)
  })
  return () => {
    socket.off('online-users');
  };
}, [doctor?._id]);

 const getUserId=(id:string,name:string)=>{
      setUserid(id);
      setName(name)
    }
    
  return (
    <div className='flex flex-grow bg-gradient-to-br from-white via-emerald-50 to-cyan-100'>
      <div>
        <DoctorSidebar/>
      </div>
      <div className='ml-52'>
        <ChatSidebar getUserId={getUserId} onlineuser={onlineuser} sort={sort}/>  
      </div>
      <div className='flex-1 mt-6'>
        {userid===""?
        <Nochatselected/>:
         <Chatbox userid={userid} name={name} setSort={setSort} />
        }
      </div>
    </div>
  )
}

export default Docchat