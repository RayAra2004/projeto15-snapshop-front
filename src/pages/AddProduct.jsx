import styled from "styled-components";
import { mainColor } from "../Colors/colors";
import { useContext, useEffect, useRef, useState } from "react";
import productIllustration from '../assets/product.svg';
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router";
import UserContext from "../Contexts/userContext";
import { toast } from "react-toastify";

export default function AddProduct() {

    const nameRef = useRef();
    const pValueRef = useRef();
    const descriptionRef = useRef();
    const stockRef = useRef();
    const categoryRef = useRef();
    const pictureRef = useRef();
    const isNewRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    function createProduct(e) {
        e.preventDefault();
        setIsLoading(true);

        const newProduct = {
            name: nameRef.current.value,
            value: Number(pValueRef.current.value),
            description: descriptionRef.current.value,
            stock: Number(stockRef.current.value),
            available: Number(stockRef.current.value) > 0,
            category: categoryRef.current.value,
            picture: pictureRef.current.value,
            is_new:isNewRef.current.checked
        }

        axios.post(`${import.meta.env.VITE_API_URL}/adicionar-produto`, newProduct,{headers:{Authorization:`Bearer ${user ? user.token : 'dsadlkasjdlaksjd'}`}})
            .then(() => {
                setIsLoading(false);
                toast.success( 'Produto cadastrado!', {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/');
            })
            .catch(err => {
                console.log(err); 
                alert('Erro ao cadastrar produto, olhe o console para mais informações!')
                setIsLoading(false);
            })
    }

    return (
        <PageContainer>
            <h1>Cadastrar produto</h1>
            <div className="main">
                <img className="product-ilus" src={productIllustration} alt="" />
                <NewProductForm onSubmit={createProduct}>
                    <label htmlFor="pname">Nome</label>
                    <Input type="text" required id="pname" name="pname" ref={nameRef} placeholder="e.g: Furadeira" />
                    <div className="values">
                        <div>
                            <label htmlFor="pvalue">Valor</label>
                            <Input type="number" required id="pvalue" name="pvalue" ref={pValueRef} placeholder="e.g: R$: 50,00" pattern="[0-9.]*" />
                        </div>
                        <div>
                            <label htmlFor="pstock">Estoque</label>
                            <Input type="number" required id="pstock" name="pstock" ref={stockRef} placeholder="e.g: 500 unidades" max={99999} pattern="[0-9]*" />
                        </div>
                        <div className="check">
                            <label htmlFor="is-new">Usado</label>
                            <input ref={isNewRef} id="is-new" name="is-new" type="checkbox" />
                        </div>
                    </div>
                    <label htmlFor="pdesc">Descrição</label>
                    <textarea type="text" required id="pdesc" name="pdesc" ref={descriptionRef} placeholder="e.g: O produto contém: 1 furadeira bosch.." />

                    <div className="bottom">
                        <div>
                            <label htmlFor="pcategory">Categoria</label>
                            <select name="pcategory" id="pcategory" ref={categoryRef}>
                                <option value="geral">Geral</option>
                                <option value="eletronicos">Eletrônicos</option>
                                <option value="vestuario">Vestuário e moda</option>
                                <option value="casa">Casa e decoração</option>
                                <option value="beleza">Beleza</option>
                                <option value="saude">Saúde e bem-estar</option>
                                <option value="alimentos">Alimentos e bebidas</option>
                                <option value="esportes">Esportes</option>
                                <option value="livros">Livros e mídia</option>
                                <option value="brinquedos">Brinquedos e jogos</option>
                                <option value="automotivo">Automotivo</option>
                                <option value="ferramentas">Ferramentas</option>
                                <option value="animais">Animais de estimação</option>
                                <option value="joias">Jóias e acessórios</option>
                                <option value="musicais">Instrumentos musicais</option>
                                <option value="papelaria">Artigos de papelaria</option>
                                <option value="bebes">Produtos para bebês</option>
                                <option value="moveis">Móveis e decoração</option>
                                <option value="limpeza">Produtos de limpeza</option>
                                <option value="viagem">Viagem</option>
                                <option value="casa-inteligente">Smart Home</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ppicture">Foto do produto</label>
                            <Input type="text" required id="ppicture" name="ppicture" ref={pictureRef} placeholder="e.g: https://photo.jpg" max={8} />
                        </div>
                    </div>
                    <button disabled={isLoading} className="create-product">{isLoading ? <ThreeDots type="ThreeDots" color="#FFFFFF" height={20} width={40} /> : "Criar Produto"}</button>
                </NewProductForm>
            </div>
        </PageContainer>
    );
}

const PageContainer = styled.div`

    height: 100%;
    width: 100%;
    background-color: ${mainColor};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;

    .check{
        input[type="checkbox"]{
            accent-color: ${mainColor};
            margin-top: 12px;
            width: 35px;
            aspect-ratio: 1;
            cursor: pointer;
            outline:0;
            margin-left: 5px;
        }
    }

    h1{
        color: white;
        font-family: 'Mulish', sans-serif;
        font-size: 50px;
        margin-bottom: 40px;
        user-select: none;
    }

    .product-ilus{
        width: 100%;
        min-width: 200px;
        max-width: 500px;
        user-select: none;
    }

    .main{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
    }
`;

const NewProductForm = styled.form`
    width: 100%;
    max-width: 450px;
    background-color: white ;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 15px;
    display: flex;
    flex-direction: column;

    .bottom{
        display: flex;
        gap: 20px;
    }

    .values{
        display: flex;
        gap: 20px;
    }
    
    label{
        font-family: 'Mulish', sans-serif;
    }

    textarea{
        width: 100%;
        height: 90px;
        margin-bottom: 7px;
        box-sizing: border-box;
        border: 1px solid #DDA0DD;
        border-radius: 5px;
        padding-left: 10px;
        font-family: 'Mulish', sans-serif;
        margin-top:10px;
        resize: none;
        box-sizing: border-box;
        &:focus{
            outline: 1px solid #FF69B4;
        }
    }

    select{
        margin-top: 11px;
        margin-bottom: 7px;
        height: 40px;
        padding-left: 10px;
        width: 100%;
        min-width: 200px;
        cursor: pointer;
        border-radius: 5px;
        box-sizing: border-box;
        &:focus{
            outline: 1px solid #FF69B4;
        }

        option{
            height: 30px;
        }
    }

    .create-product{
        width: 100%;
        height: 35px;
        border: 0;
        border-radius: 5px;
        background-color: #FF69B4;
        font-family: 'Mulish', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: #FFFFFF;
        margin-top: 5px;
        cursor: pointer;
        transition: all 200ms;
        &:disabled{
            cursor: not-allowed;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #8b305e;
        }
       &:enabled{
        &:hover{
            color: #FF1493;
            background-color: white;
            border: 1px solid #FF1493;
        }
       }
    }
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    margin-bottom: 7px;
    box-sizing: border-box;
    border: 1px solid #DDA0DD;
    border-radius: 5px;
    padding-left: 10px;
    font-family: 'Mulish', sans-serif;
    margin-top:10px;
    &:focus{
        outline: 1px solid #FF69B4;
    }
`

