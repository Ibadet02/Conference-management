import { Outlet } from "react-router-dom";
import { ReactNode } from "react";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default DashboardLayout;
