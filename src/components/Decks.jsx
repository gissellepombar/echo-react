import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DeckCard from './DeckCard';
import '../styles/main.css'

export default function Decks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5002/deck')
      .then(res => res.json())
      .then(data => setDecks(data))
      .catch(err => console.log(err.message))
  }, []);

  const handleDelete = (deckId) => {
    fetch(`http://127.0.0.1:5002/deck/${deckId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        // Remove the deleted deck from the state
        setDecks(prevDecks => prevDecks.filter(deck => deck._id !== deckId));
      })
      .catch(err => console.log(err.message));
  }

  const navigate = useNavigate();

  return (
    <div className='main-page-background'>
            <div className="dashboard-content-wrapper">
      {/* <h2>Your decks</h2> */}
      <article>
      {!decks
          ? <h2>Loading...</h2>
          : <Row xs={1} sm={2} md={3} lg={3} className="g-4">
            {decks.map(deck => (
              <Col key={deck.id}>
                <DeckCard deck={deck} handleDelete={handleDelete} navigate={navigate}/>
              </Col>
            ))}
            <Col>
              <Card className="text-center">
                <Card.Body>
                  <Button onClick={() => navigate(`/create`)}>Add New Deck</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        }
      </article>
    </div>
    </div>
  );
}
