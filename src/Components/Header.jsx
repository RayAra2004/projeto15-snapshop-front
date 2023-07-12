import styled from "styled-components";
import { mainColor } from "../Colors/colors.js";
import favicon from "../../public/favicon.png"
import { BsSearch } from 'react-icons/bs';

export default function Header() {
    return (

        <HeaderContainer>
            <Logo>
                <img className="favicon" src={favicon} alt="" />
                <h1>SnapShop</h1>
            </Logo>

            <SearchBar>
                <input type="text" placeholder="Buscar produtos, marcas e muito mais…" />
                <BsSearch className="search-icon" />
            </SearchBar>

            <div className="banner">
                ANUNCIO
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
    justify-content: space-between;
    align-items: center;

    .banner{
        margin-right: 20px;
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

    .favicon{
        width: 60px;
    }

    h1{
        font-family: 'Mulish', sans-serif;
        font-weight: 700px;
        color: white;
    }

`;