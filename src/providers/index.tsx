import { ReactNode } from "react";
import { DashboardProvider } from "./dashboard";

export type IChildrenReact = {
  children: ReactNode;
};

const Providers = ({ children }: IChildrenReact) => {
  return <DashboardProvider>{children}</DashboardProvider>;
};

export default Providers;
