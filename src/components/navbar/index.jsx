import styled from "styled-components";
import { Logo } from "/src/components/logo";
import { NavItems } from "./navItems";
import { COLORS } from "/src/util/Colors.js";

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
