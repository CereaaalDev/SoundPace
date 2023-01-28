import styled from "styled-components";
import { Logo } from "../logo";
import { NavItems } from "./navItems";
import { FaBars } from 'react-icons/fa'



const NavbarContainer = styled.nav`
    min-height: 68px;
    width: 90vw;
    max-width: 1500px;
    max-height: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;

`

export function Navbar(){
    return <NavbarContainer>
        <Logo />
        <NavItems/>
    </NavbarContainer>
}