import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainColor } from "../Colors/colors"
import Shop from "../assets/shopping.svg"

export default function SignUp(){
    return(
        <Body>
            <SideBarr>
                <h1>Cadastre-se e venha aproveitar nosso App!</h1>
                <img src={Shop} alt="cadastrar" />
            </SideBarr>
            <Container>
                <Form>
                    <Input 
                        required 
                        type="text" 
                        placeholder="Nome" 
                        name="name"
                    />

                    <Input 
                        required 
                        type="email" 
                        placeholder="E-mail" 
                        autoComplete="username" 
                        name="email"
                    />

                    <Input 
                        required 
                        type="password" 
                        placeholder="Senha" 
                        autoComplete="new-password" 
                        name="password"
                    />

                    <Input 
                        required 
                        type="password"
                        placeholder="Confirme a senha" 
                        autoComplete="new-password" 
                        name="password"
                    />

                    <Input 
                        required 
                        type="text" 
                        placeholder="Foto de usuário" 
                        name="photo"
                    />

                    <Button>Cadastrar</Button>
                </Form>
                <Link to={"/login"}>
                    <p>Já possui uma conta? Faça login!</p>
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
    height: 500px;
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
        color: #FF1493;
        background-color: white;
        border: 1px solid #FF1493;
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
    
    & h1{
        font-family: 'Mulish', sans-serif;
        font-size: 50px;
        font-weight: 500;
        color: #FFFFFF;
        margin-bottom: 15px;
        user-select: none;
    }

    & img{
        width: 250px;
        margin-top: 10px;
        user-select: none;
    }
`