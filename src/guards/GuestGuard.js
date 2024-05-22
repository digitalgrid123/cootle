"use client";

import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect } from "react";

import { PATH_DASHBOARD } from "../routes/paths";
import { useAuth } from "@/hooks";

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { replace } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      replace(PATH_DASHBOARD.root);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <>{children}</>;
}
