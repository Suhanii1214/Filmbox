import Razorpay from 'razorpay'
import crypto from 'crypto'
import ENV from './config.js'

export const checkout = async (req, res) => {

    const razorpay = new Razorpay({
      key_id: ENV.RAZORPAY_KEY_ID,
      key_secret: ENV.RAZORPAY_SECRET_KEY
    })
  
    try {
      // Create a Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: Number(req.body.price * 100), // Razorpay accepts amount in paisa, so multiply by 100
        currency: 'INR', // Update with your currency
      });
  
      res.status(200).json({
        success: true,
        razorpayOrder
      });
      console.log(razorpayOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  
  }

export const paymentVerfication = async (req, res) => {
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body

    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", ENV.RAZORPAY_SECRET_KEY)
        .update(body.toString())
        .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if(isAuthentic) {
            res.send("Payment verification Successful")
        } else {
            // Send a response indicating unsuccessful verification
            res.status(400).send('Payment verification unsuccessful');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}