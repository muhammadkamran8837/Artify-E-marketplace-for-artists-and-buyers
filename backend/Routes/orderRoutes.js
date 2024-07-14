const express = require("express");
const router = express.Router();
const Art = require("../Modals/artModal");
const Order = require("../Modals/orderModal");
const Buyer = require("../Modals/buyerModal");

// Place an order
router.post("/placeOrder", async (req, res) => {
  try {
    const { buyerId, artId, shippingDetails } = req.body;

    // Check if an order for the same art piece by the same buyer already exists
    const existingOrder = await Order.findOne({ buyer: buyerId, art: artId });
    if (existingOrder) {
      return res
        .status(400)
        .json({ message: "Order for this art piece already exists." });
    }

    // Find the art piece
    const art = await Art.findById(artId);
    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    // Create a new order
    const newOrder = new Order({
      buyer: buyerId,
      art: artId,
      shippingDetails,
      totalAmount: art.price, // Assuming the art schema has a price field
    });

    // Save the order to the database
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while placing the order" });
  }
});

// Fetch all orders for a specific buyer
router.get("/buyerOrders/:buyerId", async (req, res) => {
  try {
    const { buyerId } = req.params;

    // Find all orders for the specific buyer
    const orders = await Order.find({ buyer: buyerId }).populate(
      "art",
      "title price"
    );

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders for buyer:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the orders" });
  }
});

// Fetch details of a specific order
router.get("/orderDetails/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the specific order
    const order = await Order.findById(orderId)
      .populate("art", "title price")
      .populate("buyer", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the order details" });
  }
});

module.exports = router;
