import React, { useState,useEffect } from 'react';
import {socket} from '../../socket'
import {geteverymessage} from '../../api/doctorapi/chat'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

function Chatbox({userid}:{userid:string}) {
  const [message, setMessage] = useState('');
   const user = useSelector((state: RootState) => state.doctor.doctorInfo);
  const [messages,setMessages]=useState([])
   const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};
  useEffect(()=>{
    const getAllmeassge=async()=>{
    const result=await geteverymessage(userid)
    if(result==='No conversation found')
    {
      setMessages([])
    }
    else{
       setMessages(result)
    }
  
    }
    getAllmeassge()
    },[userid])
  useEffect(() => {
    socket.on('privateMessage', (data) => {
      console.log('Private message from:', data); 
          setMessages((prev)=>[...prev,data])    
    });
 
    return () => {
      socket.off('privateMessage'); 
    }
  },[])

  const handleSend = () => {
      socket.emit('privateMessage', { to: userid, message: message });
      setMessage('')
    };

    useEffect(() => {
  scrollToBottom();
   }, [messages])

   const chat = messages.map((item, index) => {
  const isSender = user?._id === item?.senderId;

  return (
    <div
      key={index}
      className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <p className={`px-4 py-2 rounded-lg ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {item?.message}
      </p>
    </div>
  );
});

  return (
    <div className="py-4 px-4 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full border border-gray-300 rounded-md">  
        <div className="flex-1 overflow-y-auto p-4">
        {chat}
          
         <div ref={messagesEndRef} />        
        </div>

       
        <div className="flex items-center gap-2 border-t border-gray-200 p-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;