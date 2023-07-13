import styled from "styled-components";
import { mainColor } from "../Colors/colors.js";
import favicon from "../assets/favicon.png"
import { BsSearch } from 'react-icons/bs';
import { useLocation, useNavigate } from "react-router";
import banner from '../assets/banner.png'
import { useRef } from "react";

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const searchRef = useRef();
    
 
    function search()
    {
        console.log(searchRef.current.value);
    }

    return (

        <HeaderContainer>
            <div className="content">
                <Logo onClick={() => navigate('/')}>
                    <img className="favicon" src={favicon} alt="" />
                    <h1>SnapShop</h1>
                </Logo>

                {location.pathname !== '/cadastro' && location.pathname !== '/login' &&

                    <SearchBar>
                        <input ref={searchRef} type="text" placeholder="Buscar produtos, marcas e muito mais…" />
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

    .content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
    }

    .banner{
        margin-right: 20px;
        width: 300px;
        height: 40px;
        cursor: pointer;
        user-select: none;
        
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

        &:focus{
            outline: 0.5px solid blue;
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
        width: 60px;
    }

    h1{
        font-family: 'Mulish', sans-serif;
        font-weight: 700px;
        color: white;
    }

`;