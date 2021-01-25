import { Fragment } from "react";
import { ModalBG, ModalWrapper } from "./ui";

function Modal({ open, message, hideAction }) {
  return open &&
    <Fragment>
      <ModalBG onClick={() => hideAction()}/>
      <ModalWrapper>{message}</ModalWrapper>
    </Fragment>
    
}

export default Modal