import styled from "styled-components";
import { mainColor } from "../Colors/colors.js";
import favicon from "../../public/favicon.png"
import { BsSearch, BsFillBellFill ,BsFillCartFill} from 'react-icons/bs';
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Navbar() {

    const navigate = useNavigate();
    const [showUserInfo,setShowUserInfo] = useState(false);

    return (

        <NavContainer>
            <div className="actions">
                <Navbutton onClick={() => navigate('#')}>
                    <p>Categorias</p>
                </Navbutton>
                <Navbutton onClick={() => navigate('#')}>
                    <p>Histórico</p>
                </Navbutton>
                <Navbutton onClick={() => navigate('/adicionar-produto')}>
                    <p>Vender</p>
                </Navbutton>
                <Navbutton onClick={() => navigate('#')}>
                    <p>Contato</p>
                </Navbutton>
            </div>

            <div className="user-actions">
                <Navbutton onMouseEnter={()=> setShowUserInfo(true)} onMouseLeave={()=> setShowUserInfo(false)}>
                    <p>Usuário</p>
                    
                </Navbutton>
                <Navbutton onClick={() => navigate('/minhas-compras')}>
                    <p>Compras</p>
                </Navbutton>
                <Navbutton onClick={() => navigate('#')}>
                    <p>Favoritos</p>
                </Navbutton>
                <BsFillBellFill onClick={() => navigate('#')} className="notifications-btn"/>
                <BsFillCartFill onClick={()=> navigate('/carrinho')} className="cart-btn"/>
            </div>
        </NavContainer>

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
    justify-content: space-evenly;
    align-items: center;

    .actions,.user-actions{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .user-actions{

        .notifications-btn,.cart-btn{
            color: white;
            margin-left: 20px;
            cursor: pointer;
        }
    }
`;

const Navbutton = styled.button`

    color: white;
    border: 0;
    background:none;
    cursor: pointer;

    &:hover{
        color: lightgray;
    }

    .user-info{
        width: 200px;
        height: 300px;
        background-color: red;
    }
`;

