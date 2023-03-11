import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

export default function SessionCard() {
  const { deckId } = useParams(); // Get the deck id from the URL parameter

  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5002/deck/${deckId}`)
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
    fetch(`http://localhost:5002/deck/${deckId}/ranking/${cardIndex}`, {
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
    navigate("/");
  };

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className='session-page-background'>
      <h1>Session</h1>
      <Row className="justify-content-center">
        <Col xs={8} md={8} lg={6} className='card-column'>
          <section className="text-center flip-card">
            {!deck ? (
              <Card.Title>Loading...</Card.Title>
            ) : (
                // <Card.Body className="card-container">
              <Card
                className={ flipped ? "flip-card-inner flipped" : "flip-card-inner"} 
                onClick={handleCardClick}>
                <div
                  className="flip-card-front"
                  style={{ display: flipped ? "none" : "block" }}
                >
                  <Card.Title>{deck.title}</Card.Title>
                  <div>
                    <Card.Text>
                      Card {cardIndex + 1} of{" "}
                      {
                        Object.keys(deck.formData).filter((key) =>
                          key.startsWith("front")
                        ).length
                      }
                    </Card.Text>
                    <Card.Text>
                      Front: {deck.formData[`front${cardIndex}`]}
                    </Card.Text>
                    <div className="btn-container">
                    <Button onClick={handleNextCard}>Next Card</Button>
                    <Button onClick={() => handleRankingChange()}>Easy: 1</Button>
                    <Button onClick={() => handleRankingChange()}>Medium: 2</Button>
                    <Button onClick={() => handleRankingChange()}>Hard: 3</Button>
                  </div>
                  </div>
                </div>
                  {/* <div>
                    <Button onClick={handleNextCard}>Next Card</Button>
                    <Button onClick={() => handleRankingChange()}>Easy: 1</Button>
                    <Button onClick={() => handleRankingChange()}>Medium: 2</Button>
                    <Button onClick={() => handleRankingChange()}>Hard: 3</Button>
                  </div> */}
                <div
                  className="flip-card-back"
                  style={{ display: flipped ? "block" : "none" }}
                >
                  <Card.Title>{deck.title}</Card.Title>
                  <div>
                    <Card.Text>
                      Card {cardIndex + 1} of{" "}
                      {
                        Object.keys(deck.formData).filter((key) =>
                          key.startsWith("front")
                        ).length
                      }
                    </Card.Text>
                    <Card.Text>
                      Back: {deck.formData[`back${cardIndex}`]}
                    </Card.Text>
                  <div className="btn-container">
                    <Button onClick={handleNextCard}>Next Card</Button>
                    <Button onClick={() => handleRankingChange()}>Easy: 1</Button>
                    <Button onClick={() => handleRankingChange()}>Medium: 2</Button>
                    <Button onClick={() => handleRankingChange()}>Hard: 3</Button>
                  </div>
                  </div>
                </div>
              </Card>
            //   </Card.Body>
            )}
          </section>
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
