import { CardWrapper } from "./ui";

function Card(props) {
  return <CardWrapper layer={props.layer} left={props.left} bgp={props.bgp} top={props.top} />
}

export default Card