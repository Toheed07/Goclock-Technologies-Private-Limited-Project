const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderId: {
    type: String,
  },
  to: {
    type: String,
  },
  from: {
    type: String,
  },
  address: {
    type: String,
  },
  transporter: {
    type: String,
  },
  message: {
    type: String,
  },
  quantity: {
    type: String,
  },
  price: {
    type: Number,
    float: true
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
