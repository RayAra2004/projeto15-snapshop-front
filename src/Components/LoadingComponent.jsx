import styled from "styled-components";
import { mainColor } from "../Colors/colors";
import { Grid,MagnifyingGlass } from "react-loader-spinner";

export default function LoadingComponent({color,glass})
{
    return (
        <SCLoadingComponent>
            {
                glass && 
                <MagnifyingGlass
                visible={true}
                height="120"
                width="120"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor = '#c0efff'
                color = {color ? color : mainColor}
                />
            }
            {
                !glass &&  
                <Grid
                    height="80"
                    width="80"
                    color= {color ? color : mainColor}
                    ariaLabel="grid-loading"
                    radius="12.5"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            
            }
        </SCLoadingComponent>
       
    );
}


const SCLoadingComponent = styled.div`
    color: ${mainColor};
    font-family: 'Mulish', sans-serif;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 20px;
    p{
        white-space: nowrap;
    }
`;