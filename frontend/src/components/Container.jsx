import React from "react";
import Card from "./common/Card";
import Error from "./common/Error";
import Loader from "./common/reusable/Loader";
import Title from "./common/Title";

const Container = ({ error, title, loading = false, children }) => (
  <Card className="p-4">
    {title && <Title title={title} />}
    {error && <Error error={error} />}
    {loading ? <Loader /> : <>{children}</>}
  </Card>
);

export default Container;
