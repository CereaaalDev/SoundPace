import styled from "styled-components";

const DividerContainer = styled.div`
  min-width: 100vw;
  transform: rotate(180deg);
`;

export function Divider(props) {
  return (
    <DividerContainer>
      <img src={props.shape} alt="" />
    </DividerContainer>
  );
}
