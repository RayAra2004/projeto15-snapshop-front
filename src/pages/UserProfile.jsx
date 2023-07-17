import styled from "styled-components";
import ProfilePic from "../assets/profile.svg";
import { secondaryColor } from "../Colors/colors";
import Perfil from "../assets/perfil.svg";
import { BiEdit } from "react-icons/bi"
import { PiGenderIntersex } from "react-icons/pi"
import { GoPerson } from "react-icons/go"
import { GoLocation } from "react-icons/go"
import { useState } from "react";
import EditUser from "../Components/EditUser";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../Contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function UserProfile(){
    const [isClicked, setIsClicked] = useState(false)
    const [foto, setFoto] = useState("")
    const [nameUser, setNameUser] = useState("")
    const [states, setStates] = useState("")
    const [cities, setCities] = useState("")
    const [genders, setGenders] = useState("")
    const [updatedUser, setUpdatedUser] = useState(false)
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        
        if(!user || !localStorage.getItem('token'))
        {
            navigate('/');
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/info-usuario`,{headers:{Authorization:localStorage.getItem('token')}})
        .then((res)=>{
            //console.log(res.data.user)
            const {photo, userName, state, city, gender} =  res.data.user;
            setFoto(photo);
            setNameUser(userName);
            setStates(state);
            setCities(city);
            setGenders(gender)
        })
        .catch(err => alert(err.response))
    }, [updatedUser])

    return(
        <>
            {isClicked ? (
                <EditUser 
                    setIsClicked={setIsClicked} 
                    setUpdatedUser={setUpdatedUser} 
                    updatedUser={updatedUser}
                    foto={foto}
                    nameUser={nameUser}
                    genders={genders}
                    states={states}
                    cities={cities}
                />
            ) : (
                <Container>
                <Banner>
                    <h1>Bem-vindo(a) ao seu perfil!</h1>
                    <LogoDateFile src={Perfil} alt="editar-Perfil" />
                </Banner>
                <Profile>
                    <ProfilePicture src={foto} alt="Foto-perfil" />
                    <P>{nameUser} <GoPerson/> </P>
                    <P>{states} <GoLocation/> </P>
                    <P>{cities} <GoLocation/> </P>
                    <P>{genders} <PiGenderIntersex /></P>
                    <Button onClick={() => setIsClicked(true)}>Editar perfil <BiEdit/></Button>
                </Profile>
            </Container>
            )}
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    gap: 10px;
    padding-top: 150px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    height: 100%;

    *{
        transition: all 200ms;
    }

    @media (max-width:820px) {
        flex-direction: column;
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

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 450px;
    background-color: #FFE4E1;
    margin-right: 20px;
    box-sizing: border-box;
    border: 1px solid ${secondaryColor};
    border-radius: 10px;
    padding: 20px;
    min-width: 280px;
    @media (max-width:820px) {
        margin-right: 0;
    }

    @media (max-width:405px) {
        width: 100%;
        border-radius: 0;
        border-left: 0;
        border-right: 0;
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
    margin-top: 15px;
    cursor: pointer;
    transition: all 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-shrink: 0;
    &:hover{
        color: ${secondaryColor};
        background-color: white;
        border: 1px solid ${secondaryColor};
    }
`

const ProfilePicture = styled.img`
    width: 150px;
    height: 150px;
    margin-top: 30px;
    margin-bottom: 50px;
    border-radius: 50%;
`

const Banner = styled.div`
    width: 500px;
    margin-left: 20px;
    box-sizing: border-box;
    @media (max-width:820px) {
        margin-left: 0;
    }

    @media (max-width:515px) {
        width: 100%;
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
const P = styled.p`
    font-size: 20px;
    font-weight: 700;
    font-family: 'Mulish', sans-serif;
    color: ${secondaryColor};
    margin-bottom: 10px;
`