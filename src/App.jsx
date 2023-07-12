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
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import UserContext from './Contexts/userContext';


export default function App() {
  return (
    <UserContext.Provider value={{}}>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/cadastro" element={<SingUp />} />
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
