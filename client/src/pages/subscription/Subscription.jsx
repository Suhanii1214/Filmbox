import React from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import { subscription } from '../../utils/plans'
import { useNavigate } from 'react-router'

import './Subscription.scss'

export const Subscription = () => {

  const navigate = useNavigate()

  return (
    <div className='subs-container'>
      <h2 className='heading'>Subscribe Now!</h2>
      <p className='caption'>Unlock the best offers and gifts by choosing the best plan for yourself.</p>
      <div className='content-container'>
        {subscription.map((item, index) => (
          <div key={index} className='pricing-plan'>
          <h2>{item.name}</h2>
          <p>{item.caption}</p>
          <h1><span>{item.price}</span>/month</h1>
          <ul>
            {item.description.map((desc) => (
              <li className='list-item'> <FaCheckCircle color='#27c924' size={25} className='icon'/>{desc}</li>
            ))}
          </ul>
          <button onClick={() => navigate(`/checkout/${item.name}/${item.price}`)} className='buy-button'>Buy Plan</button>
        </div>
        ))}
      </div>
  </div>
  )
}
