"use client";

import PropTypes from "prop-types";
import { useAuth } from "@/hooks";

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array,
  children: PropTypes.node,
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const {
    selectedRole,
    user: { role, is_superuser },
  } = useAuth();

  if (
    (selectedRole === "hospital" || selectedRole === "surgeon") &&
    is_superuser
  ) {
    return <>{children}</>;
  } else if (!accessibleRoles.includes(role) && !is_superuser) {
    return <>You do not have permission to access this page</>;
  }

  return <>{children}</>;
}
