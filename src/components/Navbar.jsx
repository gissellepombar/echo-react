import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css'

export default function Navbar(){
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <Nav className="justify-content-end" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/dashboard">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/create">Create</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>Browse</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={handleSignOut}>{!user ? "Sign In" : "Sign Out"}</Nav.Link>
        </Nav.Item>
      </Nav>
  )
}