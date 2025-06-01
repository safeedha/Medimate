import {useEffect,useState} from 'react'
import ChatSidebar from './ChatSidebar'
import { useSelector } from 'react-redux';
import {socket} from '../../socket'
import type { RootState } from '../../app/store';
import Nochatselected from './Nochatselected'
import Chatbox from './Chatbox'

function Docchat() {
 const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);
 const [userid,setUserid]=useState<string>("");
  useEffect(() => {
    socket.emit('register', doctor?._id!,'from doctor');
 }, []);

 const getUserId=(id:string)=>{
      setUserid(id);
    }
  return (
    <div className='flex flex-grow'>
      <ChatSidebar getUserId={getUserId}/>
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