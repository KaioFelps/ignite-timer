import { HeaderContainer } from "./style";
import logoIgnite from "../../assets/logo-ignite.svg";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" aria-label="Ir para o timer" title="Home" end>
          <Timer size={24} />
        </NavLink>
        <NavLink
          to="/history"
          aria-label="Ir para o histórico"
          title="Histórico"
        >
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
