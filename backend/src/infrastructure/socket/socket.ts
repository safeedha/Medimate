import {SaveMessage} from  "../../application/usecase/conversation/SaveMessage"
import {MongoConversationRepo}  from '../repository/ConversationRepositoryImpl.ts'
import {MongoNotification} from  '../repository/NotificationRepositoryImpl'
import {ReadMessageStatus} from  "../../application/usecase/conversation/ChangeReadStatus"
import {Addnotification} from  "../../application/usecase/notification/Addnotification"

const mongoConversationRepo=new MongoConversationRepo()
const mongoNotification=new MongoNotification()
const savemessage=new SaveMessage(mongoConversationRepo)
const messageread=new ReadMessageStatus(mongoConversationRepo)
const addnotification=new Addnotification(mongoNotification)

import { Server } from 'socket.io'
const users: Record<string, string[]> = {};
const notification: Record<string, string[]> = {};
const participant: Record<string, string[]> = {};
export const registerSocketEvents = async(io: Server) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)    
     socket.on('register', (userId) => {  
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

      socket.on('notification', (Id) => {
        if (notification[Id]) {
          if (!notification[Id].includes(socket.id)) {
            notification[Id].push(socket.id);
          }
        } else {
          notification[Id] = [socket.id];
        }
      });
        socket.on("joinRoom1", (userId) => {
          socket.join(userId);
          console.log(`User ${userId} joined their personal room`);
        });
        socket.on("leaveRoom1", (userId) => {
          socket.leave(userId);
          console.log(`User ${userId} left their personal room`);
        });
        socket.on('notification_message',async(data)=>{
        await addnotification.addnotification(data.userId,data.doctorId,data.message,data.type)
        console.log('he')
        io.to(data.userId).emit('notification_count', 1,data.message);
      })

    socket.on('read',(data)=>{
      if (participant[data] && participant[data].length > 0)
        {
          const recieverSocket=participant[data]
           recieverSocket.forEach((socketId) => {
          io.to(socketId).emit('messageReaded' ,true);
          });
        }
    })
      
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
        let messages=await savemessage.MessageSave(from,to,message,image)
        console.log('this is message',messages)
     if (!participant[`${to}_${from}`] || participant[`${to}_${from}`].length === 0)
        {
          const senderSockets = users[to] || [];
          senderSockets.forEach((socketId) => {
          io.to(socketId).emit('notification' ,{count:1,reciever:from});
          });
        } 
        else{
           messages=await messageread.readmessage(messages!._id!)
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

