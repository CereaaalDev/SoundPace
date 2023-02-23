import styled from "styled-components";
import { Logo } from "../logo";
import { NavItems } from "./navItems";
import { FaBars } from "react-icons/fa";
import { COLORS } from "../../util/Colors";

const NavbarContainer = styled.div`
  min-height: 70px;
  max-width: min(90vw, 1500px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  margin: 0 auto;
`;

const NavbarSection = styled.nav`
  width: 100%;
  background-color: ${COLORS["bg-grey"]};
 
  backdrop-filter: blur(20px);
  
  position: fixed;
  z-index: 999;
`;

export function Navbar() {
  return (
    <NavbarSection>
      <NavbarContainer>
        <Logo />
        <NavItems />
      </NavbarContainer>
    </NavbarSection>
  );
}
