import { useState } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MyProducts from './pages/MyProducts';
import MyPurchases from './pages/MyPurchases';
import ViewCart from './pages/ViewCart';
import UserProfile from './pages/UserProfile';
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
import { useEffect } from 'react';
import axios from 'axios';
import BuyCart from './pages/BuyCart';
import Contact from './pages/Contact';


export default function App() {

  const [user,setUser] = useState();
  const [amountOfPages,setAmountOfPages] = useState(1);
  const [clientSearchValue,setClientSearchValue] = useState('');
  const [cartItems,setCartItems] = useState([]);
  const producstPerPage = 20;

  useEffect(()=>{
    getUserInfo();
  },[]);

  function getUserInfo()
  {
    if(localStorage.getItem('token'))
    {
      axios.get(`${import.meta.env.VITE_API_URL}/info-usuario`,{headers:{Authorization:localStorage.getItem('token')}})
      .then((res) => {
        //console.log(res);
        if(res.data.items)
        {
          let items = [];
          res.data.items.forEach(item =>{
            if(item)
            {
              items.push({name:item.name,picture:item.picture,_id:item._id,quantity:item.quantity,value:item.value});
            }
          });
          setCartItems(items);
        }

        if(res.data.amountOfProducts)
        {
          const pages = Math.ceil(Number(res.data.amountOfProducts / producstPerPage));
          setAmountOfPages(pages);
          //console.log(pages);
        }

        setUser(res.data.user);
      }).catch(()=>{
        alert('Erro ao buscar informações do usuário!')
      });
    }

    axios.get(`${import.meta.env.VITE_API_URL}/amount-of-products`)
    .then((res) => {
      if(res.data.amount)
      {
        const pages = Math.ceil(Number(res.data.amount / producstPerPage));
        setAmountOfPages(pages == 0 ? 1 : pages);
      }
    })
  }


  return (
    <UserContext.Provider value={{user,setUser,cartItems,setCartItems,clientSearchValue,setClientSearchValue,amountOfPages,setAmountOfPages,getUserInfo}}>
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
          <Route path="/editar-usuario" element={<UserProfile />} />
          <Route path="/carrinho" element={<ViewCart />} />
          <Route path="/minhas-compras" element={<MyPurchases />} />
          <Route path="/meus-produtos" element={<MyProducts />} />
          <Route path="/comprar-carrinho" element={<BuyCart/>}/>
          <Route path="/contato" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
