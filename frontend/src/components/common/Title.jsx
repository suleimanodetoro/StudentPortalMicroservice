import React from "react";
import { useTranslation } from "react-i18next";
import copyToClipboard from "../../helper/copyToClipboard";

const Title = ({ title = "" }) => {
  const { t } = useTranslation();

  return (
    <h5
      className="card-title text-capitalize"
      onClick={() => copyToClipboard(title)}
    >
      {t(title)}
    </h5>
  );
};

export default Title;
