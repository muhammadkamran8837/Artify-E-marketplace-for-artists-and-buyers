const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  art: {
    type: Schema.Types.ObjectId,
    ref: "Art",
    required: true,
  },
  shippingDetails: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
