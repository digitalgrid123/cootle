"use client";
import React, { useEffect, useState } from "react";
// import HospitalAdminDashboard from "@/components/dashboard/main/HospitalAdminDashboard";
// import SuperAdminDashboard from "@/components/dashboard/main/SuperAdminDashboard";
// import SurgeonDashboard from "@/components/dashboard/main/SurgeonDashboard";
// import HeaderBreadcrumbs from "@/components/shared/HeaderBreadcrumbs";
import PageTitle from "@/components/shared/PageTitle";
import { USER_ROLES } from "@/constants/keywords";
import { useAuth } from "@/hooks";

const Dashboard = () => {
  const { user, selectedRole } = useAuth();

  const { role, is_superuser } = user || {};

  // const renderDashboard = () => {
  //   if (is_superuser) {
  //     if (selectedRole === USER_ROLES.SURGEON) {
  //       return <SurgeonDashboard />;
  //     } else if (selectedRole === USER_ROLES.HOSPITAL) {
  //       return <HospitalAdminDashboard />;
  //     } else {
  //       return <SuperAdminDashboard />;
  //     }
  //   } else {
  //     if (selectedRole === USER_ROLES.SURGEON) {
  //       return <SurgeonDashboard />;
  //     } else if (selectedRole === USER_ROLES.HOSPITAL) {
  //       return <HospitalAdminDashboard />;
  //     } else {
  //       return <SuperAdminDashboard />;
  //     }
  //   }
  // };

  return (
    <>
      <PageTitle title="Dashboard" />
      <HeaderBreadcrumbs
        pageTitle={"Dashboard"}
        actionElement={
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <i className="bx bx-home-alt"></i>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
        }
      />
      {/*
      {renderDashboard(user?.role)} */}
    </>
  );
};

export default Dashboard;
