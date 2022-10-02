import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./style";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}

// Outlet vem do react-router-dom. Outlet é como um espaço em branco aonde o react-router inserirá o conteúdo da página, é como uma tag de aviso que o diz aonde por o conteúdo.
