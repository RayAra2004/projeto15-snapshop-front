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

export default function UserProfile(){
    const [isClicked, setIsClicked] = useState(false)
    const [foto, setFoto] = useState("")
    const [nameUser, setNameUser] = useState("")
    const [states, setStates] = useState("")
    const [cities, setCities] = useState("")
    const [genders, setGenders] = useState("")
    const [updatedUser, setUpdatedUser] = useState(false)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/info-usuario`,{headers:{Authorization:localStorage.getItem('token')}})
        .then((res)=>{
            console.log(res.data.user)
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
    justify-content: space-between;
    align-items: center;
    padding-top: 150px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    height: 100%;
`

const LogoDateFile = styled.img`
    width: 250px;
    margin-top: 50px;
    padding-left: 100px;
`

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 450px;
    background-color: #FFE4E1;
    margin-right: 200px;
    box-sizing: border-box;
    border: 1px solid ${secondaryColor};
    border-radius: 10px;
`

const Button = styled.button`
    width: 300px;
    height: 35px;
    border: 0;
    border-radius: 5px;
    background-color: #FF69B4;
    font-family: 'Mulish', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    margin-top: 35px;
    cursor: pointer;
    transition: all 200ms;
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
    margin-left: 150px;
    box-sizing: border-box;

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