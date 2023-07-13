import styled from "styled-components";

export default function Footer() {
    return (
        <FooterContainer>
            <div className="wrapper">
                <div className="primaryinfo">
                    <nav className="nav-footer-navigation">
                        <ul className="footer-items">
                            <li className="footer-item">
                                <a href="#"  className="link">Trabalhe conosco</a>
                            </li>
                            <li className="footer-item">
                                <a href="#"  className="link">Termos e condições</a>
                            </li>
                            <li className="footer-item">
                                <a href="#"  className="link">Como cuidamos da sua privacidade</a>
                            </li>
                            <li className="footer-item">
                                <a href="#" className="link">Acessibilidade</a>
                            </li>
                            <li className="footer-item">
                                <a href="#"  className="link">Contato</a>
                            </li>
                            <li className="footer-item">
                                <a href="#"  className="link">Informações sobre seguros</a>
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

position: fixed;
left: 0;
bottom: 0;
height: 90px;
width: 100%;
background-color: lightgray;
padding:10px;
display: flex;

.wrapper{
    display: flex;
    flex-direction: column;
    gap: 10px;

    .primaryinfo{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}

.link,.secondaryinfo,.copyright{
    color: black;
    text-decoration: none;
    font-family: 'Mulish';
}

.secondaryinfo,.copyright{
    font-size: 12px;
}

.footer-items{
    display: flex;
    gap: 10px;
}
`;