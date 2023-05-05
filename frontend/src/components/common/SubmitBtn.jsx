import FormDivider from "../FormDivider";
import CopyTranslate from "./CopyTranslate";

const SubmitBtn = ({ label = "Submit", loading = false }) => {
  return (
    <FormDivider>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Please wait..." : <CopyTranslate>{label}</CopyTranslate>}
      </button>
    </FormDivider>
  );
};

export default SubmitBtn;
