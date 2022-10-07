import React from "react";
import { Navigate, useOutlet } from "react-router-dom";

const DefaultLayout = () => {
  let isAuthenticated = false
  const outlet = useOutlet();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};

export default DefaultLayout;
