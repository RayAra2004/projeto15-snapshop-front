import { useState } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MyProducts from './pages/MyProducts';
import MyPurchases from './pages/MyPurchases';
import ViewCart from './pages/ViewCart';
import EditUser from './pages/EditUser';
import BuyProduct from './pages/BuyProduct';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ViewProduct from './pages/ViewProduct';
import Home from './pages/Home';
import UserContext from './Contexts/userContext';
import Header from './Components/Header';
import SignUp from './pages/SignUp';
import Navbar from './Components/Navbar';
import SignIn from './pages/SignIn';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {

  const [user,setUser] = useState();
  const [cartItems,setCartItems] = useState([{name:'Furadeira', picture:'https://lojamondial.vtexassets.com/arquivos/ids/158336-800-800?v=637826014763230000&width=800&height=800&aspect=true'}]);


  return (
    <UserContext.Provider value={{user,setUser,cartItems,setCartItems}}>
      <BrowserRouter>
      <ToastContainer />
       <Header/> 
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/visualizar-produto/:id" element={<ViewProduct />} />
          <Route path="/editar-produto/:id" element={<EditProduct />} />
          <Route path="/adicionar-produto" element={<AddProduct />} />
          <Route path="/comprar/:id" element={<BuyProduct />} />
          <Route path="/editar-usuario" element={<EditUser />} />
          <Route path="/carrinho" element={<ViewCart />} />
          <Route path="/minhas-compras" element={<MyPurchases />} />
          <Route path="/meus-produtos" element={<MyProducts />} />
        </Routes>
        
      </BrowserRouter>
    </UserContext.Provider>
  )
}
