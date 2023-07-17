import { useEffect, useState } from "react";
import styled from "styled-components";

export default function BannerComponent()
{
    const [currentBanner, setCurrentBanner] = useState(0);
    const banners = [
        'https://http2.mlstatic.com/D_NQ_880633-MLA70477554913_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_603228-MLA70502856957_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_969639-MLA70502889119_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_687470-MLA70502996705_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_613294-MLA70502998531_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_605511-MLA70477564256_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_727681-MLA70477708062_072023-OO.webp',
        'https://http2.mlstatic.com/D_NQ_702369-MLA70504685369_072023-OO.webp',
      ];

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentBanner((prevBanner) =>
            (prevBanner + 1) % banners.length
          );
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);

    return(
        <SCBanner>
                {banners.map((banner, index) => (
                    <img
                    key={index}
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className={index === currentBanner ? 'active' : ''}
                    decoding="async"
                    />
                ))}
        </SCBanner>
    )
}


const SCBanner =styled.section`

  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-top: 120px;
  max-width: 100%;
      
  img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
  }

    img.active {
      opacity: 1;
  }
`;