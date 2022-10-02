import {
  createContext,
  ReactNode,
  useState,
  useReducer,
  useEffect,
} from "react";
import { Cycle } from "../pages/home";
import {
  cyclesReducer,
  CycleContextType,
  createCycleData,
} from "../reducers/cycles/reducer";
import {
  ActionTypes,
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns/esm";

type CyclesContextProviderProps = {
  children: ReactNode;
};

export const CycleContext = createContext({} as CycleContextType);

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleID: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:stateJSON-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
    }
  );
  const { cycles, activeCycleID } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);

  const [passedSecondsAmount, setPassedSecondsAmount] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:stateJSON-1.0.0", stateJSON);
    // salvar no histórico
    // local storage (cache) só suporta textos
    // quando formos colocar o nome da informação, sugere-se que bote o nome do projeto como prefixo e depois o nome da informaçao a ser guardada
    // as informações sempre ocupam o mesmo compartimento, ou seja, informações com o mesmo nome se sobreescreverão.
    /* ---
      É interessante colocar também versões no seu nome:
        - caso você mude as informações de dentro desse cache de modo crítico, a aplicação de quem utilizar as informações antigas dará erro pois estará usando o mesmo nome
        - tendo a versão no nome, o aplicativo vai sempre ler a informação mais atualizada (A que você nomeou) e ignorar as informações antigas, eliminando qualquer possibilidade de erros.
    --- */
  }, [cyclesState]);

  function setPassedSeconds(seconds: number) {
    setPassedSecondsAmount(seconds);
  }

  function setCycleFinished() {
    dispatch(finishCurrentCycleAction(activeCycleID));
  }

  function createNewCycle(data: createCycleData) {
    // datas são os dados dos nossos inputs, eles serão retornados como um objeto onde as chaves são os nomes fornecidos no register e os valores são os valores dos respectivos inputs, como {tasks: "vsdjc", minutesAmount: 10}
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setPassedSecondsAmount(0);
  }

  function InterruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction(activeCycleID));
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleID,
        setCycleFinished,
        passedSecondsAmount,
        setPassedSeconds,
        createNewCycle,
        InterruptCurrentCycle,
        cycles,
      }}
    >
      {children}
      {/* children é o elemento que vai vir dentro desse nosso componente (no caso o Router). É como um outlet. O tipo dele é sempre o ReactNode, uma tipagem própria do React que recebe qualquer arquivo jsx/tsx válido.
          Sem ele não poderiamos colocar nada dentro, seria aqueles componentes de tag FECHADA. */}
    </CycleContext.Provider>
  );
}
