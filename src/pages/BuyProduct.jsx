import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../Contexts/userContext";
import dayjs from "dayjs";
import Header from "../Components/Header";
import styled from "styled-components";
import { backgroundProduct, mainColor } from "../Colors/colors";

export default function BuyProduct(){
    
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

    const { id } = useParams();
    const {user, setUser} =  useContext(UserContext);
    //const { token } = user;
    const token = "f1496ae3-5ff7-4f3e-856a-68aa36e84c4a"
    const [product, setProduct] = useState(undefined);
    //idProduto: 64af47c9a0ae3db062b83125

    //const location = useLocation();

    //const {name,value,picture,quantity} = location.state;

    const productMock = {
        name: "Tênis Puma Masculino BMW M Motorsport Smash Vulcanised Marinho/Preto",
        value: "400",
        quantity: 3,
        picture: "https://cdn.dooca.store/946/products/sfbmpnd6v0retwnpbxy77ca4sxzlip7nusit_450x600+fill_ffffff.jpg?v=1634820795&webp=0"
    }

    
    const config = {
        headers: {
            "Authorization": `${token}`
        }
    }

    function searchCEP(value){
        fetch(`https://brasilapi.com.br/api/cep/v2/${value}`)
        .then(res => res.json())
        .then(dados => {
            setCity(dados.city);
            setNeighborhood(dados.neighborhood);
            setState(dados.state);
            setStreet(dados.street);
        });
    }

    function finalizarCompra(e){
        e.preventDefault();
        
        let body;
        if(paymentMethod === 'pix' || paymentMethod === 'boleto'){
            body = {amount: productMock.quantity, cep, city, neighborhood, state, street, number, paymentMethod } 
        }else{
            body = {amount: productMock.quantity, cep, city, neighborhood, state, street, number, paymentMethod, cardNumber, expiration, cvv, nameHolder } 
        }
        axios.post(`${import.meta.env.VITE_API_URL}/comprar/${id}`, body, config)
            .then(res => {

                console.log('foii')
            })
            .catch(res => console.log(res))
    }

    function fillIn(v){
        if(v === 'pix' || v === 'boleto'){
            setCardNumber('null')
            setExpiration('null')
            setCvv('null')
            setNameHolder('null')
        }
    }
    
    return(
        <SCBuy>
            <SCForm id="form" onSubmit={finalizarCompra}>
                <div>
                    <label htmlFor="cep">CEP</label>
                    <input id="cep" name="cep" type="number" placeholder={"CEP"} value={cep}  onChange={e =>{searchCEP(e.target.value); setCep(e.target.value)} } required/>
                    <label htmlFor="street">Logradouro</label>
                    <input id="street" name="street" placeholder={"Logradouro"} value={street} onChange={e => setStreet(e.target.value)} required/>
                    <label htmlFor="city">Cidade</label>
                    <input id="city" name="city" placeholder={"Cidade"} value={city} onChange={e => setCity(e.target.value)} required/>
                    <label htmlFor="neighborhood">Bairro</label>
                    <input id="neighborhood" name="neighborhood" placeholder={"Bairro"} value={neighborhood} onChange={e => setNeighborhood(e.target.value)} required/>
                    <label htmlFor="uf">ESTADO</label>
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
                    <label htmlFor="number">Número</label>             
                    <input id="number" name="number" type="number" placeholder={"Número"} value={number} onChange={e => setNumber(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="paymentMethod">Forma de Pagamento</label>
                    <select id="paymentMethod" name="paymentMethod" value={paymentMethod} onChange={e => {setPaymentMethod(e.target.value), fillIn(e.target.value)}}>
                        <option value="boleto">Boleto</option>
                        <option value="pix">Pix</option>
                        <option value="creditCard">Cartão de Crédito</option>
                        <option value="debitCard">Cartão de Débito</option>
                    </select>
                    <SCMethod method = {paymentMethod}>
                        <label htmlFor="cardNumber">Número do Cartão</label>
                        <input id="cardNumber" name="cardNumber" type="number" placeholder="Número do Cartão" value={cardNumber} onChange={e => setCardNumber(e.target.value)}/>
                        <label htmlFor="expiration">Data de Vencimento</label>
                        <input id="expiration" name="expiration" placeholder="MM/AA" value={expiration} onChange={e => setExpiration(e.target.value)} />
                        <label htmlFor="cvv">CVV</label>
                        <input id="cvv" name="cvv" type="number" placeholder="Ex: 241" value={cvv} onChange={e => setCvv(e.target.value)}/>
                        <label htmlFor="nameHolder">Nome do Titular</label>
                        <input id="nameHolder" name="nameHolder" placeholder="Nome do Titular" value={nameHolder} onChange={e => setNameHolder(e.target.value)}/>
                    </SCMethod>
                </div>
            </SCForm>
            <SCProduct>
                <img src={productMock.picture}/>
                <h1>{productMock.name}</h1>
                <span>Quantidade: {productMock.quantity}</span>
                <h2>R${String(Number(productMock.value).toFixed(2)).replace('.', ',')}</h2> 
                <button form="form">Finalizar Compra</button>
            </SCProduct>
        </SCBuy>
    );
}

const SCBuy = styled.div`
    display: flex;

`

const SCForm = styled.form`
    margin-top: 150px;
    margin-left: 30px;
    margin-right: 40px;
    display: flex;
    div{
        display: flex;
        flex-direction: column;
        margin-right: 30px;
    }
    

    input{
        width: 300px;
        height: 50px;
        margin-bottom: 10px;
    }

    select{
        width: 308px;
        height: 56px;
        margin-bottom: 10px;
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

const SCMethod= styled.div`
    display: ${props => {
        if(props.method === '' || props.method === 'pix' || props.method === 'boleto'){
            return 'none' + '!important'
        }else{
            return 'flex' + '!important'
        }
    }};
    flex-direction: column;
`

const SCProduct = styled.div`
    font-family: 'Mulish', sans-serif;
    margin-top: 150px;
    margin-left: 30px;
    background-color: #E5E5E5;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
    padding: 40px;
    img{
        width: 100px;
        height: 100px;
        border-radius: 160px;
        margin-bottom: 20px;
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

    h2{
        font-size: 30px;
        font-weight: 600;
        color: #79f93a;
    }

    button{
        margin-top: 30px;
        border: none;
        border-radius: 5px;
        width: 300px;
        height: 100px;
        background-color: ${mainColor};
        font-size: 30px;
        color: #FFFFFF;
    }
`