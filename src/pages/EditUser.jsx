import styled from "styled-components";
import Date from "../assets/datas.svg"
import ProfilePic from "../assets/Profile.svg"

export default function EditUser(){
    return(
  
            <Container>
                <Banner>
                    <h1>Edite seu perfil para ficar a sua cara!</h1>
                    <LogoDateFile src={Date} alt="editar-Perfil" />
                </Banner>
                <Profile>
                    <ProfilePicture src={ProfilePic} alt="Foto-perfil" />
                    <Inputs type="text" name="photo" />
                    <Inputs type="text" name="name"/>
                    <CheckMarks>
                        <Checks type="checkbox" name="" /> Feminino
                        <Checks type="checkbox" name="" /> Masculino
                        <Checks type="checkbox" name="" /> Outro
                    </CheckMarks>
                    <Button>Salvar Alterações</Button>
                </Profile>
            </Container>

    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 150px;
    box-sizing: border-box;
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
    border: 1px solid #FF1493;
    border-radius: 10px;
`

const Inputs = styled.input`
    width: 300px;
    height: 35px;
    margin-bottom: 15px;
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
        color: #FF1493;
        background-color: white;
        border: 1px solid #FF1493;
    }
`

const ProfilePicture = styled.img`
    width: 100px;
    margin-top: 30px;
    margin-bottom: 50px;
    border-radius: 50%;
    background-color: #FFFFFF;
`
const Checks = styled.input``

const CheckMarks = styled.div`
   font-family: 'Mulish', sans-serif;
   font-size: 14px;
   font-weight: 700;
   margin-top: 10px;
   margin-bottom: 10px;
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
        color: #FF1493;
        text-align: center;
    }
`