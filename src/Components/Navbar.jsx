import styled from "styled-components";
import { mainColor } from "../Colors/colors.js";
import { BsFillBellFill, BsFillCartFill, BsPersonCircle, BsFillCaretDownFill, BsFillTrashFill } from 'react-icons/bs';
import { useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import logoutIcon from '../assets/logout.svg';
import UserContext from "../Contexts/userContext.js";
import trash from '../assets/trash.svg';

export default function Navbar() {

    const navigate = useNavigate();
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showCartItems, setShowCartItems] = useState(false);
    const location = useLocation();
    const { user, setUser, cartItems, setCartItems } = useContext(UserContext);
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
                navigate('/');
            }
        });
    }

    function closeDropdowns() {
        setShowUserInfo(false);
        setShowCartItems(false);
    }

    function deleteCartItem(item) {
        Swal.fire({
            title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:black">Remover ${item.name} do carrinho?</span>`,
            showCancelButton: true,
            confirmButtonColor: '#c9c9c9',
            cancelButtonColor: `${mainColor}`,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            width: 300,
            heightAuto: false,
            imageUrl: trash,
            imageWidth: 200,
            imageHeight: 100,
        }).then((result) => {
            if (result.isConfirmed) {
                
            }
        });
    }

    return (

        <>
            {location.pathname !== '/cadastro' && location.pathname !== '/login' &&


                <NavContainer onMouseEnter={closeDropdowns} onMouseLeave={closeDropdowns}>
                    <div className="content">
                        <div className="actions">
                            <Navbutton onClick={() => navigate('#')}>
                                <p>Categorias</p>
                            </Navbutton>
                            <Navbutton onClick={() => navigate('#')}>
                                <p>Histórico</p>
                            </Navbutton>
                            <Navbutton onClick={() => navigate('/meus-produtos')}>
                                <p>Vender</p>
                            </Navbutton>
                            <Navbutton onClick={() => navigate('#')}>
                                <p>Contato</p>
                            </Navbutton>
                        </div>

                        <div className="user-actions">
                            {
                                user &&
                                <Navbutton onMouseEnter={() => setShowUserInfo(true)} >
                                    <BsPersonCircle />
                                    <p className="user">Usuário <BsFillCaretDownFill className="drop" /></p>
                                    {showUserInfo &&
                                        <div onMouseLeave={closeDropdowns} className="user-info">
                                            <div className="btn" onClick={() => navigate('/editar-usuario')}>Editar informações</div>
                                            <div className="btn" onClick={() => navigate('/minhas-compras')}>Compras</div>
                                            <div className="btn" onClick={() => navigate('/meus-produtos')}>Vender</div>
                                            <div className="btn" onClick={logout}>Sair</div>
                                        </div>
                                    }

                                </Navbutton>
                            }
                            {
                                !user &&
                                <>
                                    <Navbutton onMouseEnter={closeDropdowns} onClick={() => navigate('/login')}>
                                        <p>Entre</p>
                                    </Navbutton>
                                    <Navbutton onMouseEnter={closeDropdowns} onClick={() => navigate('/cadastro')}>
                                        <p>Crie uma conta</p>
                                    </Navbutton>
                                </>
                            }
                            <Navbutton onMouseEnter={closeDropdowns} onClick={() => navigate('/minhas-compras')}>
                                <p>Compras</p>
                            </Navbutton>
                            <Navbutton onMouseEnter={closeDropdowns} onClick={() => navigate('#')}>
                                <p>Favoritos</p>
                            </Navbutton>
                            <BsFillBellFill onClick={() => navigate('#')} className="notifications-btn" />
                            <div className="cart">
                                <BsFillCartFill onClick={() => navigate('/carrinho')} className="cart-btn" onMouseEnter={() => setShowCartItems(true)} />
                                <p className="cart-items-amount">{cartItems.length > 0 ? cartItems.length : ''}</p>
                                {
                                    showCartItems &&
                                    <div onMouseLeave={closeDropdowns} className="cart-items">
                                        {cartItems && 
                                            cartItems.length > 0 && 
                                            cartItems.map(item => {
                                            return (
                                                <div className="cart-item">
                                                    <img src={item.picture} alt={item.name} />
                                                    <p>{item.name}</p>
                                                    <BsFillTrashFill className="delete-btn" onClick={() => deleteCartItem(item)} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </NavContainer>
            }
        </>
    );
}

const NavContainer = styled.header`

    width: 100%;
    height: 40px;
    background-color: ${mainColor};
    position: fixed;
    left: 0;
    top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

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
                right: 3px;
                top: 3px;
                font-size: 10px;
                font-weight: bold;
                pointer-events: none;
            }

            .cart-items{
                position: absolute;
                width: 200px;
                background-color: white;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                top: 29px;
                transition: all 200ms;
                right: 0;
                box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1), -3px 0px 3px rgba(0, 0, 0, 0.1);

                .cart-item{
                    color: black;
                    width: 100%;
                    height: 40px;
                    background-color: white;
                    border-bottom:1px solid lightgray;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    img{
                        height: 80%;
                        padding-left: 10px;
                        
                    }
                    
                    .delete-btn{
                        width: 20%;
                        color: red;
                        transition: all 200ms;
                        &:hover{
                            color: lightpink;
                        }
                    }

                    cursor: pointer;
                    transition: all 200ms;
                    font-family: 'Mulish';
                    P{
                        width: 80%;
                        text-align: center;
                    }
                }
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

    &:hover{
        color: lightgray;
    }

    .user{
        display: flex;
        align-items: center;
        justify-content: center;
        .drop{
            padding-top: 5px;
            padding-left: 5px;
            font-size:10px;
        }
    }

    .user-info{
        width: 200px;
        padding-bottom: 20px;
        background-color: white;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        position: absolute;
        top: 29px;
        transition: all 200ms;
        left: 0;
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

