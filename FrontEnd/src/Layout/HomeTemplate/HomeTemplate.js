import React from "react";
import { Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function LoginTemplate(props) {
  const { Component, path } = props;
  return (
    <Route
      path={path}
      exact
      render={(propsRoute) => {
        return (
          <>
            <Header />
            <Component {...propsRoute} />
            <Footer />
          </>
        );
      }}
    />
  );
}
