import styled from "styled-components";
import { COLORS } from "../../util/Colors";
import { FONTSIZE } from "../../util/FontSizes";
import { GiPartyFlags } from "react-icons/gi";

const StatCardContainer = styled.div`
  width: 300px;
  background-color: ${COLORS["bg-white"]};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 50px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const DataSection = styled.div`
  flex: 2;
`;

const Title = styled.h6`
    
`;

const Value = styled.h6`
    color: red;
`

export function Statcard(props) {
  return (
    <StatCardContainer>
      <IconSection>
        <span>
          <GiPartyFlags />
        </span>
      </IconSection>
      <DataSection>
        <Title>Energie</Title> <br/>
        <Value>163</Value>
      </DataSection>
    </StatCardContainer>
  );
}
