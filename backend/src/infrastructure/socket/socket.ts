
import { Server } from 'socket.io'
const users: Record<string, string> = {};
export const registerSocketEvents = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
    
     socket.on('register', (userId) => {
        users[userId] = socket.id;
      });
       
      socket.on('privateMessage', (data) => {
        const {to,message}=data
        const recipientSocketId= users[to];
        if(recipientSocketId){
          io.to(recipientSocketId).emit('privateMessage', {
            from: socket.id,
            message: message
          });  
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
