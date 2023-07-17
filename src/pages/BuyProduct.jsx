import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../Contexts/userContext";
import styled from "styled-components";
import { mainColor, pageBackgroundColor, secondaryColor } from "../Colors/colors";
import { useEffect } from "react";
import creditCardIcon from '../assets/credit_card.png';
import boletoIcon from '../assets/boleto.png';
import pixIcon from '../assets/pix.png';
import cardIlus from '../assets/card_ilustration.svg';
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function BuyProduct() {

    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [state, setState] = useState('Selecione seu Estado');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameHolder, setNameHolder] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const token = localStorage.getItem('token');
    const location = useLocation();

    const { name, value, picture, quantity } = location.state;

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
    }, [])

    const config = {
        headers: {
            "Authorization": `${token}`
        }
    }

    function searchCEP(value) {
        fetch(`https://brasilapi.com.br/api/cep/v2/${value}`)
            .then(res => res.json())
            .then(dados => {
                setCity(dados.city);
                setNeighborhood(dados.neighborhood);
                setState(dados.state);
                setStreet(dados.street);
            });
    }

    function finalizarCompra(e) {
        e.preventDefault();
        if(paymentMethod == '')
        {
            toast.error( 'Selecione um método de pagamento!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });

            return;
        }

        Swal.fire({
            title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:black">Comprar ${name} x${quantity}</span>`,
            showCancelButton: true,
            confirmButtonColor: `${mainColor}`,
            cancelButtonColor: '#c9c9c9',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            width: 300,
            heightAuto: false,
            imageUrl: picture,
            imageWidth: 200,
        }).then((result) => {
            if (result.isConfirmed) {
               buy();
            }
        });
    }

    function buy()
    {
        let body;
        
        if (paymentMethod === 'pix' || paymentMethod === 'boleto') {
            body = {idProducts:[id], price:value * quantity, amount: [quantity], cep, city, neighborhood, state, street, number, paymentMethod }
        } else {
            body = {idProducts:[id], price:value * quantity, amount: [quantity], cep, city, neighborhood, state, street, number, paymentMethod, cardNumber, expiration, cvv, nameHolder }
        }

        axios.post(`${import.meta.env.VITE_API_URL}/comprar`, body, config)
            .then(res => {
                toast.success( `${name} x${quantity} comprado com sucesso`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/');
            })
            .catch(res => console.log(res))
    }

    function fillIn(v) {
        if (v === 'pix' || v === 'boleto') {
            setCardNumber(0);
            setExpiration('null');
            setCvv(0);
            setNameHolder('null');
        }
    }

    return (
        <SCBuy>
            <SCForm method={paymentMethod} id="form" onSubmit={finalizarCompra}>
                <h1>Endereço</h1>
                <div className="adress">

                    <div>
                        <label htmlFor="street">Logradouro</label>
                        <input id="street" name="street" placeholder={"Logradouro"} value={street} onChange={e => setStreet(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="number">Número</label>
                        <input id="number" name="number" type="number" placeholder={"Número"} value={number} onChange={e => setNumber(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="city">Cidade</label>
                        <input id="city" name="city" placeholder={"Cidade"} value={city} onChange={e => setCity(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="neighborhood">Bairro</label>
                        <input id="neighborhood" name="neighborhood" placeholder={"Bairro"} value={neighborhood} onChange={e => setNeighborhood(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="cep">CEP</label>
                        <input id="cep" name="cep" type="number" placeholder={"CEP"} value={cep} onChange={e => { searchCEP(e.target.value); setCep(e.target.value) }} required />
                    </div>
                    <div>
                        <label htmlFor="uf">Estado</label>
                        <select id="uf" name="uf" value={state} onChange={e => setState(e.target.value)}>
                            <option value="Selecione seu Estado"></option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>

                </div>

                <div className="payment">
                    <h1>Forma de Pagamento</h1>

                    <div className="methods">
                        <img src={pixIcon} onClick={() => { setPaymentMethod('pix'), fillIn('pix') }} />
                        <img src={creditCardIcon} onClick={() => { setPaymentMethod('creditCard'), fillIn('creditCard') }} />
                        <img src={creditCardIcon} onClick={() => { setPaymentMethod('debitCard'), fillIn('debitCard') }} />
                        <img src={boletoIcon} onClick={() => { setPaymentMethod('boleto'), fillIn('boleto') }} />
                    </div>
                   <div className="container-card">
                   <SCMethod method={paymentMethod}>
                        <div>
                            <label htmlFor="nameHolder">Nome do Titular</label>
                            <input id="nameHolder" name="nameHolder" placeholder="Nome do Titular" value={nameHolder} onChange={e => setNameHolder(e.target.value)}  required={paymentMethod == 'creditCard' || paymentMethod == 'debitCard'} />
                        </div>
                        <div>
                            <label htmlFor="cardNumber">Número do Cartão</label>
                            <input id="cardNumber" name="cardNumber" type="number" placeholder="Número do Cartão" value={cardNumber} onChange={e => setCardNumber(e.target.value)}  required={paymentMethod == 'creditCard' || paymentMethod == 'debitCard'} />
                        </div>
                        <div>
                            <label htmlFor="expiration">Vencimento</label>
                            <input id="expiration" name="expiration" type="text" placeholder="MM/AA" value={expiration} onChange={e => setExpiration(e.target.value)} required={paymentMethod == 'creditCard' || paymentMethod == 'debitCard'} />
                        </div>
                        <div>
                            <label htmlFor="cvv">CVV</label>
                            <input id="cvv" name="cvv" type="number" placeholder="Ex: 241" value={cvv} onChange={e => setCvv(e.target.value)}  required={paymentMethod == 'creditCard' || paymentMethod == 'debitCard'} />
                        </div>                      
                    </SCMethod>
                    <img className="ilustration" src={cardIlus} alt="" />
                   </div>
                </div>

            </SCForm>

            <SCProduct>
                <img src={picture} />
                <h1>{name.substring(0,20).trim()}{name.length > 20 ? '...' : ''}</h1>
                <span className="amount">Quantidade: {quantity}</span>
                {paymentMethod !== '' && <span className="payment-form">Forma de pagamento: {paymentMethod == 'creditCard' ? 'Crédito' : paymentMethod == 'debitCard' ? 'Débito' : paymentMethod == 'pix' ? 'Pix' : paymentMethod == 'boleto' ? 'Boleto' : ''}</span>}
                <h2>R${String(Number(value * quantity).toFixed(2)).replace('.', ',')}</h2>
                <button form="form">Finalizar Compra</button>
            </SCProduct>
        </SCBuy>
    );
}

const SCBuy = styled.div`
    display: flex;
    background-color: ${pageBackgroundColor};
    height: 100%;
    justify-content: center;
    gap: 30px;
    @media (max-width:1060px) {
        
         align-items: center;
         flex-direction: column-reverse;
         margin-top: 150px;
         justify-content: flex-end;
    }
`

const SCForm = styled.form`
    margin-top: 150px;
    display: flex;
    background-color: white;
    padding: 40px;
    border-radius: 20px;
    height: fit-content;
    max-width: 650px;
    flex-direction: column;
    box-sizing: border-box;

    @media (max-width:1060px) {
         margin-top: 0;
         margin-left: 0;
    }
    @media (max-width:650px) {
         width: 100%;
         margin: 0;
         height: fit-content;
         
         border-radius: 0;
    }

    h1{

            font-family: 'Mulish', sans-serif;
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 15px;
            border-bottom: 2px solid rgba(0,0,0,0.2);
            padding-bottom: 5px;
        }

    .container-card{
        
        @media (max-width:650px) {
            height: auto;
        }
        
        display: ${props => {
        if (props.method === '' || props.method === 'pix' || props.method === 'boleto') {
            return 'none' + '!important'
        } else {
            return 'flex' + '!important'
        }
    }};
        width: 100%;
        flex-direction: row;
        height: 200px;
        margin-top: 20px;

        .ilustration{
            height: 100%;
            @media (max-width:650px) {
               display: none;
            }
        }
    }   

    
    label{
        font-family: 'Mulish', sans-serif;
    }

    .payment{
        width: 100%;
        display: flex;

        

        h1{
            padding-top: 10px;
            font-family: 'Mulish', sans-serif;
            font-weight: bold;
            font-size: 20px;
            margin-top: 15px;
            margin-bottom: 15px;
            border-bottom: 2px solid rgba(0,0,0,0.2);
        }

        .methods{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            
        
            img{
                cursor: pointer;
                width: 50px;

                &:first-child{
                   
                    width: 80px;
                }
                
                &:last-child{
                    height: 30px;
                    aspect-ratio: 1;
                }
            }
        }
    }

    .adress{
        display: flex;
        flex-direction: row;
        width: 570px;
        flex-wrap: wrap;
        gap: 20px;


        #number{
            width: 100px;
        }
        #cep{
            width: 100px;
        }

        @media (max-width:650px) {
         width: 100%;
         
    }
    }
    div{
        display: flex;
        flex-direction: column;
        
    }
    
    input{
        width: 200px;
        height: 30px;
        border: 1px solid rgba(0,0,0,0.2);;
        border-radius: 5px;
        margin-top: 7px;
        padding-left: 5px;
        &:focus{
            outline: 1px solid #FF69B4;
            border: 1px solid rgba(0,0,0,0);
        }
    }


    select{
        margin-top: 7px;
        cursor: pointer;
        width: 210px;
        height: 33px;
        margin-bottom: 10px;
        border-radius: 5px;
        &:focus{
            outline: 1px solid #FF69B4;
            border: 1px solid rgba(0,0,0,0);
        }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number]{
        -moz-appearance: textfield;
    }
`

const SCMethod = styled.div`
      
      display: ${props => {
        if (props.method === '' || props.method === 'pix' || props.method === 'boleto') {
            return 'none' + '!important'
        } else {
            return 'flex' + '!important'
        }
    }};
    flex-direction: row !important;
    width: 50%;
    flex-wrap: wrap;
    position: relative;
    gap: 10px;
    #cvv{
        width: 60px;
    }

    #expiration
    {
        width: 120px;
        cursor: pointer;
    }

    input{
        margin-top:7px;
        margin-bottom:0;
        z-index: 1;
    }

    input[type="date"]{
        height: 33px;
    }
`

const SCProduct = styled.div`
    font-family: 'Mulish', sans-serif;
    margin-top: 150px;
    
    box-sizing: border-box;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 340px;
    padding: 40px;
    border-radius: 20px;
    max-height: 440px;
    transition: all 200ms;

    @media (max-width:1060px) {
         margin-top: 0;
         width:650px;
    }

    @media (max-width:650px) {
         width: 100%;
        
         border-radius: 0;
    }

    

    .payment-form{
        font-size: 13px;
        user-select: none;
       
    }
    img{
        width: 100px;
        aspect-ratio: 1;
        border-radius: 160px;
        margin-bottom: 20px;
        object-fit:cover;
        
        background-image: #FFFFFF;
        background-color: #FFFFFF;
    }

    h1{
        font-size: 24px;
        font-weight: 800;
        text-align: center;
        margin-bottom: 30px;
    }
    span{
        margin-bottom: 35px;
        font-size: 20px;
        font-weight: 600;
    }

    .amount{
        margin-bottom: 20px;
        user-select: none;
    }

    h2{
        font-size: 30px;
        font-weight: 600;
        color: #79f93a;
    }

    button{
        flex-shrink: 0;
        width: 100%;
        user-select: none;
        height: 60px;
        margin-top: 30px;
        box-sizing: border-box;
        border: 0;
        border-radius: 5px;
        background-color: #FF69B4;
        font-family: 'Mulish', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: #FFFFFF;
        cursor: pointer;
        transition: all 200ms;
        &:hover{
            color: ${secondaryColor};
            background-color: white;
            border: 1px solid ${secondaryColor};
        }
    }
`