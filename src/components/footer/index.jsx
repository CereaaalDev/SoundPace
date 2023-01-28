import styled from "styled-components";
import { COLORS } from "../../util/Colors";


const SectionContainer = styled.div`
  min-width: 100vw;
  background-color: ${COLORS["bg-dark-grey"]};
  color: ${COLORS["text-white"]};
  text-align: right;
`;

const Divider = styled.div`
  transform: rotate(180deg);
  transform: scaleX(-1);
`;

export function Footer() {
  return (
    <>
      <SectionContainer>
      <Divider>
        <img src="src/assets/icons/tilt.svg" alt="" />
      </Divider>
        <h5 style={{marginRight: '5vw'}} > © 2023 - Made with ❤️ by Cyrill Burren</h5>
      </SectionContainer>
    </>
  );
}
