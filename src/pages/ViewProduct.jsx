import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../Contexts/userContext";
import styled from "styled-components";
import { backgroundProduct, mainColor } from "../Colors/colors";

export default function ViewProduct(){

    const { id } = useParams();
    const {user, setUser} =  useContext(UserContext);
    //const { token } = user;
    const token = "f1496ae3-5ff7-4f3e-856a-68aa36e84c4a"
    const [product, setProduct] = useState(undefined);
    //idProduto: 64af47c9a0ae3db062b83125

    const config = {
        headers: {
            "Authorization": `${token}`
        }
    }

    useEffect( () => {
        axios.get(`${import.meta.env.VITE_API_URL}/visualizar-produto/${id}`, config)
            .then(res => {
                setProduct(res.data);
                console.log(res.data);
            })
            .catch(res => alert(res.message))

    }, [])

    function loadProduct(){
        if(!product) return <p>Carregando..</p>

        return(
            <> 
                <img src={product.picture} alt={`Image do ${product.name}`}/>
                <div>
                    <p>{product.name}</p>
                    <SCPrice>R${String(Number(product.value).toFixed(2)).replace('.', ',')}</SCPrice>
                </div> 
            </>
        )
    }

    return(
        <SCBuyProduct>
            <SCProduct>
                {loadProduct()}
            </SCProduct>
        </SCBuyProduct>
        );
}

const SCBuyProduct = styled.div`
    background-color: ${mainColor};
    height: 100%;
    display: flex;
    justify-content: center;
`

const SCProduct = styled.div`
    margin-top: 160px;
    background-color: ${backgroundProduct};
    width: 1184px;
    display: flex;
    border-radius: 5px;
    box-shadow: 1px 6px 15px 1px black;
    img{
        width: 378px;
        height: 468px;
    }

    p{
        font-family: 'Mulish', sans-serif;
        font-size: 32px;
        font-weight: 800;
        width: 400px;
        margin-bottom: 40px;
    }
`

const SCPrice = styled.span`
    font-family: 'Mulish', sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin-top: 40px;
`