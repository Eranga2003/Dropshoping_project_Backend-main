import Order from "../models/oder.js";
import { isCustomer } from "./usercontroller.js";



export async function createOrder(req,res){

    if(!isCustomer){
      res.json({
        message: "Please login as customer to create orders"
      })
    }

    try{
      const latestOrder = await Order.find().sort({date : -1}).limit(1) //search and show only one iteam 

      let orderId
     // If no orders exist in the database
      if(latestOrder.length == 0){
        orderId = "CBC0001"   // If no orders exist, start with CBC0001
      }else{
        // Get the current order ID from the latest order
        const currentOrderId = latestOrder[0].orderId
  
        const numberString =  currentOrderId.replace("CBC","")  //remove CBC and sspace from current oder id 
  
        const number = parseInt(numberString)  // Convert the numeric part of the order ID to an integer
  
        const newNumber = (number + 1).toString().padStart(4, "0"); // Increment the number, pad it to 4 digits, and convert it back to a string
  
        orderId = "CBC" + newNumber  // Combine the "CBC" prefix with the new number to create the new order ID

      }

      const newOrderData = req.body; // Extract order data from the request body
      newOrderData.orderId = orderId; // Assign the generated order ID to the order
      newOrderData.email = req.user.email; // Assign the user's email to the order
      
      const order = new Order(newOrderData); // Create a new Order instance with the data
      
      await order.save(); // Save the new order to the database
      
      res.json({
        message: "Order created", // Respond with a success message

      });
    }
    catch(error){
        req.status(500).json ({
            message:error.message
        })
 }
}

export async function getOrders(req,res){
    try{
      const orders = await Order.find({email : req.user.email})
  
      res.json(orders)
  
    }catch(error){
      res.status(500).json({
        message: error.message
      })
    }
  }