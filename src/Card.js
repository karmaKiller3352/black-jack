import { useState } from "react";
import styled, { css, keyframes } from "styled-components";

function animateCard(left, top) {
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

const CardsWrapper = styled.div`
  width: 106px;
  height: 154px;
  position: absolute;
  background-size: 1695px 650px;
  background-image: url('images/cards.png');
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

function Card(props) {
  return <CardsWrapper layer={props.layer} left={props.left} bgp={props.bgp} top={props.top} />
}

export default Card