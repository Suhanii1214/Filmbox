import React, { useRef } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../utils/firebase'

export const SignUp = () => {
    const navigate = useNavigate()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const signup = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((user) => {
            console.log("User Sign Up Successful", user);
            navigate("/")
        }).catch((err) => alert(err.message))
    }

  return (
    <div className='user-container'>
        <div className='bg-clr'>
        <h2 className='heading'>Let's Get Started</h2>
        <form className='sub-container'>
            <div className='input-container'>
                <label htmlFor='email'>Email:</label>
                <input
                    type='text'
                    name='email'
                    ref={emailRef}
                    placeholder='Enter Email'
                />
            </div>
            <div className='input-container'>
                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    name='password'
                    ref={passwordRef}
                    placeholder='Enter Password'
                />
            </div>
            {/* <div className='input-container'>
                <label htmlFor='confirm-password'>Confirm Password:</label>
                <input
                    type='text'
                    name='confirm-password'
                    placeholder='Confirm Password'
                />
            </div> */}
            <button type='submit' onClick={signup} className='submit-btn'>Sign Up</button>
            <p>Already have an account? <span onClick={() => navigate('/login')}>Log In</span></p>
        </form>
        </div>
    </div>
  )
}
