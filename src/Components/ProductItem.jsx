import styled from "styled-components";
import { installmentsColor, shipmentColor } from "../Colors/colors";
import { useNavigate } from "react-router-dom";


export default function ProductItem(props)
{
    const {name,value,picture, _id} = props.product;
    const navigate = useNavigate();

    function open()
    {
        navigate(`/visualizar-produto/${_id}`,{state:{product: props.product}});
    }
    
    return(
        <ProductContainer show={props.show.toString()} onClick={open} title={name} >
            <img src={picture} alt={name} />
            <p className="value">R$ {value.toFixed(2).toString().replace('.',',')}</p>
            <p className="installments"><span>em </span>10x de R$ {(value.toFixed(2) / 10).toFixed(2).toString().replace('.',',')} sem juros</p>
            { value > 79.90 && <strong className="shipment">Frete grátis</strong>}
            <p className="name">{name.substring(0,100).trim()}{name.length > 99 ? '...' : ''}</p>
        </ProductContainer>
    );
}

const ProductContainer = styled.div`

    width: 210px;
    height: 400px;
    background-color: white;
    display: ${(props) => props.show == 'true' ? 'block' : 'none'};
    border-radius: 10px;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 200ms;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    @media (max-width:440px) {
        width: 100%;
        height: 500px;
        box-shadow: none;
        border-bottom: 1px solid  rgba(0, 0, 0, 0.1);
        border-top: 1px solid  rgba(0, 0, 0, 0.1);
        border-radius: 0;
    }
   
    img{
        width: 100%;
        height: 225px;
        aspect-ratio: 1;
        object-fit: cover;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        @media (max-width:440px) {
            width: 100%;
            height: auto;
            max-height: 350px;
            object-fit: scale-down;
        }
    }

    span{
        color: black;
    }

    &:hover{
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

        img{
            
        }
    }

    p,strong{
        font-family: 'Mulish', sans-serif;
        padding: 0 5px 0 5px;
    }

    .value{
        color: rgba(0,0,0,.8);
        font-size: 24px;
        font-weight: 400;
        margin-top: 20px;
        margin-bottom: 5px;
    }

    .installments{
        color: ${installmentsColor};
        margin-bottom: 5px;
        font-size: 13px;
    }

    .shipment{
        color: ${shipmentColor};
        font-size: 14px;
    }

    .name{
        margin-top: 10px;
        line-height: 16px;
        font-size: 14px;
    }
`;