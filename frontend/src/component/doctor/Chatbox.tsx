import { useState, useEffect, useRef } from 'react';
import { socket } from '../../socket';
import { geteverymessage, deletMessage,Messagetimeadding } from '../../api/doctorapi/chat';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import toast, { Toaster } from 'react-hot-toast';
import type { Message, MessagePayload } from '../../Interface/interface';

function Chatbox({ userid, name,setSort }: { userid: string; name: string,setSort:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imageurl, setImageurl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [del, setDel] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.doctor.doctorInfo);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getAllMessages = async () => {
    const result = await geteverymessage(userid);
    if (result === 'No conversation found') {
      setMessages([]);
    } else {
      setMessages(result);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getAllMessages();
  }, [userid, del]);

  useEffect(() => {
    if (!userid || !user?._id) return;
    socket.emit('read', `${userid}_${user?._id}`);
  }, [user?._id, userid]);

  useEffect(() => {
    const sort = (id1: string, id2: string) => [id1, id2].sort().join('_');
    if (!userid || !user?._id) return;
    const roomId = sort(userid, user._id);
    socket.emit('participant', { participantId: `${user?._id}_${userid}` });
    socket.emit('joinRoom', { roomId });

    return () => {
      socket.emit('leaveRoom', { roomId });
      socket.emit('leaveParticipant', { participantId: `${user?._id}_${userid}` });
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

  useEffect(() => {
    socket.on('messageReaded', getAllMessages);
    return () => {
      socket.off('messageReaded', getAllMessages);
    };
  }, []);

  const handleDelete = async (id: string) => {
    const result = await deletMessage(id, user?._id!, userid);
    if (result === 'Message deleted') {
      toast.success('Message deleted');
      setDel(!del);
    }
    setActiveMenuIndex(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setActiveMenuIndex(null);
  };

  const handleArrowClick = (index: number) => {
    setActiveMenuIndex((prev) => (prev === index ? null : index));
  };

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
        console.error('Upload failed:', err);
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
    await Messagetimeadding(userid)
    setSort(prev=>!prev)
    setMessage('');
    setFile(null);
    setImageurl(null);
  };

  const roomId = user?._id && userid ? [user._id, userid].sort().join('-') : '';

  const chat = messages.map((item, index) => {
    const isSender = user?._id === item?.senderId;
    const isDropdownOpen = activeMenuIndex === index;

    return (
      <div key={index} className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className="flex flex-col items-start max-w-xs relative">
          <div className="relative group">
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
                {isSender && (
                  <span
                    onClick={() => handleArrowClick(index)}
                    className="absolute bottom-1 right-1 text-sm text-black opacity-30 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    ↓
                  </span>
                )}
              </div>
            )}

            {item?.message && (
              <div
                className={`relative group px-4 py-2 rounded-lg break-words ${
                  isSender ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'
                }`}
              >
                {item.message}
                {isSender && (
                  <span
                    onClick={() => handleArrowClick(index)}
                    className="absolute bottom-1 right-1 text-sm text-black opacity-30 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    ↓
                  </span>
                )}
              </div>
            )}

            {isDropdownOpen && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-24 text-center z-50">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full flex flex-col items-center justify-center py-2 hover:bg-gray-100 rounded-md"
                >
                  <span className="text-lg">🗑️</span>
                  <span className="text-xs text-gray-700 mt-1">Delete</span>
                </button>
                {item?.message && (
                  <button
                    onClick={() => handleCopy(item?.message!)}
                    className="w-full flex flex-col items-center justify-center py-2 hover:bg-gray-100 rounded-md"
                  >
                    <span className="text-lg">📋</span>
                    <span className="text-xs text-gray-700 mt-1">Copy</span>
                  </button>
                )}
              </div>
            )}
          </div>
          {isSender && (
            <span className="text-xs text-gray-400 mt-1 self-end">
              {item.read ? '✓✓ Read' : '✓ Sent'}
            </span>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="py-4 px-4 h-[calc(100vh-4rem)]">
      <Toaster />
      <div className="flex flex-col h-full border border-gray-300 rounded-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-100">
          <div className="flex items-center gap-2">
            <a
              href={`/video/${roomId}?role=doctor&userId=${user?._id}`}
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
          <div className="text-md text-red-700">Chat with user {name}</div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {chat}
          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview */}
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

        {/* Input Area */}
        <div className="relative flex items-center gap-2 border-t border-gray-200 p-4">
          <button onClick={() => setShowEmoji(!showEmoji)} className="text-xl">😊</button>
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
            className={`px-4 py-2 text-white rounded-md transition ${(!message.trim() && !imageurl) || isUploading
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

export default Chatbox;
