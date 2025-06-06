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
  const[onlineuser,setOnlineuser]=useState<string[]>([])
 const [userid,setUserid]=useState<string>("");
 const [name,setName]=useState<string>("");




useEffect(() => {
  if (!user?._id) return;
  socket.emit('register', user._id, 'user');
  socket.on('online-users',(data)=>{
    setOnlineuser(data)
  })
  return () => {
    socket.off('online-users');
  };
}, [user?._id]);

  const getUserId=(id:string,name:string)=>{
      setUserid(id);
      setName(name)
    }
  return (
  
    <>
    <Navbar/>
    <div className='flex flex-row mt-16'>
      <Chatsidebar getUserId={getUserId} onlineuser={onlineuser} />
      <div className='flex-1 bg-teal-50'>
        {userid===""?
        <Nochatselected/>:
         <Chatbox userid={userid} name={name}/>
        }
      
      </div>

    </div>
    </>
  
  )
}

export default Chat