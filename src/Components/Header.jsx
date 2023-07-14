import styled from "styled-components";
import { mainColor } from "../Colors/colors.js";
import favicon from "../assets/favicon.png"
import { BsSearch } from 'react-icons/bs';
import { useLocation, useNavigate } from "react-router";
import banner from '../assets/banner.png'
import { useRef } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useContext } from "react";
import UserContext from "../Contexts/userContext.js";



export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const size = useWindowSize();
    const {clientSearchValue,setClientSearchValue} = useContext(UserContext);
 
    function search()
    {
        console.log(searchRef.current.value);
    }

    return (

        <HeaderContainer pathname ={location.pathname}>
            <div className="content">
                <Logo onClick={() => navigate('/')}>
                    <img className="favicon" src={favicon} alt="" />
                    <h1>SnapShop</h1>
                </Logo>

                {location.pathname !== '/cadastro' && location.pathname !== '/login' && location.pathname !== '/adicionar-produto' && 

                    <SearchBar>
                        <input value={clientSearchValue} onChange={(e)=> setClientSearchValue(e.target.value)} type="text" placeholder={size.width < 500 ? 'Buscar produtos...' : "Buscar produtos, marcas e muito mais…"} />
                        <BsSearch onClick={search} className="search-icon" />
                    </SearchBar>
                }

                <img className="banner" src={banner} title="Loyalty" alt="Loyalty" />
            </div>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`

    width: 100%;
    height: 80px;
    background-color: ${mainColor};
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    border-bottom: ${(props) => props.pathname == '/adicionar-produto' ||  props.pathname == '/login' ||  props.pathname == '/cadastro'  ? '1px solid rgba(255,255,255,0.6)': '0'};

    .content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;

        @media (max-width:815px) {
            justify-content: center;
        }
    }

    .banner{
        margin-right: 20px;
        width: 300px;
        height: 40px;
        cursor: pointer;
        user-select: none;
        @media (max-width:815px) {
            display: none;
        }
    }
`;

const SearchBar = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    input{
        height: 40px;
        width: 100%;
        max-width: 580px;
        padding-left: 10px;
        min-width: 340px;
        border-radius: 20px;
        border: 0;

        &:focus{
            outline: 0.5px solid blue;
        }

        @media (max-width:500px) {
            min-width: 250px;
            width: 80%;
            text-align: center;
        }
    }

    .search-icon{
        position: absolute;
        right: 10px;
        cursor: pointer;
        border-left: 2px solid lightgray;
        padding-left: 10px;
        padding-right: 5px;
        height: 30px;
    }
`;

const Logo = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;

    .favicon{
        transition: all 200ms;
        width: 60px;
        @media (max-width:840px) {
            position: fixed;
            left: 10px;
            top: -5px;
        }

        @media (max-width:500px) {
            left: 10px;
            top: 10px;
            width: 40px;
        }
       
    }

    h1{
        font-family: 'Mulish', sans-serif;
        font-weight: 700px;
        color: white;
        @media (max-width:840px) {
            display: none;
        }
    }

`;