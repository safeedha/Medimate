import { App } from './app';
import { connectToDatabase } from '../infrastructure/config/dbconnection';
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { registerSocketEvents } from '../infrastructure/socket/socket';

dotenv.config();

const appInstances = new App();
const server = createServer(appInstances.app);

const io = new Server(server, {
  cors: {
    origin:'https://www.medi-mate.safeedha.site',
    credentials: true
  }
});

registerSocketEvents(io);

const port = process.env.SERVERPORT 
console.log(port)

connectToDatabase();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
