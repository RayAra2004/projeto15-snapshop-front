import { useState } from "react";
import styled from "styled-components";
import ProductItem from "../Components/ProductItem";
import { v4 as uuidv4 } from 'uuid';
import Footer from "../Components/Footer";
export default function Home(){

    const [allProducts,setAllProducts] = useState([
    {id:uuidv4(),name:'Bola', picture:'https://cirilocabos.vtexassets.com/arquivos/ids/171405/8810-01-bola-de-futebol-de-campo-em-couro-tamanho-e-peso-oficial-verde-cirilocabos.jpg?v=636379649178230000' ,value:50},
    {id:uuidv4(),name:'Tênis', picture:'https://www.kompletacalcados.com.br/6148-large_default/tenis-feminino-ramarim-casual-jogging--branco-2180204.jpg' ,value:400},
    {id:uuidv4(),name:'Capacete', picture:'https://cdn.awsli.com.br/600x700/1173/1173972/produto/173740174/809a782ffe.jpg' ,value:250},
    {id:uuidv4(),name:'Furadeira Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi officia quae aut laudantium in totam, et neque inventore nihil odio quod dicta doloremque saepe ipsam, atque iure assumenda quas cum?', picture:'https://lojamondial.vtexassets.com/arquivos/ids/158336-800-800?v=637826014763230000&width=800&height=800&aspect=true' ,value:150},
    {id:uuidv4(),name:'Carrinho de bebê', picture:'https://http2.mlstatic.com/D_Q_NP_910299-MLB54340245742_032023-P.webp' ,value:99.90},
    {id:uuidv4(),name:'Bola', picture:'https://cirilocabos.vtexassets.com/arquivos/ids/171405/8810-01-bola-de-futebol-de-campo-em-couro-tamanho-e-peso-oficial-verde-cirilocabos.jpg?v=636379649178230000' ,value:50},
    {id:uuidv4(),name:'Tênis', picture:'https://www.kompletacalcados.com.br/6148-large_default/tenis-feminino-ramarim-casual-jogging--branco-2180204.jpg' ,value:400},
    {id:uuidv4(),name:'Capacete', picture:'https://cdn.awsli.com.br/600x700/1173/1173972/produto/173740174/809a782ffe.jpg' ,value:250},
    {id:uuidv4(),name:'Furadeira Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi officia quae aut laudantium in totam, et neque inventore nihil odio quod dicta doloremque saepe ipsam, atque iure assumenda quas cum?', picture:'https://lojamondial.vtexassets.com/arquivos/ids/158336-800-800?v=637826014763230000&width=800&height=800&aspect=true' ,value:150},
    {id:uuidv4(),name:'Carrinho de bebê', picture:'https://http2.mlstatic.com/D_Q_NP_910299-MLB54340245742_032023-P.webp' ,value:99.90},
    {id:uuidv4(),name:'Bola', picture:'https://cirilocabos.vtexassets.com/arquivos/ids/171405/8810-01-bola-de-futebol-de-campo-em-couro-tamanho-e-peso-oficial-verde-cirilocabos.jpg?v=636379649178230000' ,value:50},
    {id:uuidv4(),name:'Tênis', picture:'https://www.kompletacalcados.com.br/6148-large_default/tenis-feminino-ramarim-casual-jogging--branco-2180204.jpg' ,value:400},
    {id:uuidv4(),name:'Capacete', picture:'https://cdn.awsli.com.br/600x700/1173/1173972/produto/173740174/809a782ffe.jpg' ,value:250},
    {id:uuidv4(),name:'Furadeira Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi officia quae aut laudantium in totam, et neque inventore nihil odio quod dicta doloremque saepe ipsam, atque iure assumenda quas cum?', picture:'https://lojamondial.vtexassets.com/arquivos/ids/158336-800-800?v=637826014763230000&width=800&height=800&aspect=true' ,value:150},
    {id:uuidv4(),name:'Carrinho de bebê', picture:'https://http2.mlstatic.com/D_Q_NP_910299-MLB54340245742_032023-P.webp' ,value:99.90},

]);

    return(
        <PageContainer>
            <img className="banner" decoding="async" src="https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1689183971088-home-sliderdesktop34.jpg" alt="RELÊMPAGO "></img>
            {
                <ProductsContainer>
                    {
                        allProducts && allProducts.length > 0 && allProducts.map((product) =>{
                            return <ProductItem key={uuidv4()} product={product}/>
                        })
                    }
                </ProductsContainer>
            }
            <Footer/>
        </PageContainer>
        
    );
}

const PageContainer = styled.div`

    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .banner{
        margin-top: 120px;
        max-width: 100%;
        width: 100%;
    }
`;

const ProductsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    height: auto;
    max-height: 1260px;
    flex-direction: row;
    margin-bottom: 120px;
    @media (max-width:440px) {
        margin-bottom: 180px;
    }
`;