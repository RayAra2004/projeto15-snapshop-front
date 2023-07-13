import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../Contexts/userContext";
import dayjs from "dayjs";
import Header from "../Components/Header";
import styled from "styled-components";
import { backgroundProduct, mainColor } from "../Colors/colors";

export default function BuyProduct(){
    
    const { id } = useParams();
    const {user, setUser} =  useContext(UserContext);
    //const { token } = user;
    const token = "f1496ae3-5ff7-4f3e-856a-68aa36e84c4a"
    const [product, setProduct] = useState(undefined);
    //idProduto: 64af47c9a0ae3db062b83125

    const location = useLocation();

    const {name,value,picture,quantity} = location.state;

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

    return(
        <>
            
        </>
    );
}