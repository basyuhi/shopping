import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import BuyerLogin from './pages/buyer/BuyerLogin';
import BuyerSignup from './pages/buyer/BuyerSignup'
import SellerLogin from './pages/seller/SellerLogin'
import SellerSignup from './pages/seller/SellerSignup'
import CreateProduct from "./pages/seller/CreateProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProducts from "./pages/seller/MyProducts";
import SellerOrder from "./pages/seller/SellerOrder";
import BuyerOrder from "./pages/buyer/BuyerOrder";
import Layout from "./components/Layout";
import { login,authCheckComplete } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "./services/api";

const App = () => {
  const dispatch=useDispatch();

  useEffect(()=>{
    async function checkCurrentUser() {
      try {
        const response= await api.get('/api/auth/me');
        dispatch(login(response.data.user));
      }catch(err){
        console.log('no active user session');
        console.log(err);
      }finally{
        dispatch(authCheckComplete());
      }
    }
    checkCurrentUser();
  },[dispatch])
  return (
    <Routes>
      <Route path="/buyer/login" element={<BuyerLogin/>}/>
      <Route path="/buyer/signup" element={<BuyerSignup />} />
      <Route path="/seller/login" element={<SellerLogin/>} />
      <Route path="/seller/signup" element={<SellerSignup />} />

    <Route element={<Layout/>}>
      {/* <Route path="/" element={<><Navbar /><Home /></>} /> */}
      <Route path="/" element={<Home/>}/>
      <Route path="/products/:id" element={<ProductDetails/>} />
      <Route path="/cart" element={<ProtectedRoute requiredRole="buyer"><Cart/></ProtectedRoute>}/>
      <Route path="/create" element={<ProtectedRoute requiredRole="seller"><CreateProduct/></ProtectedRoute>}/>
      <Route path="/my-product" element={<ProtectedRoute requiredRole="seller"><MyProducts/></ProtectedRoute>}/>
      <Route path="/seller-orders" element={<ProtectedRoute requiredRole="seller"><SellerOrder/></ProtectedRoute>}/>
      <Route path="/buyer-orders" element={<ProtectedRoute requiredRole='buyer'><BuyerOrder/></ProtectedRoute>}/>
    </Route>
      
    </Routes>
  )
}

export default App
