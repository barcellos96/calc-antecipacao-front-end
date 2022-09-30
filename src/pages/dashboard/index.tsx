import { useContext } from "react";
import { DashboardContext } from "../../providers/dashboard";

const Dashboard = () => {
  const context = useContext(DashboardContext);
  console.log(context.CalcAntecipation());

  return <>TESTE </>;
};

export default Dashboard;
