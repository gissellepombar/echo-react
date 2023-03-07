import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { user, logOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav className="justify-content-end" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/create">Create</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>Browse</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={handleSignOut}>{!user ? "Sign Out" : "Sign In"}</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}