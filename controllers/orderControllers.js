import Product from "../models/Product.js";
import Order from "../models/Order.js";
 import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";


const createOrder = asyncHandler(async (req,res)=>{


    const { productID, quantity, status, address } = req.body;


    const product = await Product.findById(productID);

       if (!product) {
      return res.status(404).json({ message: 'Product not found, invalid productID' });
    }

    try {

        if (!productID || !quantity || !status || !address)  {
            return res.status(400).json({ mssg: `Please provide a valid productID, quantity, status, and address` });
        }


        const newOrder = await Order.create({
            productID,
            quantity,
            status: status || 'Pending',
            address,
          });
      
        res.status(201).json({
            mssg: 'Order placed Successfully',
            user: {
                orderID:newOrder.id,
                productID: newOrder.productID,
                quantity: newOrder.quantity,
                status: newOrder.status,
                address: newOrder.address
            }
        });
        
    } catch (error) {
        res.status(400).json({ mssg:"Failed to create order" ,error: error.message });

    }
})

const getOrders = asyncHandler(async(req,res)=>{
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({mssg:"All Orders retreived successfully" ,"Orders":orders});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


const getSingleOrder = asyncHandler(async(req,res)=>{
  const { id } = req.params;

    try {
        
        if(!id){
            res.status(501).json({mssg: 'Invalid orderID'})
        }
        const order = await  Order.findOne({id})
        if(!order) return res.status(501).json({ error : "Couldn't Find the Order"});
          return   res.status(201).json({"Order":order})
        
        
            } catch (error) {
                res.status(400).json({mssg: ' Cannot fetch Order data '})
            }
})


const updateOrder = asyncHandler(async (req,res)=>{
    try {
        const { id } = req.params;
    
        if (!id) {
          return res.status(400).json({ error: 'Please provide valid id ' });
        }
    
        const body = req.body;
    
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: id },
          body,
          { new: true, runValidators: true }
        )
    
        if (!updatedOrder) {
          return res.status(404).json({ error: 'Product Order not found' });
        }
    
        return res.status(200).json({ mssg: 'Order Data Updated', "Order": updatedOrder });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
})



const deleteOrder = asyncHandler(async (req,res)=>{
    
    const { id } = req.params;

    if (!id ) {
        return res.status(400).json({ error: 'Please provide a valid id ' });
    }
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid productID format' });
    }

    try {

        const order = await Order.findOneAndDelete({ _id: id });

        if (!order) return res.status(404).json({ message: 'Order not found' });
    
        return res.status(200).json({
            mssg: 'Order cancelled successfully',
            "Order": order
        });
      } catch (err) {
        return res.status(500).json({ error: 'Server error', details: err });
      }
})

export{
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getSingleOrder
}