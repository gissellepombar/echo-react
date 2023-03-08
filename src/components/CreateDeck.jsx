import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CreateDeck() {
    const [title, setTitle] = useState('');
    const [formData, setFormData] = useState({});
    const [numCards, setNumCards] = useState(3);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Set default rating of 0 for each card
        const defaultCardData = {};
        for (let i = 0; i < numCards; i++) {
            defaultCardData[`front${i}`] = '';
            defaultCardData[`back${i}`] = '';
            defaultCardData[`rating${i}`] = 0;
        }

        // make a post request to the API with the form data
        fetch('http://127.0.0.1:5002/post', {
        //fetch('https://echo-api-gp.web.app/post', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, formData: { ...defaultCardData, ...formData } }),
        })
            .then(res => res.json())
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err.message))
    }

    const handleAddCard = () => {
        setNumCards(prevNumCards => prevNumCards + 1);
    }

    return (
        <>
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

                        {/* Hidden input field for rating */}
                        <Form.Control
                            name={`rating${index}`}
                            type="hidden"
                            value={0} // default rating
                        />
                    </div>
                ))}
        <Button variant="success" className="mt-3" onClick={handleAddCard}>
          Add Card
        </Button>
        <Button variant="primary" type="submit" className="mt-3" >
          Create Deck
        </Button>
      </Form>
    </> 
  )
}