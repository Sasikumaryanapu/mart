import mongoose from "mongoose";

const Schema = mongoose.Schema;
const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  items: [cartItemSchema],
  total: { type: Number, default: 0 }
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;

