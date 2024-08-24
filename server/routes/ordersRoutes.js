import mongoose from "mongoose";
import { Router } from "express";
import ordersModel from "../models/orders.model.js";
const router = Router();

//create new cart
router.post('/', async (req, res) => {
  const { userId, items, address, total } = req.body;

  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid input: userId and items are required and items must be an array' });
  }

  if(!address){
    return res.status(400).json({ message: 'Address details are required' });
  }

  if (isNaN(total)) {
    return res.status(400).json({ message: 'Invalid total value' });
  }

  try {
    let order = await ordersModel.findOne({ userId });

    // if (order) {
    //   items.forEach(item => {
    //     const itemIndex = order.items.findIndex(i => i.productId.toString() === item.productId.toString());

    //     if (itemIndex > -1) {
    //       console.log('hello')
    //         order.items[itemIndex].quantity += item.quantity;
    //         order.items[itemIndex].price = item.price;
    //     } else {
    //         order.items.push(item);
    //     }
    //   });

    //   order.address = address;
    //   order.total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // } else {
        order = new ordersModel({
        userId,
        items,
        address,
        total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      });
    // }

    await order.save();

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error('Error updating Order:', error);
    res.status(500).json({ message: 'Error updating Order', error });
  }
});
  
//   // Get a cart by user ID
  router.get('/:userId', async (req, res) => {
    try {
   
      const order = await ordersModel.findOne({userId:req.params.userId}).populate({
        path: 'items.productId', 
        model: 'products', 
        select: 'name price imageUrl'
      });
      
  
      // if (cart.length === 0) return res.status(404).json({ message: 'cart not found' });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
//   // Add an item to the cart
//   router.put('/:userId', async (req, res) => {
//     try {
//       const cart = await cartModel.findOne({ userId: req.params.userId});
//       if (!cart) return res.status(404).json({ message: 'cart not found' });
  
//       const { productId, quantity,total } = req.body;
//       const itemIndex = cart.items.findIndex(item => item.productId == productId);
  
//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity = quantity;
//         cart.total = total
//       } else {
//         cart.items.push({ productId, quantity,total});
//       }
  
//       const updatedCart = await cart.save();
//       res.status(200).json(updatedCart);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Remove an item from the cart
//   router.delete('/:userId/:productId', async (req, res) => {
//     try {
//       const cart = await cartModel.findOne({ userId: new mongoose.Types.ObjectId(req.params.userId) });
      
//       if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//       }
  
//       cart.items = cart.items.filter(item => !item.productId.equals(new mongoose.Types.ObjectId(req.params.productId)));
  
//       cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
//       const updatedCart = await cart.save();
  
//       const populatedCart = await cartModel.findById(updatedCart._id)
//         .populate({
//           path: 'items.productId',
//           model: 'products',
//           select: 'name imageUrl price' 
//         });
  
//       res.status(200).json(populatedCart);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
  
  export default router;