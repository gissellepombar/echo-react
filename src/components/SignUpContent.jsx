import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/signup.css'

export default function SignUpContent() {
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
      navigate('/dashbaord')
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
        navigate('/dashboard')
    }
  }, [user])

  return(
    <div className="signup-page-wrapper">
      <div className="signup-page-background"></div>
      <div className="signup-page-content">
        <h1>Create an Account</h1>
        <p>
        Already have an account?  <Link to='/login' className='underline'>Log in</Link>
        </p>
        <GoogleButton label='Continue with Google' onClick={ handleGoogleSignUp }/>

        <p className='p-signup'>
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
                <Button className='button-signup'>Sign Up</Button>
              </div>
        </Form>

      </div>
    </div>
  )
}
