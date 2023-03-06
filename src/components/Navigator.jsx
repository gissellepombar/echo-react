import Nav from 'react-bootstrap/Nav';
export default function Navigator(){
    return(
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
      </Nav>
        </>
    )
}