import styled from "styled-components";
import Date from "../assets/datas.svg"
import { secondaryColor } from "../Colors/colors";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner"
import axios from "axios";

export default function EditUser({ setIsClicked, setUpdatedUser, updatedUser, foto, nameUser, cities, genders, states }) {
    const [form, setForm] = useState({ name: nameUser, state: states, city: cities, photo: foto, gender: genders })
    const [isLoading, setIsLoading] = useState(false);

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function onSubmit(e) {
        e.preventDefault();
        if(isLoading) return;
        setIsLoading(true);

        axios
            .post(`${import.meta.env.VITE_API_URL}/editar-usuario`, form, { headers: { Authorization: localStorage.getItem('token') } })
            .then(res => {
                setIsLoading(false)
                setIsClicked(false)
                setUpdatedUser(!updatedUser)
            })
            .catch(err =>
                alert(err.response.message),
                setIsLoading(false)
            )
    }


    return (
        <Container>
            <Banner>
                <h1>Edite seu perfil para ficar a sua cara!</h1>
                <LogoDateFile src={Date} alt="editar-Perfil" />
            </Banner>
            <Form onSubmit={onSubmit}>
                <Profile>
                    <div>
                        <label htmlFor="photo">Foto</label>
                        <Inputs
                            id="photo"
                            name="photo"
                            placeholder="Foto"
                            value={form.photo}
                            onChange={handleForm}
                            disabled={isLoading}
                        />
                        <div>
                        </div>
                        <label htmlFor="name">Nome</label>
                        <Inputs
                            id="name"
                            name="name"
                            placeholder="Nome"
                            value={form.name}
                            onChange={handleForm}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="state">Estado</label>
                        <Inputs
                            name="state"
                            id="state"
                            placeholder="Estado"
                            value={form.state}
                            onChange={handleForm}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">Cidade</label>
                        <Inputs
                            name="city"
                            id="city"
                            placeholder="Cidade"
                            value={form.city}
                            onChange={handleForm}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="gender">Genero</label>
                        <Inputs
                            name="gender"
                            id="gender"
                            placeholder="Genero"
                            value={form.gender}
                            onChange={handleForm}
                            disabled={isLoading}
                        />
                    </div>
                </Profile>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <ThreeDots type="ThreeDots" color="#FFFFFF" height={20} width={40} /> : "Salvar Alterações"}
                </Button>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    padding-top: 150px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    height: 100%;

    *{
        transition: all 200ms;
    }

    @media (max-width:720px) {
        flex-direction: column;
        margin-top: 30px;
        height: auto;
        min-height: calc(100% + 120px);
        padding-top: 120px;
        justify-content: flex-start;
    }

    @media (max-width:420px) {
        flex-direction: column;
        margin-top: 30px;
        height: auto;
        min-height: calc(100% + 100px);
        
    }
`

const LogoDateFile = styled.img`
    width: 250px;
    margin-top: 50px;
    padding-left: 100px;

    @media (max-width:420px) {
       width: 0;
       margin: 0;
       padding: 0;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 470px;
    background-color: #FFE4E1;
    box-sizing: border-box;
    border: 1px solid ${secondaryColor};
    border-radius: 10px;
    min-width: 350px;
    padding: 20px;
    margin-right: 20px;
    @media (max-width:430px) {
        width: 100%;
        border-radius: 0;
        border-left: 0;
        border-right: 0;
    }
    @media (max-width:720px) {
        margin: 0;
    }
`

const Inputs = styled.input`
    width: 100%;
    height: 35px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border: 1px solid #DDA0DD;
    border-radius: 5px;
    padding-left: 10px;
    margin-top: 7px;
    font-family: 'Mulish', sans-serif;
    &:focus{
        outline: 1px solid #FF69B4;
    }
`

const Button = styled.button`
    width: 100%;
    min-height: 35px;
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

const Banner = styled.div`
    width: 500px;
    margin-left: 20px;
    box-sizing: border-box;

    @media (max-width:720px) {
        margin: 0;
    }

    @media (max-width:515px) {
        width: 100%;
        border-radius: 0;
        border-left: 0;
        border-right: 0;
    }
    

    & h1{
        font-family: 'Mulish', sans-serif;
        font-size: 34px;
        font-weight: 700;
        margin-bottom: 10px;
        font-style: italic;
        color: ${secondaryColor};
        text-align: center;
    }
`
const Profile = styled.div`
    margin-top: 10px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    div{
        width: 100%;
    }
    label{
        font-family: 'Mulish', sans-serif;
    }
    
`