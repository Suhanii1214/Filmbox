import React from 'react'
import { HiChevronRight } from 'react-icons/hi'
import './Welcome.scss'
import { useNavigate } from 'react-router-dom'

export const Welcome = () => {
    const navigate = useNavigate()

  return (
    <div className='welcome-container'>
        <div className='bg-clr'>
            <h1>Enjoy Unlimited Movies and TV Shows</h1>
            <p>Unlock the entertainment that suits best for you!</p>
            <button onClick={() => navigate('/login')}>Get Started</button>
        </div>
    </div>
  )
}
