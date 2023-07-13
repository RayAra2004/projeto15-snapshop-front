import { useContext } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UserContext from "../Contexts/userContext";
import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { mainColor } from "../Colors/colors";

export default function CartItem({item}) {
    const {cartItems, setCartItems } = useContext(UserContext);

    function remove() {
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
                setCartItems(newCartItems);
                toast.info( `${item.name} removido do carrinho!`, {
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
        });
    }

    return (
        <SCCartItem>
            <img src={item.picture} alt={item.name} />
            <p>{item.name.substring(0,15)}{item.name.length > 15 ? '...' : ''}</p>
            <p>R$ {Number(item.value).toFixed(2).toString().replace('.',',')}</p>
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

    img{
        height: 80%;
        padding-left: 10px;
        
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