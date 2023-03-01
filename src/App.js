import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState('');
  const [formData, setFormData] = useState({});

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

  return (
    <>
      <h1>Welcome to ECHO!</h1>
      <h2>Your decks</h2>
      <article>
        {!cards
          ? <h2>Loading...</h2>
          : <section className="card-container">
              {cards.map(card => (
                <div key={card._id}>
                  <h3>{card.title}</h3>
                  {/* <p>{card.description}</p> */}
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

        {[1, 2, 3, 4, 5].map(num => (
          <div key={num}>
            <h3>Card {num}</h3>
            <Form.Group className="mb-3" controlId={`formFront${num}`}>
              <Form.Label>Front</Form.Label>
              <Form.Control 
                name={`front${num}`}
                type="front"
                placeholder="Front"
                value={formData[`front${num}`]}
                className="p-3 hover-effect" 
                onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))} 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId={`formBack${num}`}>
              <Form.Label>Back</Form.Label>
              <Form.Control name={`back${num}`}
                type="back"
                placeholder="Back"
                value={formData[`back${num}`]}
                className="p-3 hover-effect"
                onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))} 
                />
                </Form.Group>
                </div>
                ))}
                    <Button variant="primary" type="submit">
      Create Deck
    </Button>
  </Form>
</>
);
}

export default App;