import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mainColor, pageBackgroundColor, secondaryColor } from "../Colors/colors"
import Shop from "../assets/shopping.svg"
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner"
import axios from "axios";
import { toast } from "react-toastify";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRef } from "react";
import { useEffect } from "react";


export default function SignUp(){
    const [form, setForm] = useState({name: "", email: "", password: "", confirmPassword: "", photo: ""});
    const [invalidImage, setInvalidImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [invalidPassword,setInvalidPassword] = useState(false);
    const size = useWindowSize();
    const navigate = useNavigate();
    const refPhoto = useRef();
    const refPassword = useRef();

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

      useEffect(()=>{
        if(invalidPassword)
        {
            refPassword.current.focus();
            refPassword.current.select();
            return;
        }
        
        if(invalidImage)
        {
            refPhoto.current.focus();
            refPhoto.current.select();
        }
       
      },[invalidImage,invalidPassword])

    function handleForm(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }
    async function submitForm(e){
        e.preventDefault();
        if(isLoading) return;
        setIsLoading(true);

        if(form.password !== form.confirmPassword){
            setInvalidPassword(true);
            toast.error( "Senhas inseridas são incompatíveis.", {
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

        let valid = true;

        await validarUrlImagem(form.photo)
        .catch(() => {
            valid = false;
        });

        setInvalidImage(!valid);

        if(!valid){

            toast.error( 'Url da imagem de usuário inserida é invalida!', {
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

        axios
            .post(`${import.meta.env.VITE_API_URL}/cadastro`, {name:form.name, email:form.email, password: form.password, photo:form.photo})
            .then(res => {
                setIsLoading(false)
                navigate(`/login`)
                })
            .catch(err => 
                toast.error( err.response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                }),
                setIsLoading(false),
                form.confirmPassword == form.password
            )
    }

    return(
        <Body height={size.height}>
            <SideBarr height={size.height}>
                <h1>Cadastre-se</h1>
                {size.height > 700 && <img src={Shop} alt="cadastrar" />}
            </SideBarr>
            <Container>
                <Form onSubmit={submitForm}>
                    <label htmlFor="name">Nome</label>
                    <Input 
                        required
                        id="name"
                        placeholder="e.g: Maria Madalena" 
                        name="name"
                        value={form.name}
                        onChange={handleForm}
                        disabled={isLoading}
                    />
                     <label htmlFor="email">E-mail</label>
                    <Input 
                        required 
                        id="email"
                        type="email" 
                        placeholder="e.g: myemail@email.com" 
                        autoComplete="username" 
                        name="email"
                        value={form.email}
                        onChange={handleForm}
                        disabled={isLoading}
                    />
                     <label htmlFor="password">Senha</label>
                    <Input 
                        required
                        id="password"
                        type="password" 
                        minLength={3}
                        placeholder="********" 
                        autoComplete="new-password" 
                        name="password"
                        value={form.password}
                        onChange={handleForm}
                        disabled={isLoading}
                    />
                     <label htmlFor="confirmPassword">Confirmação de senha</label>
                    <Input 
                        required 
                        type="password"
                        id="confirmPassword"
                        className={invalidPassword ? 'invalid' : ''}
                        minLength={3}
                        placeholder="********" 
                        autoComplete="new-password" 
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={(e)=> {handleForm(e); setInvalidPassword(false);}}
                        disabled={isLoading}
                        ref={refPassword}
                    />
                    <label htmlFor="photo">Foto de usuário</label>
                    <Input 
                        required
                        id="photo"
                        type="text" 
                        placeholder="e.g: https://www.cats.com/cat.jpg" 
                        name="photo"
                        value={form.photo}
                        onChange={(e)=> {handleForm(e); setInvalidImage(false);}}
                        disabled={isLoading}
                        className={invalidImage ? 'invalid' : ''}
                        ref={refPhoto}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <ThreeDots type="ThreeDots" color="#FFFFFF" height={20} width={40} /> : "Cadastro"}
                    </Button>
                </Form>
                <Link to={"/login"}>
                    <p>Já possui uma conta? Faça login!</p>
                </Link>
            </Container>
        </Body>
    );
}

//styles for the SignUp page

const Body = styled.div`
    width: 100%;
    height: auto;
    min-height: 100%;
    background-color: ${pageBackgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 200px;
    box-sizing: border-box;
    
    @media (max-width:924px) {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: ${(props)=> props.height > 700 ? '160px' : '30px'};
        gap: 50px;
    }

    @media (max-height:700px) {
       min-height: 700px;
    }
`
const Container = styled.div`
    width: 100%;
    max-width: 400px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 15px;
    margin-bottom: 20px;
    padding-top: 20px;
    margin-top: 20px;

    @media (max-width:400px) {
        width: calc(100% - 20px)
    }

    & p{
        color: #C71585;
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 12px;
        text-decoration: underline;
        transition: all 200ms;
        margin-bottom: 20px;
        &:hover{
            color: #DDA0DD;
        }
    }
`
const Form = styled.form`
    width: 100%;
    padding:20px;
   
    box-sizing: border-box;
    
    label{
        font-family: 'Mulish', sans-serif;
       
    }
    .invalid{
            border: 2px solid red;
            color:  red;
            &::placeholder{
                color:  red;
            }
        }
`
const Input = styled.input`
    width: 100%;
    height: 40px;
    margin-bottom: 7px;
    margin-top: 7px;
    box-sizing: border-box;
    border: 1px solid #DDA0DD;
    border-radius: 5px;
    padding-left: 10px;
    font-family: 'Mulish', sans-serif;
    &:focus{
        outline: 1px solid #FF69B4;
    }
`
const Button = styled.button`
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
    &:hover{
        color: ${secondaryColor};
        background-color: white;
        border: 1px solid ${secondaryColor};
    }
`

const SideBarr = styled.div`
    width: 400px;
    margin-right: 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    
    @media (max-width:400px) {
        width: 100%;
    }

    @media (max-height:700px) {
        width: 0;
    }

    @media (max-width:924px) {
        margin-right: 0;
    }
    
    & h1{
        font-family: 'Mulish', sans-serif;
        font-size: 50px;
        font-weight: 500;
        color: #FFFFFF;
        margin-bottom: 15px;
        user-select: none;
       

        position: ${(props)=> props.height < 700? 'fixed' : 'static'};
        top: 15px;
        right:50%;
        transform:${(props)=> props.height < 700 ? 'translateX(50%)' : 'normal'};
        white-space: nowrap;
        z-index: ${(props)=> props.height < 700? '1' : '0'};

        @media (max-width:300px) {
            font-size: 30px;
            top: 25px;
            right:50%;
        }
    }

    & img{
        width: 100%;
        max-width: 250px;
        margin-top: 10px;
        user-select: none;

        @media (max-width:400px) {
            width: 100%;
            max-width: 250px;
        }
    }
`