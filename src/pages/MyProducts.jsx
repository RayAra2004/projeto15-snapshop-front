import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/userContext";
import styled from "styled-components";
import { mainColor } from "../Colors/colors";
import { BsFillTrashFill } from "react-icons/bs";
import { BiSolidEdit } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import illustration from '../assets/my_products.svg';

export default function MyProducts() {

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
        axios.get(`${import.meta.env.VITE_API_URL}/meus-produtos`, config)
            .then(res => {
                setProducts(res.data);
            })
            .catch(res => console.log(res));
    }


    function deleteProduct(id, picture, name, e) {
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
                axios.delete(`${import.meta.env.VITE_API_URL}/remover-produto/${id}`, config)
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

    function newProduct()
    {
        navigate('/adicionar-produto');
    }

    return (
        <SCMyProducts>

            <SCProducts>
                <aside className="header">
                    <img src={illustration} alt="" />
                    <button onClick={newProduct}>Cadastrar novo produto</button>
                </aside>
                {products && products.map(product =>
                    <SCProduct key={uuidv4()}>
                        <div>
                            <img onClick={(e) => viewProduct(product, e)} src={product.picture} alt={product.name} />
                            <div className="name-desc">
                                <p onClick={(e) => viewProduct(product, e)} className="name">{product.name}</p>
                                <p className="desc">{product.description.substring(0, 120).trim()}{product.description.length > 120 ? '...' : ''}</p>
                            </div>

                        </div>
                        <div className="right">
                            <span className="value">R${String(Number(product.value).toFixed(2)).replace('.', ',')}</span>
                            <span className="stock">Estoque:{product.stock}</span>

                            <SCActions>
                                <BiSolidEdit className="edit" onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/editar-produto/${product._id}`, { state: { product } })
                                }} />
                                <BsFillTrashFill className="delete" onClick={(e) => deleteProduct(product._id, product.picture, product.name, e)} />
                            </SCActions>
                        </div>
                    </SCProduct>
                )}
                {!products && <p>Carregando...</p>}
            </SCProducts>

        </SCMyProducts>
    );
}

const SCMyProducts = styled.div`
    background-color: ${mainColor};
    margin-top: 120px;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    gap: 30px;
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
                color: #FF1493;
                background-color: white;
                border: 1px solid #FF1493;
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
`

const SCProduct = styled.div`
    background-color: white;
    max-width: 800px;
    width: 100%;
    box-sizing: border-box;
    height: 200px;
    margin-bottom: 40px;
    border-radius: 10px;
    @media (max-width:500px) {
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
    }

    
    img{
        width: 130px;
        max-width: 130px;
        height: 130px;
        border-radius: 50%;
        border: 2px solid ${mainColor};
        cursor: pointer;
        @media (max-width:533px) {
            height: 60px;
            width: 60px;
        }
    }

    .name{
        width: 100%;
        @media (max-width:500px) {
           font-size: 20px;
        }
        height: auto;
        font-family: 'Mulish', sans-serif;
        font-weight: 700;
        font-size: 30px;
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
        height: 130px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-right: 30px;

        @media (max-width:533px) {
            height: fit-content;
            margin-right: 10px;
            align-self: flex-start;
        }
    }
`

const SCActions = styled.div`
    display: flex;
    box-sizing: border-box;
    margin-top: 20px;
    gap: 20px;
    .edit, .delete{
        font-size: 25px;
        cursor: pointer;
        color: ${mainColor};
        transition: all 200ms;
        &:hover{
            color: #DDA0DD;
        }

        @media (max-width:500px) {
           font-size: 15px;
        }
    }

    .delete{
        margin-right: 10px;
    }
`