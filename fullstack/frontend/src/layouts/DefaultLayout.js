import React from "react";
import { Navigate, useOutlet } from "react-router-dom";

const DefaultLayout = () => {
  let isAuthenticated = document.cookie.length !== 0
  const outlet = useOutlet();

  if (isAuthenticated) {
    return <Navigate to="/home" replace/>;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};

export default DefaultLayout;
