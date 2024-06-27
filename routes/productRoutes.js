import {Router} from 'express'
import { getProduct,createProduct,deleteProduct,getProducts,updateProduct } from '../controllers/productControllers.js'



const router = Router()

// POST REQUEST
router.post('/create-product',createProduct)
 

// GET REQUEST
router.get('/get-all-products',getProducts)
router.get('/get-single-product/:id/:name',getProduct)


// PUT REQUEST
router.put('/update-product/:id/:name',updateProduct)


// DELETE REQUEST
router.delete('/delete-product/:id/:name',deleteProduct)


export default router