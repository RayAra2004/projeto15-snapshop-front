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
export default function Home(){

    const [allProducts,setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {clientSearchValue,amountOfPages,setClientSearchValue,getUserInfo} = useContext(UserContext);
    const [currentPage,setCurrentPage] = useState(1);
    const [currentBanner, setCurrentBanner] = useState(0);
    const location = useLocation();
    const banners = [
        'https://http2.mlstatic.com/D_NQ_880633-MLA70477554913_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_603228-MLA70502856957_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_969639-MLA70502889119_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_687470-MLA70502996705_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_613294-MLA70502998531_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_605511-MLA70477564256_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_727681-MLA70477708062_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_702369-MLA70504685369_072023-OO.webp',
      ];
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

    function orderByName(array) {
        if (array) {
          return array.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          });
        }else{
            return null;
        }
        
      }

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentBanner((prevBanner) =>
            (prevBanner + 1) % banners.length
          );
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);
    

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
            <div className="banner-slider">
                {banners.map((banner, index) => (
                    <img
                    key={index}
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className={index === currentBanner ? 'active' : ''}
                    decoding="async"
                    />
                ))}
            </div>
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

   

    .banner-slider {
        position: relative;
        width: 100%;
        height: 300px;
        overflow: hidden;
        margin-top: 120px;
        max-width: 100%;
       
    }

    .banner-slider img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .banner-slider img.active {
        opacity: 1;
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