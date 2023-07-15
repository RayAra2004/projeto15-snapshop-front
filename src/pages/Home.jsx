import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "../Components/ProductItem";
import Footer from "../Components/Footer";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../Contexts/userContext";
import { mainColor } from "../Colors/colors";
export default function Home(){

    const [allProducts,setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {clientSearchValue,amountOfPages} = useContext(UserContext);
    const [currentPage,setCurrentPage] = useState(1);
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/all-products`)
        .then((res) => {
            setAllProducts(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err); 
            alert('Erro ao buscar produtos, olhe o console para mais info!')
            setIsLoading(false);
        })
    },[]);

    function changePage(amount)
    {
        if(currentPage + amount !== 0 && currentPage + amount >=1 && currentPage + amount <= amountOfPages)
        {
            setIsLoading(true);
            axios.get(`${import.meta.env.VITE_API_URL}/all-products?page=${currentPage + amount}`)
            .then((res) => {
                setAllProducts(res.data);
                setIsLoading(false);
                setCurrentPage(currentPage + amount);
            })
            .catch(err => {
                console.log(err); 
                alert('Erro ao buscar produtos, olhe o console para mais info!')
                setIsLoading(false);
            })
        }
    }

    return(
        <PageContainer>
            <img className="banner" decoding="async" src="https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1689183971088-home-sliderdesktop34.jpg" alt="RELÊMPAGO "></img>
            {
                <ProductsContainer>
                    {
                        allProducts && allProducts.length > 0 && allProducts.map((product) =>{
                            return <ProductItem show={product.name.toLowerCase().includes(clientSearchValue.toLowerCase()) || product.category.toLowerCase().includes(clientSearchValue.toLowerCase())} key={product._id} product={product}/>
                        })
                    }
                    {
                        isLoading && <p className="loading">Carregando..</p>
                    }
                </ProductsContainer>
            }
            <HomePageController>
                <button onClick={()=> changePage(-1)}>{'<'}</button>
                    <p>Página {currentPage} de {amountOfPages}</p>
                <button onClick={()=> changePage(1)} >{'>'}</button>
            </HomePageController>
            <Footer/>
        </PageContainer>
        
    );
}

const HomePageController = styled.div`

    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    font-family: 'Mulish', sans-serif;
    color: black;
    margin-bottom: 10px;

    button{
        transition: all 200ms;
        border: 0;
        background:0;
        cursor: pointer;
        color: blue;
        font-weight: bold;
        font-size: 20px;
        &:hover{

        }
    }
`;

const PageContainer = styled.div`

    width: 100%;
    height: auto;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;

    .banner{
        margin-top: 120px;
        max-width: 100%;
        width: 100%;
    }
`;

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    height: auto;
    max-height: 1260px;
    flex-direction: row;
    margin-bottom: 120px;

    .loading{
        color: ${mainColor};
        font-family: 'Mulish', sans-serif;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 20px;
        white-space: nowrap;
    }

    @media (max-width:440px) {
        margin-bottom: 180px;
    }
`;