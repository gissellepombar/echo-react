import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { List } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';

export default function DeckCard({ deck, handleDelete, navigate }) {
  const [showList, setShowList] = useState(false);

  const toggleList = () => setShowList((prevState) => !prevState);

  return (
    <Row>
      <Col>
        <Card className="text-center deck-card">
            <div className="d-flex justify-content-end deck-btn">
            <Button className="list-btn" onClick={toggleList}>
                <List color="#8069BB" size={15} />
                </Button>
            <Button className="delete-btn" onClick={() => handleDelete(deck._id)}>
                <TrashFill color="#8069BB" size={15} />
                </Button>
                </div>
          <Card.Body className="deck-body">
            <Card.Title>{deck.title}</Card.Title>
            {deck.formData &&
            Object.keys(deck.formData).filter((key) => key.startsWith("front"))
              .length > 0 ? (
              <Card.Text>
                {
                  Object.keys(deck.formData).filter((key) =>
                    key.startsWith("front")
                  ).length
                }{" "}
                Cards
              </Card.Text>
            ) : (
              <Card.Text>No cards yet</Card.Text>
            )}
            {showList &&
              deck.formData &&
              Object.keys(deck.formData).map((key, index) => {
                if (key.startsWith("front")) {
                  return (
                    <div key={index}>
                      <p>Term: {deck.formData[key]}</p>
                      <p>Definition: {deck.formData[`back${key.slice(5)}`]}</p>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            <Button className="start-btn" onClick={() => navigate(`/session/${deck._id}`)}>
              Start Session
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
