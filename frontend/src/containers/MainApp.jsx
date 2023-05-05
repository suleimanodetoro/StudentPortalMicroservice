import AssignRoutes from "../components/common/reusable/AssignRoutes";
import ROUTES from "../routes/app/gateway";

function MainApp() {
  return <AssignRoutes routes={ROUTES} />;
}

export default MainApp;
