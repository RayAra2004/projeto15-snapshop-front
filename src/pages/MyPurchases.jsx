import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mainColor, pageBackgroundColor, secondaryColor } from "../Colors/colors";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/userContext";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { BiSolidTruck } from "react-icons/bi";


export default function MyPurchases() {
    const [products, setProducts] = useState(undefined);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            "Authorization": `${token}`
        }
    }

    useEffect(() => {

        if (!token) {
            navigate('/');
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/minhas-compras`, config)
            .then(res => {
                setProducts(res.data);
            })
            .catch(res => console.log(res));
    }, []);

    function renderProducts() {
        if (products === undefined) return <p>Carregando...</p>
        if (products && products.length == 0) return <p className="no-purchases">Você não possui compras</p>
        return (
            products.map(product => {
                if (product.name !== undefined) {
                       return ( <Purchase key={uuidv4()}>
                        
                            <div className="main">
                                <div className="image-and-name">
                                    <img src={product.picture} alt={product.name} />
                                    <p>{product.name.substring(0,10).trim()}{product.name.length > 10 ? '...' : ''}</p>
                                </div>
                               <div className="numbers">
                                    <span>R${String(Number(product.value).toFixed(2)).replace('.', ',')}</span>
                                    <p className="quant">Quantidade:{product.info.amount}</p>
                               </div>
                            </div>
                            <div className="secondary">
                                <p className="adress"><BiSolidTruck className="truck"/> {`${product.info.street} ${product.info.number} - ${product.info.neighborhood} - ${product.info.city},${product.info.state}`.substring(0,40)}...</p>
                            </div>
                        
                    </Purchase>)
                }
            }
            )
        )
    }

    return (
        <SCMyPurchases>
            <SCProducts>
                {renderProducts()}
            </SCProducts>
        </SCMyPurchases>
    );
}


const SCMyPurchases = styled.div`
    background-color: ${pageBackgroundColor};
    margin-top: 120px;
    width: 100%;
    overflow-x: hidden;
    min-height: 100%;
    display: flex;
    justify-content: center;
`

const SCProducts = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    gap: 20px;
    transition: all 200ms;
    @media (max-width:583px) {
       padding: 0;
       margin-top: 40px;
    }

    .no-purchases{
        color: white;
        font-family: 'Mulish', sans-serif;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 20px;
        white-space: nowrap;
    }
`

const Purchase = styled.div`
    background-color: white;
    width: 100%;
    max-width: 600px;
    min-height: 120px;
    border-radius: 10px;
    padding: 15px;
    box-sizing: border-box;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: all 200ms;

    @media (max-width:583px) {
       border-radius: 0;
    }
    
    *{
        font-family: 'Mulish', sans-serif;
        transition: all 200ms;

    }

    .main{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .image-and-name{
            display: flex;
            align-items: center;
            width: 200px;

            p{

                white-space: nowrap;
                @media (max-width:459px) {
                    font-size: 20px;
                }
            }
        }

        .numbers{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: auto;
            span{
                @media (max-width:459px) {
                    font-size: 20px;
                }
            }
        }
        .quant{
            width: auto;
            font-size: 12px;
            text-align: right;
        }
        
    }

    .secondary{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5px;
        .adress{
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
            line-break: anywhere;
        }

        .truck{
            color: ${mainColor};
        }
    }

    img{
        width: 70px;
        max-width: 130px;
        height: 70px;
        border-radius: 50%;
        margin-right: 15px;
        border: 1px solid ${secondaryColor};
    }

    p{
        width: 500px;
        height: auto;
        font-weight: 700;
        font-size: 30px;
    }

    span{
        font-size: 30px;
        font-weight: 600;
        color: rgb(96 223 34);
        margin-top: 10px;
        text-align: right;

    }
`