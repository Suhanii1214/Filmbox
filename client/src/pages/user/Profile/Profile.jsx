import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../utils/firebase'
import { Header } from '../../../components/Header/Header'
import { Footer } from '../../../components/Footer/Footer'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../../utils/firebase'
import avatar from '../../../assets/avatar.png'

export const Profile = () => {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    plan: "",
    amount: ""
  })

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    console.log(user); 

  useEffect(() => {
    readData()
  },[])

    const readData = async () => {
      const querySnapshot = await getDocs(collection(db, "user-details"));
        console.log(querySnapshot);
        const detail = querySnapshot.docs.filter((doc) => {
          return doc?._document?.data?.value?.mapValue?.fields?.email?.stringValue == user.email
          // console.log(doc._document.data.value.mapValue.fields);
        // console.log(doc._document.data.value.mapValue.fields.email.stringValue);
      });
      console.log(detail[0]._document.data.value.mapValue.fields);
      const data = detail[0]._document.data.value.mapValue.fields
      setUserData({
        name: data.name.stringValue,
        email: data.email.stringValue,
        contact: data.contact.stringValue,
        plan: data.subscription.stringValue,
        amount: data.amount.stringValue,
      })
    }


    const handleClick = () => {
        auth.signOut()
        navigate('/')
    }

  return (
    <>
      <Header/>
      <div className='profile-container'>
        <h1 className='profile-heading'>Profile</h1>
        <div className='sub-content'>
          <div className='img-content'>
            <img src={avatar} height={150} alt='avatar'/>
            <p className='user-name'>{userData.name}</p>
          </div>
          <div className='content'>
            <div className='detail-container'>
              <p>Email: <span>{userData.email}</span></p>
              <p>Contact: <span>{userData.contact}</span></p>
            </div>
            <div className='detail-container'>
              <p>Subscription Plan: <span>{userData.plan}</span></p>
              <p>Amount: <span>Rs.{userData.amount}</span></p>
            </div>
            <button className='submit-btn' onClick={handleClick}>Log Out</button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
