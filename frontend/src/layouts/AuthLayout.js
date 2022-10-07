import React from "react";
import { Navigate, useOutlet } from "react-router-dom";

const AuthLayout = () => {
  let isAuthenticated = false
  const outlet = useOutlet();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};

export default AuthLayout;
