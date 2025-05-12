import {App} from './app'
const appInstances=new App()
import { connectToDatabase } from '../infrastructure/config/dbconnection';
import dotenv from 'dotenv'

dotenv.config()
const port=process.env.PORT||3000;

connectToDatabase()
appInstances.app.listen(3000,()=>{
    console.log(`server is running on port ${port}`)
    console.log(`http://localhost:${port}`)
})