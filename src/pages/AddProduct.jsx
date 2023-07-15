import styled from "styled-components";
import { disabledButtonColor, mainColor, pageBackgroundColor, secondaryColor } from "../Colors/colors";
import { useContext, useEffect, useRef, useState } from "react";
import productIllustration from '../assets/product.svg';
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router";
import UserContext from "../Contexts/userContext";
import { toast } from "react-toastify";
import { useWindowSize } from "@uidotdev/usehooks";

export default function AddProduct() {

    const nameRef = useRef();
    const [pValueRef,setPValueRef] =useState('');
    const [stockRef,setStockRef] =useState('');
    const descriptionRef = useRef();

    const categoryRef = useRef();
    const pictureRef = useRef();
    const isNewRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [invalidImage, setInvalidImage] = useState(false);
    const {user} = useContext(UserContext);
    const size = useWindowSize();

    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
            navigate('/');
            return;
        }
    },[])

    async function validarUrlImagem(url) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = function() {
            resolve(true);
          };
          img.onerror = function() {
            reject(false);
          };
          img.src = url;
        });
      }

      async function createProduct(e) {
        e.preventDefault();
        setIsLoading(true);
        let valid = true;

        await validarUrlImagem(pictureRef.current.value)
        .catch(() => {
            valid = false;
        });

        setInvalidImage(!valid);

        if(!valid){

            toast.error( 'Url da imagem de produto inserida é invalida!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            
            setIsLoading(false);
            return;
        }

        const newProduct = {
            name: nameRef.current.value,
            value: Number(pValueRef),
            description: descriptionRef.current.value,
            stock: Number(stockRef),
            available: Number(stockRef) > 0,
            category: categoryRef.current.value,
            picture: pictureRef.current.value,
            is_new:isNewRef.current.checked
        }

        axios.post(`${import.meta.env.VITE_API_URL}/adicionar-produto`, newProduct,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
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
                navigate('/meus-produtos');
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
               {size.width > 1029 &&  <img className="product-ilus" src={productIllustration} alt="" />}
                <NewProductForm onSubmit={createProduct}>
                    <label htmlFor="pname">Nome</label>
                    <Input type="text" required id="pname" name="pname" maxLength={70} minLength={5} ref={nameRef} placeholder="e.g: Furadeira" />
                    <div className="values">
                        <div>
                            <label htmlFor="pvalue">Valor</label>
                            <Input 
                                type="text" 
                                required id="pvalue" 
                                maxLength={6}
                                max={6}
                                name="pvalue" 
                                value={pValueRef} 
                                onChange={(e)=> setPValueRef(e.target.value.replace(/[^\d.]/g, '').replace(/\.(?=.*\.)/g, ''))} 
                                placeholder="e.g: R$: 50,00" 
                                pattern="[0-9.]*" 
                            />
                        </div>
                        <div>
                            <label htmlFor="pstock">Estoque</label>
                            <Input type="text" onChange={(e)=> setStockRef(e.target.value.replace(/\./g, '').replace(/[^\d]/g, '').substring(0,10))}  required id="pstock" name="pstock" value={stockRef} placeholder="e.g: 500 unidades" max={99999} pattern="[0-9]*" />
                        </div>
                        <div className="check">
                            <label htmlFor="is-new">Usado</label>
                            <input ref={isNewRef} id="is-new" name="is-new" type="checkbox" />
                        </div>
                    </div>
                    <label htmlFor="pdesc">Descrição</label>
                    <textarea autoComplete="description" type="text" required id="pdesc" name="pdesc" ref={descriptionRef} maxLength={2000} minLength={0} placeholder="e.g: O produto contém: 1 furadeira bosch.." />

                    <div className="bottom">
                        <div>
                            <label htmlFor="pcategory">Categoria</label>
                            <select name="pcategory" id="pcategory" ref={categoryRef}>
                                <option value="Geral">Geral</option>
                                <option value="Eletrônicos">Eletrônicos</option>
                                <option value="Vestuário e moda">Vestuário e moda</option>
                                <option value="Casa e decoração">Casa e decoração</option>
                                <option value="Cozinha">Cozinha</option>
                                <option value="Beleza">Beleza</option>
                                <option value="Saúde e bem-estar">Saúde e bem-estar</option>
                                <option value="Alimentos e bebidas">Alimentos e bebidas</option>
                                <option value="Esportes">Esportes</option>
                                <option value="Livros e mídia">Livros e mídia</option>
                                <option value="Brinquedos e jogos">Brinquedos e jogos</option>
                                <option value="Automotivo">Automotivo</option>
                                <option value="Ferramentas">Ferramentas</option>
                                <option value="Animais de estimação">Animais de estimação</option>
                                <option value="Jóias e acessórios">Jóias e acessórios</option>
                                <option value="Instrumentos musicais">Instrumentos musicais</option>
                                <option value="Artigos de papelaria">Artigos de papelaria</option>
                                <option value="Produtos para bebês">Produtos para bebês</option>
                                <option value="Móveis e decoração">Móveis e decoração</option>
                                <option value="Produtos de limpeza">Produtos de limpeza</option>
                                <option value="Viagem">Viagem</option>
                                <option value="Smart Home">Smart Home</option>
                                <option value="Informática">Informática</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ppicture">Foto do produto</label>
                            <Input onChange={()=> setInvalidImage(false)} className={invalidImage ? 'invalid' : ''} type="text" required id="ppicture" name="ppicture" ref={pictureRef} placeholder="e.g: https://photo.jpg" max={8} />
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
    background-color: ${pageBackgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;

    *{
        transition: all 200ms;
    }

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
        @media (max-width:500px) {
         font-size: 40px;
        }
        
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

    @media (max-width:500px) {
         box-sizing: content-box;
         border-radius: 0;
    }

    .bottom{
        display: flex;
        gap: 20px;

        .invalid{
            border: 2px solid red;
            color:  red;
            &::placeholder{
                color:  red;
            }
        }
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
            background-color: ${disabledButtonColor};
        }
       &:enabled{
        &:hover{
            color: ${secondaryColor};
            background-color: white;
            border: 1px solid ${secondaryColor};
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

