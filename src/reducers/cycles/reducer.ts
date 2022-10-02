import { Cycle } from "../../pages/home";
import { ActionTypes } from "./actions";
import { produce } from "immer";
import { date } from "zod";

export type createCycleData = {
  task: string;
  minutesAmount: number;
};

export type CycleContextType = {
  activeCycle: Cycle | undefined;
  activeCycleID: string | null;
  passedSecondsAmount: number;
  setCycleFinished: () => void;
  setPassedSeconds: (seconds: number) => void;
  createNewCycle: (value: createCycleData) => void;
  InterruptCurrentCycle: () => void;
  cycles: Cycle[];
};

type CyclesState = {
  cycles: Cycle[];
  activeCycleID: string | null;
};

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleID: action.payload.newCycle.id,
      // };

      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleID = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleID) {
      //       return { ...cycle, interruptDate: new Date() };
      //     } else {
      //       return cycle;
      //     }
      //   }),
      //   activeCycleID: null,
      // };

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID;
      });
      // se ele não encontra nenhum item sob essas condições, ele retorna -1
      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.activeCycleID = null;
        draft.cycles[currentCycleIndex].interruptDate = new Date();
      });
    }
    case ActionTypes.SET_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleID;
      });

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.activeCycleID = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }
    default:
      return state;
  }
}
