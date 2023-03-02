import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateDeck from './components/CreateDeck';
import Decks from './components/Decks';
import Session from './components/Session';

function App() {
    return(
        <>
            <BrowserRouter>
                <body>
                    <Routes>
                        {/* {user && <Route path='/secret' element={<Content />}} */}
                        {/* only if user has a value can you redirect them to secrests */}
                        <Route path='/create' element={<CreateDeck />} />
                        <Route path="/session/:deckId" element={<Session />} />
                        <Route exact path='/' element={<Decks />} />
                    </Routes>
                </body>
            </BrowserRouter>
        </>
);
}
export default App;