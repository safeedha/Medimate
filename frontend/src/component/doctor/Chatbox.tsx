import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../socket';
import { geteverymessage } from '../../api/doctorapi/chat';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

function Chatbox({ userid ,name}: { userid: string,name:string }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.doctor.doctorInfo);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const getAllMessages = async () => {
      const result = await geteverymessage(userid);
      if (result === 'No conversation found') {
        setMessages([]);
      } else {
        setMessages(result);
      }
    };
    getAllMessages();
  }, [userid]);

  useEffect(() => {
    socket.on('privateMessage', (data) => {
      console.log('Private message from:', data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('privateMessage');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    socket.emit('privateMessage', { to: userid, message: message });
    setMessage('');
  };

  const roomId = user?._id && userid ? [user._id, userid].sort().join('-') : '';

  const chat = messages.map((item, index) => {
    const isSender = user?._id === item?.senderId;

    return (
      <div
        key={index}
        className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}
      >
        <p
          className={`px-4 py-2 rounded-lg ${
            isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {item?.message}
        </p>
      </div>
    );
  });

  return (
    <div className="py-4 px-4 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full border border-gray-300 rounded-md">

   
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-100">
  {/* Left Side */}
  <div className="flex items-center gap-2">
    <a
      href={`/video/${roomId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0-4v4m-1 4H5a2 2 0 01-2-2V8a2 2 0 012-2h9a2 2 0 012 2v8a2 2 0 01-2 2z"
        />
      </svg>
    </a>
    <span className="font-semibold text-lg">Chat Room</span>
  </div>

 
  <div className="text-md text-red-700">
    Chat with user {name}
  </div>
</div>


        
        <div className="flex-1 overflow-y-auto p-4">
          {chat}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
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
