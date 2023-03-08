import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import DeckCard from './DeckCard';

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
    <>
      <h1>Welcome to ECHO!</h1>
      <h2>Your decks</h2>
      <article>
        {!decks
          ? <h2>Loading...</h2>
          : <section className="card-container">
            {decks.map(deck => (
                <DeckCard key={deck.id} deck={deck} handleDelete={handleDelete} navigate={navigate}/>
            ))}
                <Button onClick={() => navigate(`/create`)}>Add New Deck</Button>
          </section>
        }
      </article>
    </>
  );
}
