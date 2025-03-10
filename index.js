import express from 'express'
import * as  dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.disable('x-powered-by')


app.use((req, res, next) =>{
    console.log(req.path,req.method)
    next();
})

const PORT = process.env.PORT
app.get('/',  async (req, res) => {
    res.json({msg:`Mini Shop API is Live`})
})

app.use('/api/v1/products',productRoutes)
app.use('/api/v1/orders',orderRoutes)

app.use(notFound)
app.use(errorHandler)




const MONGO_DB_URL = process.env.MONGO_URI
const connectDB = async (url) =>{
    mongoose.set('strictQuery', true)
  await mongoose.connect(url)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err =>console.log('MongoDB Error:',err))
}
const runServer = async () =>{
    try {
        await connectDB(MONGO_DB_URL)
        app.listen(PORT, ()=> console.log(`Server live on port ${PORT}`))
       } catch (error) {
           console.log(error)
           process.exit(1)
       }}

runServer()















// oladelex4
// XpoIYSwGP1ThNYon
