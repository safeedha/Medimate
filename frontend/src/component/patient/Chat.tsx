import {useEffect,useState} from 'react'
import Nochatselected from '../common/Nochatselected'
import Navbar from '../common/Navbar';
import ChatSidebar from '../common/ChatSidebar'
import {socket} from '../../socket'
import Chatbox from '../common/Chatbox';  
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';


function Chat() {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const[onlineuser,setOnlineuser]=useState<string[]>([])
 const [userid,setUserid]=useState<string>("");
 const [name,setName]=useState<string>("");
 const[sort,setSort]=useState<boolean>(false)




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
      <ChatSidebar getUserId={getUserId} onlineuser={onlineuser} sort={sort}/>
      <div className='flex-1 bg-teal-50'>
        {userid===""?
        <Nochatselected/>:
         <Chatbox userid={userid} name={name} setSort={setSort}/>
        }
      
      </div>

    </div>
    </>
  
  )
}

export default Chat