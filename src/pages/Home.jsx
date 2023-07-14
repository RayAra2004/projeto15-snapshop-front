import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "../Components/ProductItem";
import Footer from "../Components/Footer";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../Contexts/userContext";
export default function Home(){

    const [allProducts,setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {clientSearchValue} = useContext(UserContext);
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
    },[])

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
                        isLoading && <p>Carregando..</p>
                    }
                </ProductsContainer>
            }
            <Footer/>
        </PageContainer>
        
    );
}

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
    @media (max-width:440px) {
        margin-bottom: 180px;
    }
`;