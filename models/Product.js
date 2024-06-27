import  { Schema, model } from 'mongoose';
 


const productSchema = new Schema({
  name: { type: String, required: [true,"Product name is required"] },
  price: { type: Number, required: [true,"Product price is required"] },
  description: { type: String, required: [true,"Product description is required"] },
  available: { type: Boolean, default: true },
});

const Product= model('Product', productSchema);

export default Product