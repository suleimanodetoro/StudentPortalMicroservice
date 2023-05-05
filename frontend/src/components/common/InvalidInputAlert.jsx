import toStandardFormat from "../../helper/toStandardFormat";

const InvalidInputAlert = ({ error }) => (
  <>
    {error && (
      <div className="text-danger text-left" role="alert">
        <i className="fa fa-info-circle" />{" "}
        <small>{toStandardFormat(error)}</small>
      </div>
    )}
  </>
);

export default InvalidInputAlert;
