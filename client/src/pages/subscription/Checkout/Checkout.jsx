import React, { useState } from 'react'
import './Checkout.scss'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import icon from '../../../assets/filmbox_logo.png'
import ENV from '../../../../../server/config.js'
import { db } from '../../../utils/firebase.js'
import { collection, addDoc } from "firebase/firestore"; 

export const Checkout = () => {

    const [userDetails, setUserDetails] = useState({
        name: '',
        contact: null,
        email: ''
    })

    const navigate = useNavigate()

    const { name, price } = useParams()

    const handleChange = (e) => {
        setUserDetails({...userDetails, [e.target.name]: e.target.value})
    }

    const checkout = async (e) => {
        e.preventDefault()

        // Check if userDetails are empty
        if (!userDetails || !userDetails.name || !userDetails.contact || !userDetails.email) {
            alert("Please enter all details");
            return;
        }

        try {
            const response = await axios.post('https://filmbox-tt11.onrender.com/api/checkout', { price });
            const order = response.data;

            var options = {
                key: ENV.RAZORPAY_KEY_ID,
                amount: order.razorpayOrder.amount,
                currency: "INR",
                name: "Filmbox",
                description: "Filmbox Streaming Website",
                image: icon,
                order_id: order.razorpayOrder.id,
                handler: async function (order) {
                    axios.post("https://filmbox-tt11.onrender.com/api/paymentverification", order)
                    .then(res => {
                        navigate("/signup")
                    })
                    .catch(err => console.log(err))
                },
                prefill: {
                    name: userDetails.name,
                    email: userDetails.email,
                    contact: userDetails.contact
                },
                theme: {
                    "color":"#36c8af",
                }
            }

            const razor = new window.Razorpay(options)
            razor.open()

            try {
                const docRef = await addDoc(collection(db, "user-details"), {
                    order_id: order.razorpayOrder.id,
                    subscription: name,
                    amount: price,
                    name: userDetails.name,
                    contact: userDetails.contact,
                    email: userDetails.email,
                });
                console.log("Document added with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              

            // await db.collection("user-details").add({
            //     order_id: order.razorpayOrder.id,
            //     subscription: name,
            //     amount: price,
            //     name: userDetails.name,
            //     contact: userDetails.contact,
            //     email: userDetails.email,
            // })
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='checkout-container'>
        <div className='bg-clr'>
            <h1 className='heading'>Checkout</h1>
            <div className='content-container'>
                <div className='input-container'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        name='name'
                        value={userDetails.name}
                        placeholder='Enter Name'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='contact'>Contact:</label>
                    <input
                        type='number'
                        name='contact'
                        value={userDetails.contact}
                        placeholder='Enter Contact'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={userDetails.email}
                        placeholder='Enter Email'
                        onChange={handleChange}
                        required
                    />
                </div>
                <button onClick={checkout}  className='submit-btn'>Start Membership <span>@ Rs.{price}/month</span></button>
            </div>
        </div>
    </div>
  )
}
