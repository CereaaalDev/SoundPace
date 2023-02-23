import SoundPaceLogo from "/SoundPace_logo.svg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";


const LogoContainer = styled.div``;
const LogoImage = styled.img``;

export function Logo(props) {
  return (
    <LogoContainer>
      <NavLink to="/">
        <LogoImage
          width={props.width ? props.width : "150px"}
          src={SoundPaceLogo}
          alt="SoundPace Logo"
        />
      </NavLink>
    </LogoContainer>
  );
}
