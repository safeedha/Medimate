import {useEffect,useState} from 'react'
import Chatsidebar from './Chatsidebar'
import Navbar from './Navbar';
import Nochatselected from './Nochatselected'
import {socket} from '../../socket'
import Chatbox from './Chatbox';  
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

function Chat() {
  const user = useSelector((state: RootState) => state.user.userInfo);
 const [userid,setUserid]=useState<string>("");
 useEffect(() => {
   socket.emit('register', user?._id!,'from user');
}, []);

  const getUserId=(id:string)=>{
      setUserid(id);
    }
  return (
  
    <>
    <Navbar/>
    <div className='flex flex-row mt-16'>
      <Chatsidebar getUserId={getUserId}/>
      <div className='flex-1 bg-teal-50'>
        {userid===""?
        <Nochatselected/>:
         <Chatbox userid={userid}/>
        }
      
      </div>

    </div>
    </>
  
  )
}

export default Chat