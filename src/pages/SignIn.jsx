import styled from "styled-components";
import { mainColor, pageBackgroundColor, secondaryColor } from "../Colors/colors";
import Login from "../assets/login.svg"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../Contexts/userContext";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

export default function SignIn(){
    const [form, setForm] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {setUser} =  useContext(UserContext);
    
    function handleForm(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }
    function submitForm(e){
        e.preventDefault();
        login(form.email,form.password,null);
    }

    function login(email,password,googleObj)
    {
        if(isLoading) return;
        setIsLoading(true);
        axios
        .post(`${import.meta.env.VITE_API_URL}/login`, {email,password})
        .then(res => {
            setIsLoading(false);
            setUser(res.data)
            localStorage.setItem("token", res.data.token)
            navigate(`/`)
            })
        .catch(err => {
            if(!googleObj)
            {
                toast.error(err.response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            }
            else
            {
                if(err.response.status == 404)
                {
                    axios
                    .post(`${import.meta.env.VITE_API_URL}/cadastro`, {name:googleObj.name,email:googleObj.email,password:googleObj.sub,photo:googleObj.picture})
                    .then(res => {
                        login(googleObj.email,googleObj.sub,null);
                    })
                    .catch(err => {
                        toast.error(err.response.data, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "colored",
                        });
                        setIsLoading(false);
                    })
                }
            }
        })
    }

    return(
        <Body>
            <SideBarr>
                <h1>Login</h1>
                <img src={Login} alt="login-logo"/>
            </SideBarr>
            <Container>
                <Form onSubmit={submitForm}>
                    <label htmlFor="email">E-mail</label>
                    <Input 
                        required
                        id="email"
                        type="text" 
                        placeholder="e.g: myemail@email.com"
                        autoComplete="username"
                        name="email"
                        value={form.email}
                        disabled={isLoading}
                        onChange={handleForm}
                    />
                    <label htmlFor="password">Senha</label>
                    <Input 
                        required
                        id="password"
                        type="password" 
                        placeholder="**********"
                        autoComplete="new-password"
                        name="password"
                        value={form.password}
                        disabled={isLoading}
                        onChange={handleForm}
                    />
                    
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <ThreeDots type="ThreeDots" color="#FFFFFF" height={20} width={40} /> : "Entrar"}
                    </Button>
                </Form>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const googleObj = jwt_decode(credentialResponse.credential);
                        setForm({email:googleObj.email,password:googleObj.sub});
                        login(googleObj.email,googleObj.sub,googleObj);
                    }}
                    onError={() => {
                        toast.error( 'Falha ao logar com o google!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "colored",
                        });
                    }}
                    size="large"
                    useOneTap
                    auto_select
                    
                   
                    ux_mode="popup"
                />
                <Link to={"/cadastro"}>
                    <p>Não possui uma conta? Cadastre-se já!</p>
                </Link>
            </Container>
        </Body>
    );
}


const Body = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${pageBackgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width:924px) {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 120px;
        gap: 30px;
    }
`

const Container = styled.div`
    width: 400px;
   
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 15px;
    margin-bottom: 20px;
    
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
        margin-top: 10px;
        &:hover{
            color: #DDA0DD;
        }
    }
`

const Form = styled.form`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
   
    label{
        font-family: 'Mulish', sans-serif;
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
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        color: ${secondaryColor};
        background-color: white;
        border: 1px solid ${secondaryColor};
    }
`
const SideBarr = styled.div`
    width: 400px;
    height: 200px;
    margin-right: 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width:400px) {
        width: 100%;
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
    }

    & img{
        width: 300px;
        margin-top: 10px; 
        user-select: none;

        @media (max-width:400px) {
            width: 100%;
            max-width: 250px;
        }
    }
`