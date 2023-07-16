import styled from "styled-components";
import { footerBackgroundColor } from "../Colors/colors";

export default function Footer() {
    return (
        <FooterContainer>
            <div className="wrapper">
                <div className="primaryinfo">
                    <nav className="nav-footer-navigation">
                        <ul className="footer-items">
                            <li className="footer-item">
                                <p className="link">Trabalhe conosco</p>
                            </li>
                            <li className="footer-item">
                                <p className="link">Termos e condições</p>
                            </li>
                            <li className="footer-item">
                                <p className="link">Como cuidamos da sua privacidade</p>
                            </li>
                            <li className="footer-item">
                                <p className="link">Acessibilidade</p>
                            </li>
                            <li className="footer-item">
                                <p className="link">Contato</p>
                            </li>
                            <li className="footer-item">
                                <p className="link">Informações sobre seguros</p>
                            </li>
                        </ul>
                    </nav>
                    <small className="copyright">Copyright ©&nbsp;1500-2023 Snapshop.vercel.app LTDA.</small>
                </div>
                <p className="secondaryinfo">CNPJ n.º 69.420.420/6969-69 / Rua dos bobos, nº 420, Semfim, Acre/NE - CEP 420069-024 - empresa do grupo SnapShop.</p>
            </div>
        </FooterContainer>
    );
}


const FooterContainer = styled.footer`
    height: 90px;
    width: 100%;
    background-color: ${footerBackgroundColor};

    display: flex;
    overflow: hidden;

    .wrapper{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding:10px;

        .primaryinfo{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }

    @media (max-width:1130px) {
        display: none;
    }

    .link,.secondaryinfo,.copyright{
        color: black;
        text-decoration: none;
        font-family: 'Mulish';
    }

    .link{
        cursor: pointer;
    }

    .secondaryinfo,.copyright{
        font-size: 12px;
    }

    .footer-items{
        display: flex;
        gap: 10px;
    }
`;