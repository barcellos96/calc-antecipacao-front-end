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

  const schema = yup.object().shape({
    amount: yup.number().required(),
    installments: yup.number().required(),
    mdr: yup.number().required(),
  });

  const { register, handleSubmit } = useForm<IDataRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data: IDataRegister) => {
    CalcAntecipation(data);
  };

  return (
    <div className="div-container">
      <form
        onSubmit={handleSubmit(onSubmitFunction)}
        className="form-container"
      >
        <input
          {...register("amount")}
          placeholder="valor da venda"
          className="input"
        />
        <input
          {...register("installments")}
          placeholder="numero de parcelas"
          className="input"
        />
        <input
          {...register("mdr")}
          placeholder="percentual MDR"
          className="input"
        />
        <button type="submit" className="btn-submit">
          VERIFICAR ANTECIPAÇÃO
        </button>
      </form>

      <ul className="ul-list">
        <h3 className="h2-subtitle">VOCÊ RECEBERÁ:</h3>
        {arrDays.length !== 0 ? (
          arrDays.map((day, index) => {
            if (!day[1]) {
              return (
                <li key={index} className="li-style">
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
              <li key={index} className="li-style">
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
          <ul className="ul-list-preload">
            <li className="li-style">
              Amanhã: <strong>R$ 0,00</strong>
            </li>
            <li className="li-style">
              Em 15 dias: <strong>R$ 0,00</strong>
            </li>
            <li className="li-style">
              Em 30 dias: <strong>R$ 0,00</strong>
            </li>
            <li className="li-style">
              Em 90 dias: <strong>R$ 0,00</strong>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
