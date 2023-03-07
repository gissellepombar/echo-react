import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes({children}) {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to='/' />;
    }
    return children;

}