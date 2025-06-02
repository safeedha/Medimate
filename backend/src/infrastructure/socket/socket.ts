import {SaveMessage} from  "../../application/usecase/conversation/saveMessage"
import {MongoConversationRepo}  from '../../infrastructure/repository/mongoconverRep'

const mongoConversationRepo=new MongoConversationRepo()
const savemessage=new SaveMessage(mongoConversationRepo)
import { Server } from 'socket.io'
const users: Record<string, string[]> = {};
export const registerSocketEvents = async(io: Server) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
    
     socket.on('register', (userId,role) => {
      console.log(userId)
       if (users[userId]) {
        users[userId].push(socket.id);
      } else {
        users[userId] = [socket.id];
      }
        socket.data.userId = userId;
        io.emit('online-users',Object.keys(users))
      });

      
      //  const message=await savemessage.MessageSave()
      socket.on('privateMessage', async(data) => {
        const {to,message}=data
            const from = socket.data.userId;
            // console.log("hey")
            // console.log(from)
          const messages=await savemessage.MessageSave(from,to,message)
        
        const senderSockets = users[from] || [];
          senderSockets.forEach((socketId) => {
          io.to(socketId).emit('privateMessage' ,messages);
          });

         // Send to all tabs of the recipient
        const recipientSockets = users[to] || [];
        recipientSockets.forEach((socketId) => {
          io.to(socketId).emit('privateMessage', messages);
        });  
          
      })

  

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
      const userId = socket.data.userId;
      console.log('User disconnected:', socket.id);

      // Remove this socket from the user's socket list
      if (userId && users[userId]) {
        users[userId] = users[userId].filter(id => id !== socket.id);
        if (users[userId].length === 0) {
          delete users[userId];
        }
      }
    })
  })
}


