import React from "react";
import Layout from "@/layouts";

const AuthLayout = ({ children }) => {
  return <Layout variant="auth">{children}</Layout>;
};

export default AuthLayout;
