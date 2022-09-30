import { createContext, useState } from "react";
import { IChildrenReact } from "..";
import { api } from "../../service/api";

interface IContextData {
  CalcAntecipation(data: IDataRegister): Promise<object>;
  resCalcAntecipation: any;
}

export type IDataRegister = {
  amount: number | null;
  installments: number | null;
  mdr: number | null;
};

export const DashboardContext = createContext<IContextData>({} as IContextData);

export const DashboardProvider = ({ children }: IChildrenReact) => {
  const [resCalcAntecipation, setResCalcAntecipation] = useState<object | null>(
    {}
  );

  const CalcAntecipation = async (data: IDataRegister) => {
    const resCalcAntecipation = await api
      .post("/", data)
      .then((res) => {
        setResCalcAntecipation(res.data);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return resCalcAntecipation;
  };

  return (
    <DashboardContext.Provider
      value={{ CalcAntecipation, resCalcAntecipation }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
