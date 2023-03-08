import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignUp = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, [])


  return (
    <UserContext.Provider value={{createUser, signIn, googleSignUp, user, logOut}}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(UserContext)
}