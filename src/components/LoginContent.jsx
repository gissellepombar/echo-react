import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/login.css'

export default function LoginContent({setUser, setIsUser}) {
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
          navigate('/dashboard')
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
            navigate('/dashboard')
        }
    }, [user])

    return(
        <div className="login-page-wrapper">
      <div className="login-page-background"></div>
      <div className="login-page-content">
        <h1>Login</h1>
        <p>
        Don't have an account yet? <Link to='/signup' className='underline'>Sign up</Link>
        </p>
        <GoogleButton label='Continue with Google' onClick={ handleGoogleSignUp }/>

        <p className='p-login'>
          OR EMAIL 
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <div className="d-flex align-items-center justify-content-center">
                <Button className='button-signup'>Log in</Button>
              </div>
        </Form>

      </div>
    </div>
  )
}