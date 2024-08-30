"use client";

import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FullScreenLoading } from "@/components/shared/loader";
import { useAuth } from "@/hooks";

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, push, replace } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  useEffect(() => {
    if (!isAuthenticated && isInitialized && pathname !== requestedLocation) {
      setRequestedLocation(pathname);
      replace("/authentication");
    }
  }, [isAuthenticated, isInitialized, pathname, replace, requestedLocation]);

  if (!isInitialized) {
    return <FullScreenLoading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}