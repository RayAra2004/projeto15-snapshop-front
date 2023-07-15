import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../Contexts/userContext";
import styled from "styled-components";
import { backgroundProduct, installmentsColor, mainColor } from "../Colors/colors";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

export default function ViewProduct() {
    const { product } = useLocation().state;
    const { name, value, picture, description, _id, stock ,category} = product;
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const { cartItems,setCartItems } = useContext(UserContext);
    const itemsFound = cartItems.filter(item => item._id == _id);
    const navigate = useNavigate();
    const config = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }

    useEffect(() => {
        if (stock && stock > 0) {
            setSelectedQuantity(1);
        }
    }, [])

    function updateQuantity() {
        if (stock) {
            if (selectedQuantity >= stock) {
                selectedQuantity(stock);
            }
            else if (selectedQuantity < 1) {
                setSelectedQuantity(1);
            }
        }
        else {
            setSelectedQuantity(0);
        }
    }

    function buy() {
        navigate(`/comprar/${_id}`,{state:{name:product.name , quantity:selectedQuantity,value:product.value, picture:product.picture }});
    }

    function addToCart() {
        // ADICIONAR SÓ SE O ITEM NÃO EXISTE NO CARRINHO
        const itemsFound = cartItems.filter(item => item._id == _id);
       if(itemsFound.length == 0){
            const newCartItem = {name,picture,_id,value,quantity:selectedQuantity};
            // ATUALIZAR NO BANCO DE DADOS
            axios.post(`${import.meta.env.VITE_API_URL}/carrinho/${_id}?quantity=${selectedQuantity}`,null,config)
            .then((res)=>{
                setCartItems([...cartItems,newCartItem]);
                toast.success(`${name} adicionado ao carrinho!`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            }).catch((error)=>{
                toast.error(`Falha ao adicionar ${name} ao carrinho!`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(error);
            });
       }
       else
       {
        toast.error( 'Produto já existe no carrinho!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
       }
    }

    return (
        <>
        <SCBuyProduct>
            <SCProduct>
                
                <div className="content">
                    <img src={picture} alt={name} />
                    <div className="info">
                        <h1 className="category">Produtos <span>{'>'}</span> {category}</h1>
                        <p className="name">{name}</p>
                        <div className="price-container">
                            <p className="price">R${String(Number(value).toFixed(2)).replace('.', ',')}</p>
                            <p className="installments"><span>em </span>10x de R$ {(value.toFixed(2) / 10).toFixed(2).toString().replace('.', ',')}</p>
                        </div>
                        <p className="has-stock">{stock && stock > 0 ? 'Estoque disponível' : 'Sem estoque'}</p>
                        <div className="actions">
                            <div className="quantity">
                                <p>Quantidade: 
                                    <input type="number"
                                        onBlur={updateQuantity}
                                        placeholder="1"
                                        min={stock ? 1 : 0}
                                        max={stock ? stock : 0}
                                        value={selectedQuantity}
                                        onChange={(e) => setSelectedQuantity(Number(e.target.value.toString().replace('-', '')) < stock ? Number(e.target.value.toString().replace('-', '')) : stock)}
                                    />
                                    <span className="available"> ({stock ? stock : 0} disponíveis)</span> </p>
                            </div>
                            <button className="buy-btn" onClick={buy} disabled={stock && stock > 0 ? false : true}>{stock && stock > 0 ? 'Comprar agora' : 'Produto indisponível'}</button>
                            <button onClick={addToCart} disabled={stock && stock > 0  && itemsFound == 0 ? false : true}>{stock && stock > 0 && itemsFound == 0 ? 'Carrinho' : stock == 0 ? 'Carrinho': 'Ja está no carrinho!' }</button>
                        </div>
                    </div>
                </div>
                
                    <div className="description">
                    <h1>Descrição do produto</h1>
                    <p>
                        {description ? description : 'Nada a mostrar aqui..'}
                    </p>
                </div>
                
            </SCProduct>
           
        </SCBuyProduct>
         <Footer/>
        </>
    );
}

const SCBuyProduct = styled.div`
    background-color: ${mainColor};
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const SCProduct = styled.div`
    margin-top: 160px;
    background-color: ${backgroundProduct};
    max-height: fit-content;
    width: 100%;
    max-width: 620px;
    display: flex;
    border-radius: 5px;
    box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.3);
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;
    margin-bottom: 80px;
    overflow: hidden;

    @media (max-width:573px) {
        border-radius: 0;
    }

    
    .description{
        
        width: calc(100% - 20px);
        margin-top: 20px;
        min-height: 100px;
        height:fit-content;

        @media (max-width:573px) {
            width: calc(100% - 20px);
            max-width: 100%;
        }
       
        h1{
            font-family: 'Mulish', sans-serif;
            font-weight: bold;
            font-size: 20px;
            padding-bottom: 5px;
            border-bottom: 1px solid rgba(0,0,0,0.3);
            
        }

        p{
            margin-top: 10px;
        }
    }

    .content{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        @media (max-width:573px) {
            width: 100%;
            flex-direction: column;
        }
    }

    .category{
        position: absolute;
        top: 10px;
        right: 10px;
        font-weight: bold;
        color: #2968c8;
        font-family: 'Mulish', sans-serif;
        cursor: pointer;
        @media (max-width:573px) {
            top: 10px;
            left: 50%;
            width: fit-content;
            transform: translate(-50%);
        }
    }

    img{
        @media (max-width:573px) {
            margin-top: 40px;
            max-width: 100%;
            margin-left: 0;
            border-radius: 0;
        }

        max-width: 300px;
        width: 100%;
        object-fit: scale-down;
        box-sizing: border-box;
        margin-left: 10px;
        margin-top: 10px;
        border-radius: 5px;
        margin-right: 10px;
        &:hover{
            object-fit: cover;
            cursor: zoom-in;
        }
    }

    p{
        font-family: 'Mulish', sans-serif;
    }

    .info{
        margin-top: 10px;
        box-sizing: border-box;
        border-left: 1px solid rgba(0,0,0,0.3);
       
        max-width: 320px;
        width: 100%;
        padding-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
        height: 90%;
        display: flex;
        justify-content: flex-start;
        gap: 20px;
        flex-direction: column;
       
        
        @media (max-width:573px) {
            border: 0;
            margin: 0;
            max-width: 100%;
            padding-left: 10px;
            padding-right: 10px;
        }
        .name{
            font-size: 25px;
            font-weight: bold;
        }

        .installments{
            font-size: 14px;
        }

        .price{
            font-size: 30px;
            font-weight: normal;
            color: ${installmentsColor};
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        .buy-btn{
            margin-top: 20px;
        }

        .price-container{
            display: flex;
            justify-content: center;
            flex-direction: column;
            gap: 10px;
            @media (max-width:573px) {
                width: 100%;
            }
        }

        .has-stock{
            font-weight: bold;
        }
    }

    .available{
        font-size: 12px;
        color: #8b8282;
    }

    input{
        width: 30px;
        margin-left: 3px;
        &:focus{
            outline: 1px solid #FF1493;
        }
        &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
    }

    button{
        width: 100%;
        box-sizing: border-box;
        height: 35px;
        border: 1px solid rgba(0,0,0,0);
        border-radius: 5px;
        background-color: #FF69B4;
        font-family: 'Mulish', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: #FFFFFF;
        margin-top: 5px;
        cursor: pointer;
        transition: all 200ms;
        &:enabled{
                &:hover{
                color: #FF1493;
                background-color: white;
                border: 1px solid #FF1493;
            }
        }

        &:disabled{
            cursor: not-allowed;
            background-color: #974d72;
        }
    }
  
`