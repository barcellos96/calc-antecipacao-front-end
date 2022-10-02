import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import React, { useContext } from "react";
import { DashboardContext, IDataRegister } from "../../providers/dashboard";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";

const Dashboard = () => {
  const { CalcAntecipation, resCalcAntecipation } =
    useContext(DashboardContext);

  const arrDays = Object.keys(resCalcAntecipation);

  const schema = yup.object().shape({
    amount: yup
      .number()
      .required("Minimo de R$1.000,00 requerido")
      .min(1000, "Minimo de R$1.000,00"),
    installments: yup.number().required().max(12, "Máximo de 12 parcelas"),
    mdr: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataRegister>({
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
        <span className="span-title">VALOR DA VENDA</span>
        <input
          {...register("amount")}
          placeholder="Ex.: R$1.000,00"
          className="input"
        />
        <span className="span-title">NÚMERO DE PARCELAS</span>
        {errors &&
          errors.amount?.type === "min" &&
          toast.error(errors.amount?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "amount",
          })}

        <input
          {...register("installments")}
          placeholder="Ex.: 3"
          className="input"
        />
        <span className="span-exemple">*até 12 parcelas*</span>
        {errors &&
          errors.installments?.type === "max" &&
          toast.error(errors.installments?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "installments",
          })}

        <span className="span-title">PERCENTUAL MDR</span>
        <input {...register("mdr")} placeholder="Ex.: 4" className="input" />
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
