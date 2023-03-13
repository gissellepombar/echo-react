import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { EmojiLaughingFill } from 'react-bootstrap-icons';
import { EmojiNeutralFill } from 'react-bootstrap-icons';
import { EmojiFrownFill } from 'react-bootstrap-icons';


export default function SessionCard() {
  const { deckId } = useParams(); // Get the deck id from the URL parameter

  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    //fetch(`http://127.0.0.1:5002/deck/${deckId}`)
    fetch(`https://echo-api-gp.web.app/deck/${deckId}`)
      .then((res) => res.json())
      .then((data) => setDeck(data))
      .catch((err) => console.log(err.message));
  }, [deckId]);

  const handleNextCard = () => {
    if (
      cardIndex ===
      Object.keys(deck.formData).filter((key) => key.startsWith("front"))
        .length -
        1
    ) {
      setShowModal(true);
    } else {
      setCardIndex((prevIndex) => prevIndex + 1);
      setFlipped(false);
    }
  };

  const handleRankingChange = (rank) => {
    const updatedCard = {
      ranking: rank,
    };
    //fetch(`http://localhost:5002/deck/${deckId}/ranking/${cardIndex}`, {
    fetch(`https://echo-api-gp.web.app/deck/${deckId}/ranking/${cardIndex}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    })
      .then(() => {
        handleNextCard();
      })
      .catch((err) => console.log(err.message));
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/dashboard");
  };

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className='session-page-background'>
    <h1 className="session-h1">Session</h1>
    {/* <h1 className="session-h1">{deck.title}</h1> */}
    <Row className="justify-content-center">
      <Col xs={8} md={8} lg={6} className='card-column'>
        <section className="text-center flip-card">
          {!deck ? (
            <Card.Title>Loading...</Card.Title>
          ) : (
            // <Card.Body className="card-container">
            <Card
              className={flipped ? "flip-card-inner flipped" : "flip-card-inner"}
              onClick={handleCardClick}
            >
              <div
                className="flip-card-front"
                style={{ display: flipped ? "none" : "block" }}
              >
                {/* <Card.Title>{deck.title}</Card.Title> */}
                <div>
                  <Card.Text className="session-card-text">
                    Card {cardIndex + 1} of{" "}
                    {
                      Object.keys(deck.formData).filter((key) =>
                        key.startsWith("front")
                      ).length
                    }
                  </Card.Text>
                  <Card.Text className="session-card-text">
                    Term
                  </Card.Text>
                  <Card.Title className="session-card-title">
                    {deck.formData[`front${cardIndex}`]}
                  </Card.Title>
                  {/* <div className="btn-container">
                     <Button onClick={handleNextCard}>Next Card</Button> 
                     <Button className="rating-btn" onClick={() => handleRankingChange()}><EmojiLaughingFill color="#8069BB" size={15} /></Button>
                    <Button className="rating-btn" onClick={() => handleRankingChange()}><EmojiNeutralFill color="#8069BB" size={15} /></Button>
                    <Button className="rating-btn" onClick={() => handleRankingChange()}><EmojiFrownFill color="#8069BB" size={15} /></Button> 
                  </div> */}
                </div>
              </div>
              <div
                className="flip-card-back"
                style={{ display: flipped ? "block" : "none" }}
              >
                {/* <Card.Title>{deck.title}</Card.Title> */}
                <div>
                  <Card.Text className="session-card-text">
                    Card {cardIndex + 1} of{" "}
                    {
                      Object.keys(deck.formData).filter((key) =>
                        key.startsWith("front")
                      ).length
                    }
                  </Card.Text>
                  <Card.Text className="session-card-text">
                    Definition
                  </Card.Text>
                  <Card.Title className="session-card-title">
                    {deck.formData[`back${cardIndex}`]}
                  </Card.Title>
                </div>
              </div>
            </Card>
            //   </Card.Body>
          )}
        </section>
                  <div className="d-flex justify-content-center btn-container">
                    {/* <Button onClick={handleNextCard}>Next Card</Button> */}
                    <Button className="rating-btn" onClick={() => handleRankingChange(1)}><EmojiLaughingFill color="#8069BB" size={30} /></Button>
                    <Button className="rating-btn" onClick={() => handleRankingChange(2)}><EmojiNeutralFill color="#8069BB" size={30} /></Button>
                    <Button className="rating-btn" onClick={() => handleRankingChange(3)}><EmojiFrownFill color="#8069BB" size={30} /></Button>
                  </div>
      </Col>
    </Row>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Nice Work!</Modal.Title>
      </Modal.Header>
      <Modal.Body>You're crushing it!</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleContinue}>Continue</Button>
      </Modal.Footer>
    </Modal>
  </div>
);
}
