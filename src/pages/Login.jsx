import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
// import { getAnalytics } from "firebase/analytics";

export default function Login({setUser, setIsUser}) {
    const {signIn, googleSignUp, user} = useAuth();
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
          await signIn(email, password)
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
    };

    useEffect(() => {
        if(user != null) {
            navigate('/')
        }
    }, [user])

    return(
        <section>
        <h1>Log in</h1>
        <p>
        Already have an account? <Link to='/signup' className='underline'>Sign in.</Link>
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
        {/* <button onClick={loginWithGoogle}>Login with Google</button> */}
        </form>
        <GoogleButton onClick={ handleGoogleSignUp }/>
        </section>
    )
}