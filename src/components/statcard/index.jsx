import styled from "styled-components";
import { COLORS } from "/src/util/Colors";

const StatCardContainer = styled.div`
  background-color: ${COLORS["bg-white"]};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  gap: 1rem;
  padding: 1rem 1.5rem;
  transition: transform 0.5s ease-out;

  :hover{
    transform: scale(1.1);
  }
`;
const IconSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 50px;
  }
`;

const DataSection = styled.div`
  flex: 2;
`;

const Title = styled.h6`
  color: ${COLORS["text-light"]};
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  text-overflow:'...';
`;

const Value = styled.h6`
  font-size: 54px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0;
`;
const Unit = styled.span`
  font-size: 18px;
  color: ${COLORS["text-dark"]};
`;

export function Statcard(props) {
  return (
    <StatCardContainer>
      <IconSection>
        <span>
        {props.icon}
        </span>
      </IconSection>
      <DataSection>
        <Title>{props.title}</Title>
        <Value>
          {props.value}
          <Unit> {props.unit}</Unit>
        </Value>
      </DataSection>
    </StatCardContainer>
  );
}
