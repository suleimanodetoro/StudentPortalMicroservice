import { useTranslation } from "react-i18next";
import Card from "../components/common/Card";
import { USER_INFO } from "../constants/APP_INFO";

const DashboardScreen = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <Card>
        <div className="text-center p-4 pb-0 dashboard">
          <h3>
            {t("Welcome 👋🏿")} <br />
            
          </h3>
        </div>
      </Card>
    </div>
  );
};

export default DashboardScreen;
