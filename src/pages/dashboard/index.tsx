import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useContext } from "react";
import { DashboardContext, IDataRegister } from "../../providers/dashboard";

import "./style.css";

const Dashboard = () => {
  const { CalcAntecipation, resCalcAntecipation } =
    useContext(DashboardContext);

  const arrDays = Object.keys(resCalcAntecipation);
  console.log(arrDays);

  const schema = yup.object().shape({
    amount: yup.number().required(),
    installments: yup.number().required(),
    mdr: yup.number().required(),
  });

  const { register, handleSubmit } = useForm<IDataRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data: IDataRegister) => {
    console.log(data);
    CalcAntecipation(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input {...register("amount")} placeholder="valor da venda" />
        <input {...register("installments")} placeholder="numero de parcelas" />
        <input {...register("mdr")} placeholder="percentual MDR" />
        <button type="submit">VERIFICAR ANTECIPAÇÃO</button>
      </form>

      <ul className="ul-list">
        {arrDays.length !== 0 ? (
          arrDays.map((day, index) => {
            if (!day[1]) {
              return (
                <li key={index}>
                  Amanhã:
                  <strong>
                    {resCalcAntecipation[day].toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </li>
              );
            }

            return (
              <li key={index}>
                Em {day} dias:
                <strong>
                  {resCalcAntecipation[day].toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </li>
            );
          })
        ) : (
          <ul className="ul-list">
            <li>
              Amanhã <strong>R$ 0,00</strong>
            </li>
            <li>
              Em 15 dias <strong>R$ 0,00</strong>
            </li>
            <li>
              Em 30 dias <strong>R$ 0,00</strong>
            </li>
            <li>
              Em 90 dias <strong>R$ 0,00</strong>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
