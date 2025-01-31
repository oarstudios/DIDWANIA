const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const billRoutes = require('./routes/billingRoutes')
const Razorpay = require('razorpay')
const crypto = require('crypto')



const app = express();

app.use(cors({
  origin: ["https://www.didwaniacreations.in"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
// app.use(cors({
//   origin: 'http:localhost:5000' // Allow only your front-end app URL
// }));
// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/bills', billRoutes)


app.post('/order', async(req, res)=>{
  try{
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  
    const options = req.body;
    const order = await razorpay.orders.create(options);

    if(!order)
    {
      return res.status(500).json({error: 'Failed to create order'});
    }

    res.status(200).json({order});

  }catch(error)
  {
     console.log(error);
    res.status(500).json({error: 'Failed to process order'});
  }
})


app.post('/order/validate', async (req, res) =>{
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

  const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)

  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
  const digest = sha.digest("hex");
  if(digest !== razorpay_signature)
  {
    return res.status(400).json({error: 'Invalid signature'});
  }
  res.status(200).json({message: 'Signature verified', orderId: razorpay_order_id, paymentId: razorpay_payment_id});
})





// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
