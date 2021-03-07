import React from "react";
import { Route } from "react-router-dom";

export default function LoginTemplate(props) {
  const { Component, path } = props;
  return (
    <Route
      path={path}
      exact
      render={(propsRoute) => {
        return <Component {...propsRoute} />;
      }}
    />
  );
}
