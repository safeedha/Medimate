import {SaveMessage} from  "../../application/usecase/conversation/saveMessage"
import {MongoConversationRepo}  from '../../infrastructure/repository/mongoconverRep'

const mongoConversationRepo=new MongoConversationRepo()
const savemessage=new SaveMessage(mongoConversationRepo)
import { Server } from 'socket.io'
const users: Record<string, string> = {};
export const registerSocketEvents = async(io: Server) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
    
     socket.on('register', (userId,role) => {
      if(role)
      {
        console.log(role)
      }
      console.log(userId)
        users[userId] = socket.id;
        socket.data.userId = userId;
      });
      //  const message=await savemessage.MessageSave()
      socket.on('privateMessage', async(data) => {
        const {to,message}=data
            const from = socket.data.userId;
          // const messages=await savemessage.MessageSave(from,to,message)
        const recipientSocketId= users[to];
        io.to(socket.id).emit('privateMessage' ,message);  
        if(recipientSocketId){
          io.to(recipientSocketId).emit('privateMessage' ,message);  
        }
      })

    socket.on('send-message', (data) => {
      console.log('Message received:', data)
      io.emit('receive-message', data)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })
}
