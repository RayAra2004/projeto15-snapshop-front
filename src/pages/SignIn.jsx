import styled from "styled-components";
import { mainColor } from "../Colors/colors";
import Login from "../assets/login.svg"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../Contexts/userContext"

export default function SignIn(){
    const [form, setForm] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {setUser} =  useContext(UserContext);
    
    function handleForm(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }
    function submitForm(e){
        e.preventDefault()

        axios
            .post(`${import.meta.env.VITE_API_URL}/login`, form)
            .then(res => {
                setIsLoading(false)
                setUser(res.data)
                localStorage.setItem("token", res.data.token)
                navigate(`/`)
                })
            .catch(err => 
                alert(err.response.data),
                setIsLoading(false)
                )

        setIsLoading(true)
    }


    return(
        <Body>
            <SideBarr>
                <h1>Digite seu email e sua senha para fazer o login!!</h1>
                <img src={Login} alt="login-logo"/>
            </SideBarr>
            <Container>
                <Form onSubmit={submitForm}>
                    <Input 
                        required
                        type="text" 
                        placeholder="E-mail"
                        autoComplete="username"
                        name="email"
                        value={form.email}
                        disabled={isLoading}
                        onChange={handleForm}
                    />

                    <Input 
                        required
                        type="password" 
                        placeholder="Senha"
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
    background-color: ${mainColor};
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    width: 400px;
    height: 300px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 15px;

    & p{
        color: #C71585;
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 12px;
        text-decoration: underline;
        margin-top: 15px;
        transition: all 200ms;
        &:hover{
            color: #DDA0DD;
        }
    }
`

const Form = styled.form`
    width: 300px;
    box-sizing: border-box;
`
const Input = styled.input`
    width: 100%;
    height: 40px;
    margin-bottom: 7px;
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
    }
`