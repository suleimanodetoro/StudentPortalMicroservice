import { useTranslation } from "react-i18next";
import copyToClipboard from "../../helper/copyToClipboard";

const CopyTranslate = ({ children, className = "" }) => {
  const { t } = useTranslation();
  return (
    <span className={className} onClick={() => copyToClipboard(children)}>
      {t(children)}
    </span>
  );
};

export default CopyTranslate;
