import styled from "styled-components";
// "mailto:noreply.snapshop@gmail.com?subject=Assunto%20do%20email&body=Corpo%20do%20email"
export default function Contact()
{
    return (
        <PageContainer>
            <p>Email para contato: <a href="mailto:noreply.snapshop@gmail.com?subject=Assunto%20do%20email&body=Corpo%20do%20email" target="blank">noreply.snapshop@gmail.com</a></p>
        </PageContainer>
    );
}

const PageContainer = styled.main`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
   
    p{
        color: white;
        text-align: center;
    }
`;