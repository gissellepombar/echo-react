import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateDeck from './components/CreateDeck';
import Decks from './components/Decks';
import Session from './components/Session';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { AuthContextProvider } from './context/AuthContext';

function App() {
    return(
        <>
        <AuthContextProvider>
            <BrowserRouter>
                <body>
                    <Navbar/>
                    <Routes>
                        <Route path='/home' element={<Home />} />
                        <Route path='/signup' element={<SignUp/>} />
                        <Route path='/login' element={<Login />} />

                        <Route path='/create' element={<CreateDeck />} />
                        <Route path="/session/:deckId" element={<Session />} />
                        <Route exact path='/' element={<Decks />} />
                        
                    </Routes>
                </body>
            </BrowserRouter>
        </AuthContextProvider>
        </>
);
}
export default App;

//https://echo-cards.web.app