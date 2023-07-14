import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/userContext";
import styled from "styled-components";
import { mainColor } from "../Colors/colors";
import { BsFillTrashFill } from "react-icons/bs";
import {BiSolidEdit} from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

export default function MyProducts(){

    const [products, setProducts] = useState(undefined);
    const {user, setUser} =  useContext(UserContext);
    const navigate = useNavigate();
    //const { token } = user;
    const token = "16615766-ec8c-457f-abe6-fd5d31f01125"

    const config = {
        headers: {
            "Authorization": `${token}`
        }
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/minhas-compras`, config)
            .then(res => {
                setProducts(res.data);
                console.log(res.data);
            })
            .catch(res => console.log(res));
    }, [products]);

    function deleteProduct(id){
        axios.delete(`${import.meta.env.VITE_API_URL}/remover-produto/${id}`, config)
            .then(res => {
                setProducts(products.filter(update => update._id !== id))
            })
            .catch(res => console.log(res.data));
    }

    function renderProducts(){
        if(products === undefined) return <p>Carregando...</p>
        return(
            products.map(product => 
                <SCProduct key={product._id}>
                    <div>
                        <img src={product.picture} alt={product.name}/>
                        <p>{product.name}</p>
                        <span>R${String(Number(product.value).toFixed(2)).replace('.', ',')}</span>
                    </div>           
                    <div>
                        <SCActions>
                            <BsFillTrashFill className="delete" onClick={() => deleteProduct(product._id)}/>
                            <BiSolidEdit className="edit" onClick={() => {
                                navigate(`/editar-produto/${product._id}`,{state:{product}})
                            }}/>
                        </SCActions>
                    </div>
                </SCProduct>
            )
        )
    }

    return(
        <SCMyProducts>
            <SCProducts>
                {renderProducts()}
            </SCProducts>
        </SCMyProducts>
        );
}

const SCMyProducts = styled.div`
    background-color: ${mainColor};
    margin-top: 120px;
    min-height: 100%;
`

const SCProducts = styled.div`
    margin-left: 40px;
    padding-top: 30px;
`

const SCProduct = styled.div`
    background-color: rgb(237 237 237);
    width: 800px;
    height: 200px;
    margin-bottom: 40px;
    border-radius: 10px;
    padding: 15px;
    div{
        display: flex;
    }

    div:nth-child(1){
        height: 130px;
    }
    img{
        width: 130px;
        max-width: 130px;
        height: 130px;
        border-radius: 70px;
        margin-right: 15px;
    }

    p{
        width: 500px;
        height: auto;
        font-family: 'Mulish', sans-serif;
        font-weight: 700;
        font-size: 30px;
    }

    span{
        font-size: 30px;
        font-weight: 600;
        color: rgb(96 223 34);
        margin-top: 10px;
    }
`

const SCActions = styled.div`
    margin-left: 170px;
    margin-top: -12px;

    .edit, .delete{
        font-size: 25px;
        cursor: pointer;
    }

    .delete{
        margin-right: 10px;
    }
`