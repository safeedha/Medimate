import { useState, useEffect, useRef,memo } from 'react';
import { socket } from '../../socket';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { geteverymessage } from '../../api/userapi/chat';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react'
import type { Message,MessagePayload} from '../../Interface/interface';

function Chatbox({ userid, name }: { userid: string; name: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imageurl, setImageurl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const[showEmoji,setShowEmoji]=useState<boolean>(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


 const fetchMessages = async () => {
  if (!userid) return;
  const result = await geteverymessage(userid);
  setMessages(result === 'No conversation found' ? [] : result);
};

useEffect(() => {
  fetchMessages();
}, [user?._id, userid]);

useEffect(() => {
  socket.on('messageReaded', fetchMessages);
  return () => {
    socket.off('messageReaded', fetchMessages);
  };
}, []);




  useEffect(() => {
    if (!userid || !user?._id) return;  
   socket.emit('read', `${userid}_${user?._id}`)
}, [user?._id, userid]);



  useEffect(() => {
    if (!userid || !user?._id) return;    
    socket.emit('participant',{participantId: `${user?._id}_${userid}` })
    const roomId = [userid, user._id].sort().join('_');
    socket.emit('joinRoom', { roomId });
    return () => {
      socket.emit('leaveParticipant',{participantId: `${user?._id}_${userid}` });
      socket.emit('leaveRoom', { roomId });
    };
  }, [userid, user?._id]);

  useEffect(() => {
    socket.on('privateMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off('privateMessage');
    };
  }, []);

  const filehandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    e.target.value = '';
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => setImageurl(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleSend = async () => {
    if (!message.trim() && !imageurl) return;

    let uploadedUrl: string | null = null;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'products');

      setIsUploading(true);
      try {
        const res = await axios.post('https://api.cloudinary.com/v1_1/dwerqkqou/image/upload', formData);
        uploadedUrl = res.data.secure_url;
      } catch (err) {
        console.error('Image upload error:', err);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    const roomId = [user?._id, userid].sort().join('_');
    const newMessage: MessagePayload = {
      from: user?._id,
      to: userid,
      roomId,
    };

    if (message.trim()) newMessage.message = message;
    if (uploadedUrl) newMessage.image = uploadedUrl;

    socket.emit('privateMessage', newMessage);
    setMessage('');
    setFile(null);
    setImageurl(null);
  };



  const chat = messages.map((item, index) => {
  const isSender = user?._id === item?.senderId;

  return (
    <div
      key={index}
      className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div className="flex flex-col items-start max-w-xs">
        {/* Image Message */}
        {item?.image && (
          <div className="relative group mb-1 max-w-[200px] max-h-[200px]">
            <img
              src={item.image}
              alt="sent"
              className="rounded-lg border border-gray-300 shadow-sm object-cover cursor-pointer"
            />
            <a
              href={`${item.image}?fl_attachment=chat_image.jpg`}
              download
              className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded hover:bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ⬇ Download
            </a>
          </div>
        )}

        {/* Message Bubble */}
        {item?.message && (
          <div
            className={`px-4 py-2 rounded-lg break-words ${
              isSender
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-black self-start'
            }`}
          >
            {item.message}
          </div>
        )}

        {/* ✅ Read Receipt: shows for sender, even if just image */}
        {isSender && (
          <span className="text-xs text-gray-400 mt-1 self-end">
            {item.read ? '✓✓ Read' : '✓ Sent'}
          </span>
        )}
      </div>
    </div>
  );
});


  const roomId = user?._id && userid ? [user._id, userid].sort().join('-') : '';


  return (
    <div className="py-4 px-4 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full border border-gray-300 rounded-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-100">
          <div className="flex items-center gap-2">
            <a
              href={`/video/${roomId}?role=user&userId=${user?._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0-4v4m-1 4H5a2 2 0 01-2-2V8a2 2 0 012-2h9a2 2 0 012 2v8a2 2 0 01-2 2z" />
              </svg>
            </a>
            <span className="font-semibold text-lg">Chat Room</span>
          </div>
          <div className="text-md text-red-700">Chat with Dr: {name}</div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {chat}
          <div ref={messagesEndRef} />
        </div>

        {imageurl && (
          <div className="p-2 border-t border-gray-300 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={imageurl} alt="Preview" className="h-16 w-16 object-cover rounded-md" />
              {isUploading ? (
                <span className="text-sm text-blue-500 animate-pulse">Uploading...</span>
              ) : (
                <span className="text-sm text-gray-600">Image ready to send</span>
              )}
            </div>
            {!isUploading && (
              <button
                onClick={() => {
                  setFile(null);
                  setImageurl(null);
                }}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            )}
          </div>
        )}

     
    <div className="relative flex items-center gap-2 border-t border-gray-200 p-4">
      <button
        onClick={() => setShowEmoji(!showEmoji)}
        className="text-xl"
      >
        😊
      </button>


      {showEmoji && (
        <div className="absolute bottom-16 left-4 z-50">
          <div className="scale-90 origin-bottom-left shadow-lg rounded-md border border-gray-200">
            <EmojiPicker onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)} />
          </div>
        </div>
      )}

      <input type="file" accept="image/*" id="image-upload" className="hidden" onChange={filehandle} />
      <label htmlFor="image-upload" className="cursor-pointer text-blue-500 text-2xl">📎</label>

 
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />


      <button
        onClick={handleSend}
        disabled={(!message.trim() && !imageurl) || isUploading}
        className={`px-4 py-2 text-white rounded-md transition ${
          (!message.trim() && !imageurl) || isUploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isUploading ? 'Sending...' : 'Send'}
      </button>
    </div>

      </div>
    </div>
  );
}

export default memo(Chatbox);
