import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

export default function Session() {
  const { deckId } = useParams(); // Get the deck id from the URL parameter

  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5002/deck/${deckId}`)
      .then(res => res.json())
      .then(data => setDeck(data))
      .catch(err => console.log(err.message))
  }, [deckId]);

  const handleNextCard = () => {
    if (cardIndex === Object.keys(deck.formData).filter(key => key.startsWith('front')).length - 1) {
      setShowModal(true);
    } else {
      setCardIndex(prevIndex => prevIndex + 1);
    }
  }

  const handleRankingChange = (rank) => {
    const updatedCard = {
      ranking: rank
    };
    fetch(`http://localhost:5002/deck/${deckId}/ranking/${cardIndex}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(updatedCard)
        })
            .then(() => {
            handleNextCard();
            })
            .catch(err => console.log(err.message));
        };

        const handleContinue = () => {
            setShowModal(false);
            navigate('/')
        }

  return (
    <>
    <h1>Session</h1>
    {!deck
        ? <h2>Loading...</h2>
        : <section>
            <div>
                <h2>{deck.title}</h2>
                    <div>
                        <p>Card {cardIndex + 1} of {Object.keys(deck.formData).filter(key => key.startsWith('front')).length}</p>
                        <p>Front: {deck.formData[`front${cardIndex}`]}</p>
                        <p>Back: {deck.formData[`back${cardIndex}`]}</p>
                        <Button onClick={handleNextCard}> Next Card</Button>
                        <Button onClick={() => handleRankingChange(1)}>Easy: 1</Button>
                        <Button onClick={() => handleRankingChange(2)}>Medium: 2</Button>
                        <Button onClick={() => handleRankingChange(3)}>Hard: 3</Button>
                    </div>  
            </div>
        </section>
    }
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Nice Work!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You're crushing it!
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleContinue}>Continue</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}