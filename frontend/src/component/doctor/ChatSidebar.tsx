
import { useEffect, useState } from 'react';
import type { Iuser } from '../../Interface/interface';
import {getUnreadCounts,getAlluserbysort } from '../../api/doctorapi/chat';
import { socket } from '../../socket';


const ChatSidebar = ({getUserId,onlineuser,sort}:{getUserId:(id:string,name:string)=>void,onlineuser:string[],sort:boolean}) => {
    type UnreadCounts = {
  [key: string]: number;
};
 
  const [users, setUsers] = useState<Iuser[]>([]);
  const[search,setSearch]=useState('')
  const[unreadcount,setUnreadcount]=useState<UnreadCounts>({});
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchUsers = async () => {
        try {
          const response = await getAlluserbysort(search);
          if (response) {
            setUsers(response.users);
          } else {
            setUsers([]);
            console.error('No users found');
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [search, sort]);

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
  

  const getUser = (id: string,name:string) => {
    getUserId(id,name);
  }
const person = users?.map((item, index) => {
  const profileImg = `https://i.pravatar.cc/150?img=${index + 1}`;

  return (
    <div
      key={item._id}
      className="flex items-center gap-3 p-3 hover:bg-green-100 cursor-pointer border-b relative"
      onClick={() => {
        getUser(item._id!, item.firstname!);
        setUnreadcount((prev) => ({
          ...prev,
          [item._id!]: 0,
        }));
      }}
    >
      <div>
        <img
          src={profileImg}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-800">
            {item.firstname} {item.lastname}
          </p>
          {unreadcount[item._id!] > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadcount[item._id!]}
            </span>
          )}
        </div>
        <p
          className={`text-xs font-semibold ${
            onlineuser.includes(item._id!)
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          {onlineuser.includes(item._id!) ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
});

  return (
    <div className='px-2  w-64 overflow-auto h-screen flex flex-col gap-2 bg-gradient-to-br from-white via-emerald-50 to-cyan-100'>
      <div className='fixed mt-3'>
      <input
        type="text"
        placeholder="Search doctors..."
        onChange={(e)=>setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 "
      />
    </div >
    <div className='mt-12'>
      {person}
    </div>
      
    </div>
  );
};

export default ChatSidebar;
