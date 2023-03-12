import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export default function DeckHeader() {

const navigate = useNavigate();

  return (
    <div className="header-bg">
      <div className="dashboard-content-wrapper">
        <h1>Your Personalized Study Tool</h1>
        {/* <h2>Master your study material with our spaced repetition web app</h2> */}
        <h3 className="h3-header">
        Organize and improve your studying with our spaced repetition web app - create flashcards, rate difficulty, and let our app optimize your learning experience.
          {/* Create a deck of flashcards, rate the difficulty of each card, and let
          our app adjust the frequency of card appearances to help you focus on
          the toughest ones. */}
        </h3>
        <Button onClick={() => navigate(`/create`)}>Create New Deck</Button>
      </div>
    </div>
  );
}
