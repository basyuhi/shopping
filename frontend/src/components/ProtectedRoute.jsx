import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children,requiredRole}) => {
    const userInfo=useSelector((state)=> state.auth.user)
    const authenticate=useSelector((state)=> state.auth.isAuthenticated)
    
    if(!authenticate){
        if(requiredRole==='seller')
        {
            return <Navigate to='/seller/login' replace/>
        }
        return <Navigate to="/buyer/login" replace/>
    }
    if(requiredRole && userInfo.role!==requiredRole){
        if(userInfo.role==="seller"){
            return <Navigate to="/create" replace/>
        }
        return <Navigate to="/" replace/>
    }
    return children
}

export default ProtectedRoute
