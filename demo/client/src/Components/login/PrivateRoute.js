
import Login from "./Login";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ element: Component}) => {
    const isLoggedIn = localStorage.getItem('userId');
    const location = useLocation();

    return ( isLoggedIn ? Component: <Navigate to="/" state={{ from: location }} replace />);
};

export default PrivateRoute;
