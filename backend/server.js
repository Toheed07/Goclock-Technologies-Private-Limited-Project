const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

// Models
const User = require("./models/user");
const Order = require("./models/order");

// User registration
app.post("/register", async (req, res) => {
  try {
    const { name, address, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      address,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
});

app.post("/new-order-manufacture", async (req, res) => {
  try {
    const order = new Order({
      orderId: req.body.orderId,
      to: req.body.to,
      from: req.body.from,
      quantity: req.body.quantity,
      address: req.body.address,
      transporter: req.body.transporter,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
  }
});

app.put('/orders/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const { price } = req.body;

  try {
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.price = price;

    await order.save();

    return res.json({ message: 'Order price updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//MongoDB Connection
mongoose.connect(
  "mongodb://localhost/GTPl-DB",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  console.log("connected to DB")
);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
