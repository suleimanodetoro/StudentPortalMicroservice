import { createPortal } from "react-dom";

const createWrapperAndAppendToBody = (wrapperId) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

const ReactPortal = ({ children, portalId = "modal" }) => {
  let element = document.getElementById(portalId);

  if (!element) {
    element = createWrapperAndAppendToBody(portalId);
  }

  return createPortal(children, element);
};

export default ReactPortal;
