import  { Schema, model } from 'mongoose';

 

const orderSchema = new Schema({
  productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: [true,"Please enter a valid amount"] },
  status: { type: String, default: 'Pending' },
  address: { type: String, required:[true, "Please provide a valid address"] },
});

const Order = model('Order', orderSchema);

export default Order