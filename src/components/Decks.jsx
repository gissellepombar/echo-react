import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import DeckCard from './DeckCard';

export default function Decks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5002/getall')
      .then(res => res.json())
      .then(data => setDecks(data))
      .catch(err => console.log(err.message))
  }, []);

  const handleDelete = (deckId) => {
    fetch(`http://127.0.0.1:5002/delete/${deckId}`, {
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

{/* <div key={deck._id}>
<h3>{deck.title}</h3>
{deck.formData && Object.keys(deck.formData).filter(key => key.startsWith('front')).length > 0
  ? <p>{Object.keys(deck.formData).filter(key => key.startsWith('front')).length} Cards</p>
  : <p>No cards yet</p>
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
<Button>List</Button>
<Button onClick={() => handleDelete(deck._id)}>Delete</Button>
<Button onClick={() => navigate(`/session/${deck._id}`)}>Start Session</Button>
</div> */}