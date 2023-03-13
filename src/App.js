import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './context/ProtectedRoutes';
import Session from './pages/Session';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css';


function App() {
    return(
        <AuthContextProvider>
            <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<Welcome />} />
                        <Route path='/signup' element={<SignUp/>} />
                        <Route path='/login' element={<Login />} />

                        <Route exact path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
                        <Route path="/session/:deckId" element={<Session />} />
                        <Route path='/create' element={<ProtectedRoutes><Create /></ProtectedRoutes>} />
                    </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}
export default App;

//https://echo-cards.web.app