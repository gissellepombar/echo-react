import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function DeckCard({deck, handleDelete, navigate}) {
    return (
        <>
    <Row xs={1} md={2} lg={3} className="g-4">
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
    <Card className="text-center">
        <Card.Body>
        <Button>List</Button>
        <Button onClick={() => handleDelete(deck._id)}>Delete</Button>
        <Button onClick={() => navigate(`/session/${deck._id}`)}>Start Session</Button>
        <Card.Title>{deck.title}</Card.Title>
                {deck.formData && Object.keys(deck.formData).filter(key => key.startsWith('front')).length > 0
                  ? <Card.Text>{Object.keys(deck.formData).filter(key => key.startsWith('front')).length} Cards</Card.Text>
                  : <Card.Text>No cards yet</Card.Text>
                }
                {deck.formData && Object.keys(deck.formData).map((key, index) => {
                  if (key.startsWith('front')) {
                    return (
                      <div key={index}>
                        <p>Front: {deck.formData[key]}</p>
                        <p>Back: {deck.formData[`back${key.slice(5)}`]}</p>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
                </Card.Body>
                </Card>
                </Col>
       ))} 
    </Row>
        </>
    )
}