import PropTypes from "prop-types";
import AuthLayout from "./auth";
import DashboardLayout from "./dashboard";
import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";

const Layout = ({ variant = "dashboard", children }) => {
  if (variant === "auth") {
    return (
      <GuestGuard>
        <AuthLayout>{children}</AuthLayout>
      </GuestGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["dashboard", "auth"]),
};

export default Layout;
