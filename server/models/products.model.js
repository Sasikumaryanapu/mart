import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // count:Number
  },
  {
    timestamps: true, 
    collection: "products",
    strict: false,    
  }
);

const productModel = mongoose.model("products", productSchema);
export default productModel;
