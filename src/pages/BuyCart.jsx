import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { mainColor, pageBackgroundColor, secondaryColor } from "../Colors/colors";
import creditCardIcon from '../assets/credit_card.png';
import boletoIcon from '../assets/boleto.png';
import pixIcon from '../assets/pix.png';
import cardIlus from '../assets/card_ilustration.svg';
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../Contexts/userContext";

export default function BuyCart(){
    const location = useLocation();
    const navigate = useNavigate();
    const {products} = location.state ? location.state : [];
    const {cartItems, setCartItems } = useContext(UserContext);

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
    const [total, setTotal] = useState(0);
    const token = localStorage.getItem('token');
    const [inBuyProcess,setInBuyProcess] = useState(false);
  

    useEffect(() => {
        if (!token || !location.state) {
            navigate('/');
            return;
        }

        if(products) calculateTotal()
    }, []);

    const config = {
        headers: {
            "Authorization": `${token}`
        }
    }

    function clearCartItems()
    {
        axios.delete(`${import.meta.env.VITE_API_URL}/limpar-carrinho`,config)
        .then((res)=>{
            setCartItems([]);
        }).catch((err)=>{
            console.log(err);
        })
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
        if(inBuyProcess) return;
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
            title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:black">Comprar todos os produtos?</span>`,
            showCancelButton: true,
            confirmButtonColor: `${mainColor}`,
            cancelButtonColor: '#c9c9c9',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            width: 300,
            heightAuto: false,
            imageUrl: '',
            imageWidth: 200,
        }).then((result) => {
            if (result.isConfirmed) {
               buy();
            }
        });
    }

    function buy()
    {
        if(inBuyProcess) return;

        setInBuyProcess(true);
        
        const ids = products.map(p => p._id);
        const quantities = products.map(q => q.quantity);
       
        let body;
        if (paymentMethod === 'pix' || paymentMethod === 'boleto') {
            body = {idProducts:ids,price:total, amount: quantities, cep, city, neighborhood, state, street, number, paymentMethod }
        } else {
            body = {idProducts:ids,price:total, amount: quantities, cep, city, neighborhood, state, street, number, paymentMethod, cardNumber, expiration, cvv, nameHolder }
        }

        axios.post(`${import.meta.env.VITE_API_URL}/comprar`, body, config)
            .then(res => {
                toast.success( `Comprado efetuada!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                clearCartItems();
                navigate('/');
                setInBuyProcess(false);
            })
            .catch(res => {
                console.log(res);
                setInBuyProcess(false);
            })
    }

    function fillIn(v) {
        if (v === 'pix' || v === 'boleto') {
            setCardNumber(0);
            setExpiration('null');
            setCvv(0);
            setNameHolder('null');
        }
    }

    function calculateTotal(){
        
        let t = 0
        products.forEach( prod => t += Number(Number(prod.value) * Number(prod.quantity)))
        setTotal(t)
    }

    return(
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
            <SCContainer>
                <SCProducts>
                        {
                            products &&
                            products.map(product => {
                            return(
                                <SCProduct key={uuidv4()}>
                                    <img src={product.picture} />
                                    <h1>{product.name.substring(0,14).trim()}{product.name.length > 14 ? '...' : ''}</h1>
                                    <div className="info">
                                        <span className="price">R$ {(Number(product.value) * Number(product.quantity)).toFixed(2).toString().replace('.',',')}</span>
                                        <span className="amount">Quantidade: {product.quantity}</span>
                                    </div>
                                </SCProduct>
                            )
                            })
                        }                         
                </SCProducts> 
                <SCCheckout>
                        <span className="payment-form">{paymentMethod !== '' ? 'Forma de pagamento: ' : ''} {paymentMethod == 'creditCard' ? 'Crédito' : paymentMethod == 'debitCard' ? 'Débito' : paymentMethod == 'pix' ? 'Pix' : paymentMethod == 'boleto' ? 'Boleto' : 'Selecione a forma de pagamento'}</span>
                        <h2>R${String(Number(total).toFixed(2)).replace('.', ',')}</h2>
                        <button form="form">{inBuyProcess ? 'Processando..' : 'Finalizar Compra'}</button>
                </SCCheckout> 
            </SCContainer>            
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

const SCContainer = styled.div`
    position: relative;
    max-height: 500px;
    margin-top: 150px;
    @media (max-width:1060px) {
        margin-bottom: 220px; 
        margin-top:0;
    }

    @media (max-width:650px) {
         width: 100%;
         border-radius: 0;
    }
`

const SCProducts = styled.div`
    font-family: 'Mulish', sans-serif;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 5px;
    height: 330px;
    width: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 20px;
    gap: 10px;

    ::-webkit-scrollbar {
        width: 12px;               /* width of the entire scrollbar */
    }

    ::-webkit-scrollbar-track {
        background: transparent;       /* color of the tracking area */
        
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${secondaryColor};    /* color of the scroll thumb */
        border-radius: 20px;       /* roundness of the scroll thumb */
        border: 2px solid white;  /* creates padding around scroll thumb */
    }
    

    @media (max-width:1060px) {
         margin-top: 0;
         width:650px;
    }

    @media (max-width:650px) {
         width: 100%;
         border-radius: 0;
    }
`

const SCProduct = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    border-top: 1px solid ${mainColor};
    padding-top: 10px;
   &:first-child{
    border-top: 0;
   }
    .info{
        display: flex;
        flex-direction: column;
        
        justify-content: center;

        .price{
            color: #79f93a;
            font-weight: bold;
        }
    }
   
    img{
        width: 50px;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1px solid ${mainColor};
        object-fit:cover;
        
        background-image: #FFFFFF;
        background-color: #FFFFFF;
    }

    h1{
        font-size: 20px;
        font-weight: 800;
        text-align: center;
        margin-top: 15px;

        @media (max-width:400px) {
            font-size: 15px;
        }
    }

    .amount{
        user-select: none;
        margin-top: 15px;
        font-size: 13px;
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

const SCCheckout = styled.div`
    position: absolute;
    left: 0;
    bottom: -41px;
    z-index: 1;
    background-color: white;
    width: 100%;
    border-top: 5px solid #E1E1E1;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    min-height: 220px;

    @media (max-width:1060px) {
        bottom: -220px; 
    }

    @media (max-width:650px) {
         width: 100%;
         border-radius: 0;
    }
    
    h2{
        font-size: 30px;
        font-weight: 600;
        color: #79f93a;
        font-family: 'Mulish', sans-serif;
    }

    span{
        margin-top: 10px;
        margin-bottom: 35px;
        font-size: 20px;
        font-weight: 600;
        font-family: 'Mulish', sans-serif;
    }

    button{
        flex-shrink: 0;
        width: 80%;
        user-select: none;
        height: 70px;
        margin-top: 30px;
        margin-bottom: 20px;
        box-sizing: border-box;
        border: 0;
        border-radius: 5px;
        background-color: #FF69B4;
        font-family: 'Mulish', sans-serif;
        font-size: 25px;
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