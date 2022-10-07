import React from "react";
import { Navigate, useOutlet } from "react-router-dom";

const PublicLayout = () => {
  let isAuthenticated = true
  const outlet = useOutlet();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  // return (
  //   <div>
  //     {outlet}
  //   </div>
  // );
};

export default PublicLayout;
