import { Navigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useContext } from "react";
export default function AuthGuard(props) {
  const { isAuthenticated } = useContext(AuthContext);
    
  if (!isAuthenticated) {
  
    return <Navigate to="/login"/>
  }
  return <>{props.children}</>;
}
