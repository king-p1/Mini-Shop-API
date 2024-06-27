import {Router} from 'express'
import { createOrder,deleteOrder,updateOrder,getOrders,getSingleOrder } from '../controllers/orderControllers.js'


const router = Router()

router.get('/all-orders',getOrders)
router.get('/single-order/:id',getSingleOrder)
router.post('/create-order',createOrder)
router.put('/update-order/:id',updateOrder)
router.delete('/cancel-order/:id',deleteOrder)



export default router