import { Cycle } from "../../pages/home";

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  SET_CYCLE_AS_FINISHED = "SET_CYCLE_AS_FINISHED",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function finishCurrentCycleAction(cycleID: string | null) {
  return {
    type: ActionTypes.SET_CYCLE_AS_FINISHED,
    payload: {
      cycleID,
    },
  };
}

export function interruptCurrentCycleAction(cycleID: string | null) {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    payload: {
      cycleID,
    },
  };
}
