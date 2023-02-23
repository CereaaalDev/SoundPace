import styled, { keyframes } from "styled-components";
import { COLORS } from "/src/util/Colors";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const SpinnerContainer = styled.div`
  border: 3px solid transparent;
  border-top: 3px solid ${COLORS.primary};
  border-right: 3px solid ${COLORS.primary};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;

export function Spinner(){
    return <SpinnerContainer/>
}
