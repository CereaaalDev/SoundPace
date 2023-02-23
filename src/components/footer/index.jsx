import styled from "styled-components";
import { COLORS } from "/src/util/Colors.js";
import TiltShape from "/src/assets/icons/tilt.svg"


const SectionContainer = styled.div`
  min-width: 100vw;
  background-color: ${COLORS["bg-dark-grey"]};
  color: ${COLORS["text-white"]};
  text-align: right;
`;

const Divider = styled.div`
  transform: rotate(180deg);
  transform: scaleX(-1);
  img{
    width: 100%;
  }
`;

export function Footer() {
  return (
    <>
      <SectionContainer>
      <Divider>
        <img src={TiltShape} alt="" />
      </Divider>
        <h6 style={{marginRight: '5vw', marginBottom: 0, paddingBottom: '0.5rem', fontSize: '11px'}} > © 2023 - Made with ❤️ by Cyrill Burren</h6>
      </SectionContainer>
    </>
  );
}
