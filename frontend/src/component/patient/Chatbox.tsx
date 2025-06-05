import { useState, useEffect, useRef } from 'react';
import { socket } from '../../socket';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { geteverymessage } from '../../api/userapi/chat';
import { useNavigate } from 'react-router-dom';

function Chatbox({ userid }: { userid: string }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const user = useSelector((state: RootState) => state.user.userInfo);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const getAllmessage = async () => {
      const result = await geteverymessage(userid);
      if (result === 'No conversation found') {
        setMessages([]);
      } else {
        setMessages(result);
      }
    };
    getAllmessage();
  }, [user?._id, userid]);

  useEffect(() => {
    socket.on('privateMessage', (data) => {
      console.log('Private message from:', data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('privateMessage');
    };
  }, []);
    

  useEffect(()=>{
   socket.emit('markAsRead', { from: user?._id, to: userid });
  },[userid ])


  const handleSend = () => {
    
    socket.emit('privateMessage', { to: userid, message: message });
    setMessage('');
  };

  const chat = messages.map((item, index) => {
    const isSender = user?._id === item?.senderId;

    return (
      <div
        key={index}
        className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}
      >
        <p
          className={`px-4 py-2 rounded-lg ${
            isSender
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          {item?.message}
        </p>
      </div>
    );
  });

  const videoLink = user?._id
    ? `/video/${[user._id, userid].sort().join('-')}`
    : '#';

  return (
    <div className="py-4 px-4 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full border border-gray-300 rounded-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-100 rounded-t-md">
          <div className="flex items-center gap-2">
            {/* Video Call Icon as Anchor Link */}
            {user?._id && (
              <a
                href={videoLink}
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
            )}
            <span className="font-semibold text-lg">Chat Room</span>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {chat}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
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
            disabled={!message.trim()} // ✅ Disable if message is empty or just spaces
            className={`px-4 py-2 text-white rounded-md transition 
              ${!message.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
