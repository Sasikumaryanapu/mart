import mongoose from "mongoose";

const Schema = mongoose.Schema;
const orderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderAddressSchema = new Schema({
    landmark: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pincode: { type: String, required: true }
  });

const ordersSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  items: [orderItemSchema],
  address:orderAddressSchema,
  total: { type: Number, default: 0 }
});

const ordersModel = mongoose.model("orders", ordersSchema);

export default ordersModel;

