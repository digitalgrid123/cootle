import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

const HeaderBreadcrumbs = ({
  pageTitle,
  actionElement,
  isBackAllow = false,
  backPath = "#",
}) => {
  return (
    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div className="breadcrumb-title pe-3">
        {isBackAllow ? (
          <Link href={backPath}>
            <i
              className="bx bx-chevron-left fs-3"
              style={{ verticalAlign: "middle" }}
            />
          </Link>
        ) : (
          ""
        )}
        {pageTitle}
      </div>
      <div className="ms-auto">{actionElement ? actionElement : ""}</div>
    </div>
  );
};

HeaderBreadcrumbs.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  actionElement: PropTypes.node,
};

export default HeaderBreadcrumbs;
