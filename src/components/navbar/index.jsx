import styled from "styled-components";
import { Logo } from "../logo";
import { NavItems } from "./navItems";
import { FaBars } from 'react-icons/fa'
import { COLORS } from "../../util/Colors";



const NavbarContainer = styled.nav`
    min-height: 70px;
    width: 90vw;
    max-width: 1500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    background-color: ${COLORS["bg-grey"]};
    margin: 0 auto;
`

export function Navbar(){
    return <NavbarContainer>
        <Logo />
        <NavItems/>
    </NavbarContainer>
}