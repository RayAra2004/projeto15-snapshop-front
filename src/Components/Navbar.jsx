import styled from "styled-components";
import { headerColor, mainColor } from "../Colors/colors.js";
import { BsFillBellFill, BsFillCartFill, BsPersonCircle, BsFillCaretDownFill, BsFillTrashFill } from 'react-icons/bs';
import { useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import logoutIcon from '../assets/logout.svg';
import UserContext from "../Contexts/userContext.js";
import { v4 as uuidv4 } from 'uuid';
import CartItem from "./CartItem.jsx";
import { BiSolidStar } from "react-icons/bi";
import {FaMoneyBillAlt} from 'react-icons/fa';
import {AiFillPhone} from 'react-icons/ai';
import { useWindowSize } from "@uidotdev/usehooks";
import {FaHistory} from 'react-icons/fa';

export default function Navbar() {

    const navigate = useNavigate();
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showCartItems, setShowCartItems] = useState(false);
    const location = useLocation();
    const size = useWindowSize();
    const { user,setUser,cartItems } = useContext(UserContext);
    function logout() {
        Swal.fire({
            title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:black">Deseja sair?</span>`,
            showCancelButton: true,
            confirmButtonColor: '#c9c9c9',
            cancelButtonColor: `${mainColor}`,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            width: 300,
            heightAuto: false,
            imageUrl: logoutIcon,
            imageWidth: 200,
            imageHeight: 100,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                setUser(null);
                navigate('/');
            }
        });
    }

    function closeDropdowns() {
        setShowUserInfo(false);
        setShowCartItems(false);
    }

    function showCart()
    {
        if(location.pathname !== '/comprar-carrinho' && location.pathname !== '/comprar-carrinho' && size.width > 500 && cartItems && cartItems.length > 0)
        {
            setShowCartItems(true); 
            setShowUserInfo(false);
        }
    }

   
    return (
        <>
            {location.pathname !== '/cadastro' && location.pathname !== '/login' && location.pathname !== '/adicionar-produto' &&

                <NavContainer amount={cartItems.length} onMouseEnter={closeDropdowns} onMouseLeave={closeDropdowns}>
                    <div className="content">
                        <div className="actions">
                           {
                            size.width > 800 && 
                            <Navbutton title="Categorias">
                                <p>Categorias</p>
                            </Navbutton>
                           }
                            {
                                user && 
                               <>
                                <Navbutton title="Histórico">
                                    {size.width < 800 ? <FaHistory/> : <p>Histórico</p>}
                                </Navbutton>
                                {
                                    size.width > 800 && 
                                    <Navbutton title="Vender" onClick={() => {navigate('/meus-produtos'); closeDropdowns();}}>
                                        <p>Vender</p>
                                    </Navbutton>
                                }
                                
                               </>
                            }
                            <Navbutton title="Contato">
                                {size.width < 800 ? <AiFillPhone/> : <p onClick={()=> navigate('/contato')}>Contato</p>}
                            </Navbutton>
                        </div>

                        <div className="user-actions">
                           
                            {
                                !user &&
                                <>
                                    <Navbutton title="Entrar" onMouseEnter={closeDropdowns} onClick={() => navigate('/login')}>
                                        <p>Entre</p>
                                    </Navbutton>
                                    <Navbutton title="Criar uma conta" onMouseEnter={closeDropdowns} onClick={() => navigate('/cadastro')}>
                                        <p>Crie uma conta</p>
                                    </Navbutton>
                                </>
                            }
                            {
                                user && 
                                <>
                                    <Navbutton title="Compras" onMouseEnter={closeDropdowns} onClick={() => navigate('/minhas-compras')}>
                                        {size.width < 800 ? <FaMoneyBillAlt/> : <p>Compras</p>}
                                    </Navbutton>
                                    <Navbutton title="Favoritos" onMouseEnter={closeDropdowns} onClick={() => navigate('#')}>
                                        {size.width < 800 ? <BiSolidStar/> : <p>Favoritos</p>}
                                    </Navbutton>
                                </>
                            }
                           
                            <BsFillBellFill className="notifications-btn" />
                            <div className="cart">
                                <BsFillCartFill onClick={() => {navigate('/carrinho'); closeDropdowns();}} className="cart-btn" onMouseEnter={showCart} />
                                <p className="cart-items-amount">{cartItems.length > 0 ? cartItems.length : ''}</p>
                                {
                                    showCartItems &&
                                    <div onMouseLeave={closeDropdowns} className="cart-items">
                                        {cartItems && cartItems.length > 0 && cartItems.map(cartItem => <CartItem key={uuidv4()} item={cartItem} />)}
                                    </div>
                                }
                            </div>
                            {
                                user &&
                                <Navbutton title="Usuario" onMouseEnter={() => {setShowUserInfo(true); setShowCartItems(false);}} >
                                    <BsPersonCircle />
                                    <p className="user">{user.userName}<BsFillCaretDownFill className="drop" /></p>
                                    {showUserInfo &&
                                        <div onMouseLeave={closeDropdowns} className="user-info">
                                            <div title="Editar usuário" className="btn" onClick={() => navigate('/editar-usuario')}>Editar informações</div>
                                            <div title="Minhas compras"className="btn" onClick={() => navigate('/minhas-compras')}>Compras</div>
                                            <div title="Vender" className="btn" onClick={() => navigate('/meus-produtos')}>Vender</div>
                                            <div title="Sair" className="btn" onClick={logout}>Sair</div>
                                        </div>
                                    }

                                </Navbutton>
                            }
                        </div>
                        
                    </div>
                </NavContainer>
            }
        </>
    );
}

const NavContainer = styled.header`
    z-index: 1;
    width: 100%;
    height: 40px;
    background-color: ${headerColor};
    position: fixed;
    left: 0;
    top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.6);

    .content{
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .actions,.user-actions{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }

    .user-actions{

        .notifications-btn,.cart-btn{
            color: white;
            transition: all 200ms;
            cursor: pointer;
            &:hover{
                color: lightgray;
            }
        }

        .cart{
            position: relative;
            justify-content: center;
            display: flex;
            align-items: center;
            .cart-items-amount{
                position: absolute;
                right: ${(props)=> props.amount < 10 ? '5px' : '3px'};
                top: 4px;
                font-size: 9px;
                font-weight: bold;
                pointer-events: none;
                
            }

            .cart-items{
                position: absolute;
                width: 300px;
                background-color: white;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                top: 29px;
                transition: all 200ms;
                right: 0;
                overflow: hidden;
                box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1), -3px 0px 3px rgba(0, 0, 0, 0.1);
            }
        }
    }
}

`;

const Navbutton = styled.button`

    color: white;
    border: 0;
    background:none;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 200ms;
    *{
        transition: all 200ms;
    }

    &:nth-child(1)
    {
        margin-left: 10px;
    }


    &:hover{
       p{
        color: lightgray;
       }
    }

    p{
        color:white;
    }

    .user{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        .drop{
            padding-top: 5px;
            padding-left: 5px;
            font-size:10px;
        }
        
    }

    .user-info{
        width: 200px;
        background-color: white;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-left-radius: 5px;
        overflow: hidden;
        position: absolute;
        top: 29px;
        transition: all 200ms;
        left: -110px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1), -3px 0px 3px rgba(0, 0, 0, 0.1);

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .btn{
            color: black;
            width: 100%;
            height: 40px;
            background-color: white;
            border: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 200ms;
            &:hover{
                background-color: #f0f0f0;
            }
           
        }
    }
`;