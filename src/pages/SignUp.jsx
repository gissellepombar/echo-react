import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { createUser, googleSignUp, user } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      navigate('/')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  const handleGoogleSignUp = async () => {
    try {
        await googleSignUp()
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if(user != null) {
        navigate('/')
    }
}, [user])

  return(
    <section>
      <h1>Sign Up</h1>
      <p>
        Don't have an account yet? <Link to='/login' className='underline'>Sign up.</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email'/>
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)}className='border p-3' type='password'/>
        </div>
        <button>Sign Up</button>
      </form>
        <GoogleButton onClick={ handleGoogleSignUp }/>
    </section>
  )
}