import {useEffect,useState} from 'react'
import ChatSidebar from './ChatSidebar'
import { useSelector } from 'react-redux';
import {socket} from '../../socket'
import type { RootState } from '../../app/store';
import Nochatselected from './Nochatselected'
import Chatbox from './Chatbox'
import DoctorSidebar from './Docsidebar';
import { useLocation } from 'react-router-dom';

function Docchat() {
  const location = useLocation();
  const { userId} = location.state || {};
 const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);
 const[onlineuser,setOnlineuser]=useState([])
 const [userid,setUserid]=useState<string>("");
  
 useEffect(()=>{
  if(userId)
  {
    console.log(userId)
    setUserid(userId)
  }
  
 },[userId])

 useEffect(() => {
  if (!doctor?._id) return;

  const handleConnect = () => {
    socket.emit('register', doctor._id, 'doctor');
  };

  socket.on('connect', handleConnect);
  socket.on('online-users',(data)=>{
    setOnlineuser(data)
  })

  return () => {
    socket.off('connect', handleConnect);
    socket.off('online-users');
  };
}, [doctor?._id]);

 const getUserId=(id:string)=>{
      setUserid(id);
    }
    
  return (
    <div className='flex flex-grow bg-gradient-to-br from-white via-emerald-50 to-cyan-100'>
      <div>
        <DoctorSidebar/>
      </div>
      <div className='ml-52'>
        <ChatSidebar getUserId={getUserId} onlineuser={onlineuser}/>  
      </div>
      <div className='flex-1 mt-6'>
        {userid===""?
        <Nochatselected/>:
         <Chatbox userid={userid}/>
        }
      </div>
    </div>
  )
}

export default Docchat