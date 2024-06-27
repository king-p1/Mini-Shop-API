import Product from "../models/Product.js";
 import asyncHandler from 'express-async-handler';
import mongoose from "mongoose";


//POST REQUEST 
const createProduct = asyncHandler(async (req, res) => {  
   const {name,price,description,available} = req.body

   if (!name || !price || !description || !available)  {
    return res.status(400).json({ mssg: `Please provide a name, price, description, and availabilty status` });
}

   try {
    
    const productDesc = await Product.findOne({ description });  
 
    if (productDesc) {
        return res.status(400).json({ mssg: 'Product with this descrition already exists.' });
    }

    
   
    const newProduct = await Product.create({
        name,price,description,available    });
  
    res.status(201).json({
        mssg: 'Product created Successfully',
        product: {
            id:newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description,
            available: newProduct.available
        }
    });



   } catch (error) {
    res.status(400).json({ mssg: 'Invalid product data', error: error.message });
   }
});




// GET REQUESTS
const getProducts = asyncHandler( async (req, res) => { 
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json({mssg:"All Products retreived successfully" ,"Products":products});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

 

const getProduct = asyncHandler( async (req, res) => { 
    const { id,name } = req.params;

    try {
        if(!name){
            res.status(501).json({mssg: 'Invalid Product name'})
        }

        if(!id){
            res.status(501).json({mssg: 'Invalid UserID'})
        }
        const product = await  Product.findOne({ id,name })
        if(!product) return res.status(501).json({ error : "Couldn't Find the Product"});
          return   res.status(201).json({"Product":product})
        
        
            } catch (error) {
                res.status(400).json({mssg: ' Cannot fetch Product data '})
            }
  });
// GET REQUESTS


// PUT REQUESTS


const updateProduct = asyncHandler(async (req, res) => {
    try {
      const { id, name } = req.params;
  
      if (!id || !name) {
        return res.status(400).json({ error: 'Please provide both id and product name as parameters' });
      }
  
      const body = req.body;
  
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id, name },
        body,
        { new: true, runValidators: true }
      )
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      return res.status(200).json({ mssg: 'Product Data Updated', "Product": updatedProduct });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });



// DELETE REQUESTS

const deleteProduct = async (req, res) => {
    const {id, name } = req.params;

    if (!id || !name) {
        return res.status(400).json({ error: 'Please provide both id and Product name' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid productID format' });
    }

    try {
        const product = await Product.findOneAndDelete({ _id: id, name });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({
            mssg: 'Product deleted successfully',
            "Product": product
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error', details: err });
    }
};


// DELETE REQUESTS




export { createProduct,getProducts,getProduct,updateProduct,deleteProduct };
