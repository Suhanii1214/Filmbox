import React, { useRef } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../utils/firebase'

export const Login = () => {
    const navigate = useNavigate()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const login = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((user) => {
            console.log("User Login Successful", user);
            navigate("/")
        }).catch((err) => alert(err.message))
    }

  return (
    <div className='user-container'>
        <div className='bg-clr'>
        <h2 className='heading'>Welcome Back!</h2>
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
            <button type='submit' onClick={login} className='submit-btn'>Log In</button>
            <p>New to FilmBox? <span onClick={() => navigate('/subscription')}>SignUp</span></p>
        </form>
        </div>
    </div>
  )
}
