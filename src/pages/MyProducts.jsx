import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/userContext";
import styled from "styled-components";
import { mainColor } from "../Colors/colors";
import { BsFillTrashFill } from "react-icons/bs";
import {BiSolidEdit} from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function MyProducts(){

    const [products, setProducts] = useState(undefined);
    const {user, setUser} =  useContext(UserContext);
    const navigate = useNavigate();
    const token  = localStorage.getItem('token');
    const config = {
        headers: {
            "Authorization": `${token}`
        }
    }

    useEffect(() => {
        if(!token)
        {
            navigate('/');
            return;
        }

        getProducts();
        
    }, []);

    function getProducts()
    {
        axios.get(`${import.meta.env.VITE_API_URL}/meus-produtos`, config)
            .then(res => {
                setProducts(res.data);
            })
        .catch(res => console.log(res));
    }
    

    function deleteProduct(id,picture,name){

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
                            <BsFillTrashFill className="delete" onClick={() => deleteProduct(product._id,product.picture,product.name)}/>
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