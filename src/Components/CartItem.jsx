import { useContext } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UserContext from "../Contexts/userContext";
import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { mainColor } from "../Colors/colors";
import axios from "axios";
import { useState } from "react";

export default function CartItem({item}) {
    const {cartItems, setCartItems } = useContext(UserContext);
    const [deleting,setDeleting] = useState(false);
    
    const config = {
        headers: {
            "Authorization": localStorage.getItem('token')
        }
    }

    function remove() {
        if(deleting) return;
        setDeleting(true);
        Swal.fire({
            title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:black">Remover ${item.name} do carrinho?</span>`,
            showCancelButton: true,
            confirmButtonColor: '#c9c9c9',
            cancelButtonColor: `${mainColor}`,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            width: 300,
            heightAuto: false,
            imageUrl: item.picture,
            imageWidth: 200,
        }).then((result) => {
            if (result.isConfirmed) {
                const newCartItems = cartItems.filter(i => i._id !== item._id);
                axios.delete(`${import.meta.env.VITE_API_URL}/carrinho/${item._id}`,config)
                .then((res) =>{
                    setCartItems(newCartItems);
                    setDeleting(false);
                    toast.info( `${item.name} removido do carrinho com sucesso!`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    });
                })
                .catch((error)=>{
                    console.log(error);
                    setDeleting(false);
                    toast.error(`Falha ao remover ${item.name} do carrinho!`, {
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

    return (
        <SCCartItem>
            <div className="image">
                <img src={item.picture} alt={item.name} />
                <p>x{item.quantity}</p>
            </div>
            <p>{item.name.substring(0,15)}{item.name.length > 15 ? '...' : ''}</p>
            <p>R$ {Number(item.value * item.quantity).toFixed(2).toString().replace('.',',')}</p>
            <BsFillTrashFill className="delete-btn" onClick={() => remove(item)} />
        </SCCartItem>
    );
}

const SCCartItem = styled.div`
    color: black;
    width: 100%;
    height: 70px;
    background-color: white;
    border-bottom:1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .image{
        height: 80%;
        aspect-ratio: 1;
        flex-shrink: 0;
        margin-left: 5px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        img{
            height: 100%;
            width: 100%;
            opacity: 50%;
        }
        p{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            color: black;
            z-index: 1;
            font-weight: bold;
        }
    }

    
    
    .delete-btn{
        width: 20%;
        color: red;
        transition: all 200ms;
        &:hover{
            color: lightpink;
        }
    }

    cursor: pointer;
    transition: all 200ms;
    font-family: 'Mulish';
    P{
        width: 80%;
        text-align: center;
    }
`;