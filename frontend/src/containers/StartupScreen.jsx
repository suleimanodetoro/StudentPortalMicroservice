import { lazy, Suspense } from "react";
import FullscreenLoader from "../components/common/reusable/FullscreenLoader";

const MainApp = lazy(() => import("./MainApp"));

function StartupScreen() {
  return (
    <Suspense fallback={<FullscreenLoader />}>
      <MainApp />
    </Suspense>
  );
}

export default StartupScreen;
