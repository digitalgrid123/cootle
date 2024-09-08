"use client";

import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useAuth } from "@/hooks";

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, replace, push } = useRouter();

  useEffect(() => {
    // Only check authentication when the app is initialized
    if (isInitialized) {
      if (!isAuthenticated) {
        // Redirect to authentication if not authenticated
        if (pathname !== "/authentication") {
          replace("/authentication");
        }
      } else if (pathname === "/authentication") {
        // If already authenticated and on the auth page, redirect to the requested page or home
        push("/");
      }
    }
  }, [isAuthenticated, isInitialized, pathname, replace, push]);

  // Return null while checking or if unauthenticated
  if (!isInitialized || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
