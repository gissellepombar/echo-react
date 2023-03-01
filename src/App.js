import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
    const [cards, setCards] = useState("")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [front1, setFront1] = useState("");
    const [back1, setBack1] = useState("");
    const [front2, setFront2] = useState("");
    const [back2, setBack2] = useState("");
    const [front3, setFront3] = useState("");
    const [back3, setBack3] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:5002/getall`)
        .then(res => res.json()
        .then(setCards))
        .catch(err => console.log(err.message))
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

    //make a post request to the API with the form data
    fetch('http://127.0.0.1:5002/post', {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({title, description, front1, back2, front2, back2, front3, front3}),
    })  
        .then(res => res.json())
        .then(() => {
            setTitle('');
            setDescription('');
            setFront1('');
            setBack1('');
            setFront2('');
            setBack2('');
            setFront3('');
            setBack3('');
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
                    {cards.map( card => (
                        <div key={card._id}>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </section>}
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
                                onChange={e => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                            <Form.Control 
                                name="description"
                                type="description" 
                                placeholder="Description"
                                value={description}
                                className="p-3 hover-effect" 
                                onChange={e => setDescription(e.target.value)} />
                    </Form.Group>

                        <h3>First Card</h3>
                    <Form.Group className="mb-3" controlId="formFront">
                        <Form.Label>Front</Form.Label>
                            <Form.Control 
                                name="front"
                                type="front"
                                placeholder="Front"
                                value={front1}
                                className="p-3 hover-effect" 
                                onChange={e => setFront1(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBack">
                        <Form.Label>Back</Form.Label>
                            <Form.Control 
                                name="back"
                                type="back"
                                placeholder="Back"
                                value={back1}
                                className="p-3 hover-effect" 
                                onChange={e => setBack1(e.target.value)} />
                    </Form.Group>
                        <h3>Second Card</h3>
                    <Form.Group className="mb-3" controlId="formFront">
                        <Form.Label>Front</Form.Label>
                            <Form.Control 
                                name="front"
                                type="front"
                                placeholder="Front"
                                value={front2}
                                className="p-3 hover-effect" 
                                onChange={e => setFront2(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBack">
                        <Form.Label>Back</Form.Label>
                            <Form.Control 
                                name="back"
                                type="back"
                                placeholder="Back"
                                value={back2}
                                className="p-3 hover-effect" 
                                onChange={e => setBack2(e.target.value)} />
                    </Form.Group>
                        <h3>Third Card</h3>
                    <Form.Group className="mb-3" controlId="formFront">
                        <Form.Label>Front</Form.Label>
                            <Form.Control 
                                name="front"
                                type="front"
                                placeholder="Front"
                                value={front3}
                                className="p-3 hover-effect" 
                                onChange={e => setFront3(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBack">
                        <Form.Label>Back</Form.Label>
                            <Form.Control 
                                name="back"
                                type="back"
                                placeholder="Back"
                                value={back3}
                                className="p-3 hover-effect" 
                                onChange={e => setBack3(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
    </>
  );
}

export default App;
