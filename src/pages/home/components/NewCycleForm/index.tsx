import { FormContainer, MinutesAmountInput, TaskInput } from "./style";
import * as zod from "zod";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CycleContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        placeholder="Dê um nome ao seu projeto"
        autoComplete="on"
        id="task"
        {...register("task")}
        disabled={!!activeCycle} // 2 ! converte pra booleano
      />

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        placeholder="00"
        type="number"
        id="minutesAmount"
        step={5}
        min={5}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
