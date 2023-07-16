import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/userContext";
import styled from "styled-components";
import { mainColor, pageBackgroundColor, secondaryColor } from "../Colors/colors";
import { BsFillTrashFill, BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

export default function ViewCart() {

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

        getProducts();

    }, []);

    function getProducts() {
        //TODO: Trocar a roda do banco
        axios.get(`${import.meta.env.VITE_API_URL}/carrinho`, config)
            .then(res => {
                setProducts(res.data);
                //console.log(res.data)
            })
            .catch(res => console.log(res));
    }


    function deleteProduct(e, id, name, picture) {
        e.stopPropagation();
        Swal.fire({
            title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:black">Remover ${name} do banco de dados?</span>`,
            showCancelButton: true,
            confirmButtonColor: '#c9c9c9',
            cancelButtonColor: `${mainColor}`,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            width: 300,
            heightAuto: false,
            imageUrl: picture,
            imageWidth: 200,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/carrinho/${id}`, config)
                    .then(res => {
                        toast.info(`${name} removido do banco de dados!`, {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "colored",
                        });
                        setProducts(products.filter(update => update._id !== id));
                        getProducts();
                    })
                    .catch(res => {
                        console.log(res.data);
                        toast.error(`Falha ao remover ${name} do banco de dados!`, {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "colored",
                        });
                    });
            }
        });

    }

    function viewProduct(prod, e) {
        e.stopPropagation();
        navigate(`/visualizar-produto/${prod._id}`, { state: { product: prod } });
    }

    function buyAll(){
        navigate('/comprar-carrinho', { state: {products}});
    }

    return (
        <SCMyProducts>
            <SCProducts>
                {products && products.length == 0 && <p className="no-purchases">Você não possui itens no carrinho</p>}
                {products && products.length > 0 && <p className="title"><BsFillCartFill /> Carrinho de compras <BsFillCartFill /></p>}
                {products && products.map(product => {
                    if (product) {
                        return (
                            <SCProduct key={uuidv4()}>
                                <div className="left">
                                    <div className="image" onClick={(e) => viewProduct(product, e)}>
                                        <img src={product.picture} alt={product.name} />
                                        <p className="quantity">x{product.quantity}</p>
                                    </div>
                                    <div className="name-desc">
                                        <p onClick={(e) => viewProduct(product, e)} className="name">{product.name.substring(0, 10).trim()}{product.name.length > 10 ? '...' : ''}</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="values">
                                        <span className="value">R${String(Number(product.value).toFixed(2)).replace('.', ',')}</span>
                                        {/* <span className="stock">Estoque:{product.stock}</span> */}
                                    </div>
                                    <SCActions>
                                        <BsFillTrashFill className="delete" onClick={(e) => deleteProduct(e, product._id, product.name, product.picture)} />
                                    </SCActions>
                                </div>
                            </SCProduct>
                        );
                    }
                    else {
                        return (
                            <SCProduct key={uuidv4()}>
                                <div className="left">
                                    <div className="image">
                                        <img src='' alt='' />
                                        <p className="quantity">--</p>
                                    </div>
                                    <div className="name-desc">
                                        <p className="name">Produto Indisponível</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="values">
                                        <span className="value"></span>
                                    </div>
                                    <SCActions>
                                        <BsFillTrashFill className="delete"/>
                                    </SCActions>
                                </div>
                            </SCProduct>
                        );
                    }
                }

                )}
                {!products && <p className="loading">Carregando...</p>}
            </SCProducts>
            <SCBuyAllProducts>
                <button onClick={() => buyAll()}>Comprar Tudo</button>
            </SCBuyAllProducts>
        </SCMyProducts>
    );
}

const SCMyProducts = styled.div`
    background-color: ${pageBackgroundColor};
    margin-top: 120px;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    gap: 30px;

    .left{
        display: flex;
        align-items: center;
    }
    .header{
        max-width: 800px;
        width: 100%;
        min-height: 130px;
        margin-bottom: 40px;
        border-radius: 10px;
        padding: 15px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        box-sizing: border-box;

        @media (max-width:500px) {
            border-radius: 0;
        }
        img{
            height: 100px;
            margin-top: 20px;
        }

        button{
            flex-shrink: 0;
            width: 100%;
            height: 35px;
            border: 0;
            border-radius: 5px;
            background-color: #FF69B4;
            font-family: 'Mulish', sans-serif;
            font-size: 15px;
            font-weight: 700;
            color: #FFFFFF;
            margin-top: 5px;
            cursor: pointer;
            transition: all 200ms;
            &:hover{
                color: ${secondaryColor};
                background-color: white;
                border: 1px solid ${secondaryColor};
            }
        }
    }
`

const SCProducts = styled.div`
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    max-width: 575px;
    width: 100%;
    gap: 10px;


    .title,.loading{
        color: white;
        font-family: 'Mulish', sans-serif;
        font-size: 27px;
        display: flex;
        width: calc(100% - 20px);
       
        align-items: center;
        justify-content: space-between;
    }

    @media (max-width:600px) {
        max-width: 100%;
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

const SCProduct = styled.div`
    background-color: white;
    max-width: 800px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
    border-radius: 10px;
    box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.3);
    @media (max-width:600px) {
        height: fit-content;
        padding-bottom: 20px;
        border-radius: 0;
        
    }
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    .name-desc{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 300px;
        @media (max-width:533px) {
            width:100%;
            height: fit-content;
        }
    }
    div{
        display: flex;
    }

    .stock{
        font-family: 'Mulish', sans-serif;
        color: black;
        font-size: 13px;
    }

    .value{
        font-family: 'Mulish', sans-serif;
        font-size: 18px;
        margin-top: 4px;
    }

    .image{
        height: 60px;
        flex-shrink: 0;
        width: 60px;
        border-radius: 50%;
        border: 2px solid ${mainColor};
        cursor: pointer;
        overflow: hidden;
        position: relative;
        img{
            width: 100%;
            opacity: 50%;
        }

        .quantity{
            position: absolute;
            left: 50%;
            top: 50%;
            color: black;
            font-family: 'Mulish', sans-serif;
            transform: translate(-50%,-50%);
            font-weight: bold;
        }
    }
   

    .name{
        width: 100%;
        font-size: 20px;
        height: auto;
        font-family: 'Mulish', sans-serif;
        font-weight: 700;
        margin-left: 20px;
        cursor: pointer;
        transition: all 200ms;
        &:hover{
            text-decoration: underline;
        }
    }

    .desc{
        font-family: 'Mulish', sans-serif;
        margin-top: 10px;
        font-size: 14px;
        margin-left: 20px;
    }

    span{
        font-size: 30px;
        font-weight: 600;
        color: rgb(96 223 34);
    }

    .right{
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 10px;
        
        .values{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
`

const SCActions = styled.div`
    box-sizing: border-box;
    .delete{
        font-size: 25px;
        cursor: pointer;
        color: ${mainColor};
        transition: all 200ms;
        &:hover{
            color: #DDA0DD;
        }
    }

    .delete{
        margin-right: 10px;
    }
`

const SCBuyAllProducts = styled.div`
    margin-left: 20px;

    button{
        border: none;
        margin-top: 30px;
        background-color: #0ce50c;
        width: 200px;
        height: 50px;
        border-radius: 6px;
        color: white;
        font-size: 20px;
        font-weight: 800;
        margin-left: 35px;
        cursor: pointer;
        font-family: 'Mulish', sans-serif;
    }
`