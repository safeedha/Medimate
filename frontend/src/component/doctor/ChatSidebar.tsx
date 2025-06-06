
import { useEffect, useState } from 'react';
import type { Iuser } from '../../Interface/interface';
import { getAlluser } from '../../api/doctorapi/chat';

const ChatSidebar = ({getUserId,onlineuser}:{getUserId:(id:string,name:string)=>void,onlineuser:string[]}) => {
  const [users, setUsers] = useState<Iuser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAlluser();
        if (response) {
          setUsers(response);
        } else {
          console.error('No users found');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const getUser = (id: string,name:string) => {
    getUserId(id,name);
  }
const person = users?.map((item, index) => {
  const profileImg = `https://i.pravatar.cc/150?img=${index + 1}`;

  return (
    <div
      key={item._id}
      className="flex items-center justify-start gap-3 p-3 hover:bg-green-100 cursor-pointer border-b h-16"
      onClick={() => {
        getUser(item._id!,item.firstname!);
      }}
    >
      <div>
        <img
          src={profileImg}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-medium text-gray-800">{item.firstname}</p>
        <p
          className={`text-xs font-semibold ${
            onlineuser.includes(item?._id!) ? "text-green-500" : "text-gray-500"
          }`}
        >
          {onlineuser.includes(item?._id!) ? "Online" : "Offline"}
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
