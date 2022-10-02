import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CycleContext } from "../../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./style";

export function Countdown() {
  const {
    activeCycle,
    activeCycleID,
    setCycleFinished,
    passedSecondsAmount,
    setPassedSeconds,
  } = useContext(CycleContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - passedSecondsAmount : 0;

  const minutesAmount = Math.floor(currentSeconds / 60); // arredonda pra baixo (pega somente os minutos cheios)
  const secondsAmount = currentSeconds % 60; // pega o resto dessa divisão

  const minutes = String(minutesAmount).padStart(2, "0"); // se não houverem 2 digitos, ele preenche a esquerda com a string passada
  const seconds = String(secondsAmount).padStart(2, "0"); // se não houverem 2 digitos, ele preenche a esquerda com a string passada

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate) // converter para data, pois local storage retorna string
        );

        // acabar um ciclo quando ele chegar a 0
        if (secondsDifference >= totalSeconds) {
          setCycleFinished();
          setPassedSeconds(totalSeconds);
          clearInterval(interval);
        } else {
          setPassedSeconds(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };

    // podemos ter um retorno no useEffect, precisa ser uma função ( mesmo que sem nada ).
  }, [
    setPassedSeconds,
    activeCycle,
    activeCycleID,
    setCycleFinished,
    totalSeconds,
  ]);

  useEffect(() => {
    if (activeCycle) document.title = `Tempo: ${minutes}:${seconds}`;
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
