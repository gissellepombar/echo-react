
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Session() {
  const { deckId } = useParams(); // Get the deck id from the URL parameter

  const [decks, setDecks] = useState("");
  const [cardIndex, setCardIndex] = useState(0);

  useEffect((deckId) => {
    fetch(`http://127.0.0.1:5002/deck/${deckId}`)
      .then(res => res.json())
      .then(data => setDecks(data))
      .catch(err => console.log(err.message))
  }, []);

  const handleNextCard = () => {
    setCardIndex(prevIndex => prevIndex + 1);
  }

  return (
    <>
    <h1>Session</h1>
    {!decks
        ? <h2>Loading...</h2>
        : <section>
        {decks.map(deck => (
            <div key={deck._id}>
                <h2>{deck.title}</h2>
                    <div>
                        <p>Card {cardIndex + 1} of {Object.keys(deck.formData).length}</p>
                        <p>Front: {deck.formData[`front${cardIndex}`]}</p>
                        <p>Back: {deck.formData[`back${cardIndex}`]}</p>
                        <Button onClick={handleNextCard}> Next Card</Button>
                    </div>  
            </div>
        ))}
        </section>
    }
    </>
  );
}
