import styled from "styled-components";
import { Logo } from "../logo";
import { NavItems } from "./navItems";


const NavbarContainer = styled.div`
    min-height: 68px;
    max-width: 1500px;
    width: 100%;
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