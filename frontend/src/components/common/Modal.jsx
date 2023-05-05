import { useEffect } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import ReactPortal from "../ReactPortal";

const Modal = ({
  title = "",
  show = false,
  handleClose = () => {},
  children,
  width = "500px",
  preventDefault = false,
}) => {
  const ref = useOutsideClick(handleClose);
  useEffect(() => {
    if (show) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }
  }, [show]);

  return (
    show && (
      <ReactPortal>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#00000069",
            zIndex: 999999,
            overflow: "auto",
          }}
        >
          <div className="d-flex justify-content-center align-items-center h-100">
            <div
              ref={!preventDefault ? ref : null}
              style={{ width: "100%", maxWidth: width }}
            >
              <div style={{ background: "#fff" }}>
                {title && (
                  <div className="d-flex justify-content-between align-items-center py-2 px-3">
                    <h5 className="modal-title">{title}</h5>
                    <button className="btn-close" onClick={handleClose} />
                  </div>
                )}
                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </ReactPortal>
    )
  );
};

export default Modal;
