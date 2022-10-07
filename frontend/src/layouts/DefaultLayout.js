import React from "react";
import { Navigate, useOutlet } from "react-router-dom";

const DefaultLayout = () => {
  let isAuthenticated = document.cookie;
  const outlet = useOutlet();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  // return (
  //   <div>
  //     {outlet}
  //   </div>
  // );
};

export default DefaultLayout;
