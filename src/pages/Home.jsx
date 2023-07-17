import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "../Components/ProductItem";
import Footer from "../Components/Footer";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../Contexts/userContext";
import { mainColor } from "../Colors/colors";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingComponent from "../Components/LoadingComponent";
import BannerComponent from "../Components/BannerComponent";
import { orderByName } from "../Utils/utils";
export default function Home(){

    const [allProducts,setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {clientSearchValue,amountOfPages,setClientSearchValue,getUserInfo} = useContext(UserContext);
    const [currentPage,setCurrentPage] = useState(1);
    const location = useLocation();
   
    useEffect(()=>{
        getUserInfo();
        const queryParams = new URLSearchParams(location.search);
        const searchParam = queryParams.get('search');
        if(searchParam && searchParam != ''){
            setClientSearchValue(searchParam);
        }

        setIsLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/all-products`)
        .then((res) => {
            setAllProducts(orderByName(res.data));
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err); 
            toast.error( `Erro ao buscar produtos, ${err.response.data} olhe o console para mais info!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
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
                toast.error( `Erro ao buscar produtos, ${err.response.data} olhe o console para mais info!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                setIsLoading(false);
            })
        }
    }

    return(
        <PageContainer>
            <BannerComponent/>
            {
                <ProductsContainer>
                    {
                        allProducts && allProducts.length > 0 && allProducts.map((product) =>{
                            if(product && product.name && product.category && product._id)
                            {
                                return <ProductItem show={product.name.toLowerCase().includes(clientSearchValue.toLowerCase()) || product.category.toLowerCase().includes(clientSearchValue.toLowerCase())} key={product._id} product={product}/>
                            }
                        })
                    }
                    {
                        isLoading && <LoadingComponent glass={true}/>
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
    color: black;
    margin-bottom: 10px;

    button{
        border: 0;
        background:0;
        cursor: pointer;
        color: blue;
        font-weight: bold;
        font-size: 20px;
        &:hover{
            color: lightblue;
        }
    }
`;

const PageContainer = styled.div`
    width: 100%;
    height: auto;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    *{
        transition: all 200ms;
        font-family: 'Mulish', sans-serif;
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
    max-width: 1300px;
    flex-direction: row;
    margin-bottom: 120px;

    @media (max-width:440px) {
        margin-bottom: 180px;
    }
`;