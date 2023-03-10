import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Session from './pages/Session';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css';
import Create from './pages/Create';


function App() {
    return(
        <AuthContextProvider>
            <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path='/welcome' element={<Welcome />} />
                        <Route path='/signup' element={<SignUp/>} />
                        <Route path='/login' element={<Login />} />

                        <Route path='/create' element={<Create />} />
                        <Route path="/session/:deckId" element={<Session />} />
                        <Route exact path='/' element={<Dashboard />} />
                    </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}
export default App;

//https://echo-cards.web.app