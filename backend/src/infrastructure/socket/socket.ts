import {SaveMessage} from  "../../application/usecase/conversation/saveMessage"
import {MongoConversationRepo}  from '../../infrastructure/repository/mongoconverRep'
import {Messageread} from  "../../application/usecase/conversation/changereadstatus"
import {MessageModel} from '../database/models/message'
const mongoConversationRepo=new MongoConversationRepo()
const savemessage=new SaveMessage(mongoConversationRepo)
const messageread=new Messageread(mongoConversationRepo)
import { Server } from 'socket.io'
const users: Record<string, string[]> = {};
const participant: Record<string, string[]> = {};
export const registerSocketEvents = async(io: Server) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)    
     socket.on('register', (userId,role) => {
      
        if (users[userId]) {
        if (!users[userId].includes(socket.id)) {
          users[userId].push(socket.id);
        }
      } else {
        users[userId] = [socket.id];
      }
        socket.data.userId = userId;
        io.emit('online-users',Object.keys(users))
      });

      
  socket.on('participant', ({participantId}) => {  
  if (!participant[participantId]) {  
    participant[participantId] = [];
  }
  if (!participant[participantId].includes(socket.id)) {
    participant[participantId].push(socket.id);
  }
  console.log(participant)
});

socket.on('leaveParticipant', ({participantId}) => {
  if (participant[participantId]) {
    participant[participantId] = participant[participantId].filter(id => id !== socket.id);
    console.log('Participant list (after leave):', participant);
  }
});


    socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`✅ Socket ${socket.id} joined room ${roomId}`);
  });


  socket.on('leaveRoom', ({ roomId }) => {
    socket.leave(roomId);
    console.log(`❌ Socket ${socket.id} left room ${roomId}`);
  });
      
    socket.on('privateMessage', async({ from, to, message=null,image=null, roomId }) => {
        const messages=await savemessage.MessageSave(from,to,message,image)
     if (!participant[`${to}_${from}`] || participant[`${to}_${from}`].length === 0)
        {
          const senderSockets = users[to] || [];
          senderSockets.forEach((socketId) => {
          io.to(socketId).emit('notification' ,{count:1,reciever:from});
          });
        } 
        else{
          console.log('hey')
          const result=await messageread.readmessage(from,to)
          console.log(result)
        }
   
    io.to(roomId).emit('privateMessage', messages);
  });


  
  

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
      const userId = socket.data.userId;

      if (userId && users[userId]) {
        users[userId] = users[userId].filter(id => id !== socket.id);
        if (users[userId].length === 0) {
          delete users[userId];
        }
      }
    })
  })
}

