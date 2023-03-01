import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState('');
  const [formData, setFormData] = useState({});
  const [numCards, setNumCards] = useState(5);

  useEffect(() => {
    fetch('http://127.0.0.1:5002/getall')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.log(err.message))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // make a post request to the API with the form data
    fetch('http://127.0.0.1:5002/post', {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, formData }),
    })  
      .then(res => res.json())
      .then(() => {
        setTitle('');
        setFormData({});
      })
      .catch(err => console.log(err.message))
  }

  const handleAddCard = () => {
    setNumCards(prevNumCards => prevNumCards + 1);
  }

  return (
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
          </div>
        ))}
      </section>
  }
</article>
      <h2>Create a new deck</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            name="title"
            type="title" 
            placeholder="Title"
            value={title}
            className="p-3 hover-effect" 
            onChange={e => setTitle(e.target.value)} 
          />
        </Form.Group>

        {[...Array(numCards)].map((_, index) => (
          <div key={index}>
            <h3>Card {index + 1}</h3>
            <Form.Group className="mb-3" controlId={`formFront${index}`}>
              <Form.Label>Front</Form.Label>
              <Form.Control 
                name={`front${index}`}
                type="front"
                placeholder="Front"
                value={formData[`front${index}`] || ''}
                className="p-3 hover-effect" 
                onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId={`formBack${index}`}>
              <Form.Label>Back</Form.Label>
              <Form.Control 
                name={`back${index}`}
                type="back"
                placeholder="Back"
                value={formData[`back${index}`] || ''}
                className="p-3 hover-effect"
                onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))} 
                />
                 </Form.Group>
</div>
))}
  <Button variant="success" className="mt-3" onClick={handleAddCard}>
    Add Card
  </Button>
<Button variant="primary" type="submit" className="mt-3">
      Create Deck
    </Button>
  </Form>

</>
);
}

export default App;