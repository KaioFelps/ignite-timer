import { Play, HandPalm } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod"; // só usamos essa sintaxe quando não há um export default
import { useContext, useState } from "react";
import {
  StopCountdownButton,
  StartCountdownButton,
  HomeContainer,
} from "./style";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CycleContext } from "../../contexts/CyclesContext";

export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?: Date;
};

export function Home() {
  const { createNewCycle, InterruptCurrentCycle, activeCycle } =
    useContext(CycleContext);

  const newCycleFormValidationScheme = zod.object({
    task: zod.string().min(1, "Informe sua tarefa."),
    minutesAmount: zod
      .number()
      .min(1, "O tempo minimo é 1 minutos.")
      .max(60, "O tempo máximo é 60 minutos."),
  });

  type newCycle = zod.infer<typeof newCycleFormValidationScheme>;
  // infer algo é automatizar um processo de falar qual a tipagem de algo. Infer é typescript

  const newCycleForm = useForm<newCycle>({
    resolver: zodResolver(newCycleFormValidationScheme),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  /* ---

  useForm é como criar um novo formulário na aplicação
  
  REGISTER é um método que vai adicionar um input ao formulário
  - NomeDoInput é o mesmo que o atributo "name", isso faz o atributo name ser descartado.

  - Interior: function register(name: string) {
                return (
                  onChange: () => void,
                  onBlur: () => void,
                  onFocus: () => void,
                )
              }

  - Ela retorna várias funções que o React Hook Form usará para monitorar o formulário, portanto, através do rest operator, seria o mesmo que adicionarmos todos esses atributos no input.
  - Sintaxe:
            - {...register("NomeDoInput")}
  - Sintaxe com objeto de configurações: 
            - {...register("nomeDoInput", {})}

  No objeto podemos colocar várias configurações (veja apertando ctrl + spacebar). Nesse caso usaremos a configuração para passar todos os números para números e não strings no resultado (data): { valueAsNumber: true }


  Watch é uma função que fica observando um campo, como se fosse um estado

  --- */

  function handleCreateNewCycle(data: newCycle) {
    createNewCycle(data);

    reset(); // funciona voltando os campos do formulário pros valores colocados no defaultValues.
  }

  const taskIsFilled = watch("task"); // task é o nome do input

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          {/*
              SPREADS 
            
              É como se criasse uma propriedade para cada propriedade dentro do newCycleForm, como:
              
              register={register}
              handleSubmit={handleSubmit}

              e assim por diante...
            */}
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Parar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!taskIsFilled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
