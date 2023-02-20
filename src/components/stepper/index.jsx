import styled from "styled-components";

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const StepIcon = styled.div`
  border: 2px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Divider = styled.div`
  width: 40px;
  height: 3px;
  background-color: black;
`;

export function Stepper(props) {
  return (
    <StepperContainer>
      {[...Array(5)].map((x, i) => {
        return (
          <>
            <StepIcon key={i}>{i+1}</StepIcon>

            {i != 4 ?
                <Divider key={i}></Divider> : null
            }
            
          </>
        );
      })}
    </StepperContainer>
  );
}
