import styled, { createGlobalStyle, css, keyframes } from "styled-components";
import cardCovers from './covers/cards.png';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
    overflow: auto;
    color: ${({ theme }) => theme.contrast};
  }
`

export const ModalBG = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.8;
  z-index: 1000;
  cursor: pointer;
  background-color: ${({ theme }) => theme.contrast};
`

export const ModalWrapper = styled.div`
  position: absolute;
  height: 120px;
  top: 40%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  z-index: 1001;
  background-color: ${({ theme }) => theme.btnColor};
  border: 1px solid ${({ theme }) => theme.contrast};
  box-shadow: 0px 2px 10px ${({ theme }) => theme.contrast};
  text-shadow: 1px 1px 2px ${({ theme }) => theme.text};
  padding: 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 40px;
`

export const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width:  100%;
  background-color: ${({ theme }) => theme.primary};
`
export const GameBox = styled.div`
  width: 1024px;
  height: 768px;
  min-width: 1024px;
  min-height: 768px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.contrast};
  box-shadow: 0px 5px 10px ${({ theme }) => theme.contrast};
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
`
export const ControlPanel = styled.div`
  width: 300px;
  border-left: 2px solid ${({ theme }) => theme.contrast};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
export const GameField = styled.div`
  width: 724px;
  background-color: ${({ theme }) => theme.gameField};
  position: relative;
`
export const CardsWrapper = styled.div`
  width: 110px;
  height: 157px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`
export const CardCover = styled.img`
  width: 200px;
`
export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 40%;
  width: 100%;
  align-items: center;
`


export const Label = styled.div`
  position: absolute;
  font-size: 30px;
  font-weight: bold;
  left: 50px;
  ${props => {
    if (props.top) return css`top: 280px;`
    if (props.bottom) return css`bottom: 280px;`
  }}
`
export const Points = styled.div`
  position: absolute;
  font-size: 30px;
  right: 50px;
  span {
    font-weight: bold;
    color: ${({ theme }) => theme.words};
    font-size: 60px;
  }
  ${props => {
    if (props.top) return css`top: 20px;`
    if (props.bottom) return css`bottom: 20px;`
  }}
`


export const Button = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: center;
  box-shadow: 1px 1px 2px ${({ theme }) => theme.contrast};
  outline: none;
  font-size: 20px;
  color: ${({ theme }) => theme.contrast};
  text-shadow: 1px 1px 3px #fff;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.btnColor};
  :hover {
    box-shadow: 1px 1px 10px ${({ theme }) => theme.contrast};
  }
  :disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const Statistic = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Money = styled.div`
  font-size: 55px;
  color: ${({ theme }) => theme.btnColor};
  font-weight: bold;
  font-family: sans-serif;
  text-shadow: 1px 1px 3px ${({ theme }) => theme.contrast};
`

export const Bet = styled.div`
  margin-top: 40px;
  font-size: 35px;
  font-weight: bold;
  color: ${({ theme }) => theme.contrast};
  text-shadow: 1px 1px 3px ${({ theme }) => theme.btnColor};
`


export const CardWrapper = styled.div`
  width: 106px;
  height: 154px;
  position: absolute;
  background-size: 1695px 650px;
  background-image: url(${cardCovers});
  background-repeat: no-repeat;
  box-shadow: -2px 2px 5px ${({ theme }) => theme.contrast};
  border: .5px solid ${({ theme }) => theme.contrast};
  background-position: ${props => props.bgp};
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  
  ${props => {
    const x = props.top ? 90 : 530;
    return css`
      animation: ${props => animateCard(20 + props.left, x)} .7s linear;
      transform: translateX(${20 + props.left}px) translateY(${x}px);
  `}
  }
`

export function animateCard(left, top) {
  const moving = keyframes`
    0% {
      transform: translateX(595px) translateY(305px);
    }
   
    100% {
      transform: translateX(${left}px) translateY(${top}px);
    }
  `;
  return moving;
}