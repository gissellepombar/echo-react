import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Decks(){
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5002/getall')
          .then(res => res.json())
          .then(data => setCards(data))
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
            setCards(prevCards => prevCards.filter(deck => deck._id !== deckId));
          })
          .catch(err => console.log(err.message));
      }

    const navigate = useNavigate();
    
    return(
        <>
        <h1>Welcome to ECHO!</h1>
      <h2>Your decks</h2>
      <article>
  {!cards
    ? <h2>Loading...</h2>
    : <section className="card-container">
        {cards.map(deck => (
          <div key={deck._id}>
            <h3>{deck.title}</h3>
            <p>{deck.formData ? `${Object.keys(deck.formData).length/2} Cards` : 'No cards yet'}</p>
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
          </div>
        ))}
      </section>
  }
</article>
        </>
    )
}