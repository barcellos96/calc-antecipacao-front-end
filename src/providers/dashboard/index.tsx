import { createContext } from "react";
import { IChildrenReact } from "..";
import { api } from "../../service/api";

interface IContextData {
  CalcAntecipation(): Promise<object>;
}

export const DashboardContext = createContext<IContextData>({} as IContextData);

export const DashboardProvider = ({ children }: IChildrenReact) => {
  const CalcAntecipation = async () => {
    const resCalcAntecipation = await api
      .post("/", {
        amount: 20000,
        installments: 7,
        mdr: 4,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return resCalcAntecipation;
  };

  return (
    <DashboardContext.Provider value={{ CalcAntecipation }}>
      {children}
    </DashboardContext.Provider>
  );
};
