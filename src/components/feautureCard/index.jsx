import styled from "styled-components";

const CardContainer = styled.div`
  padding: 1rem;
  max-width: 300px;
  text-align: center;
  flex: 1 0 300px;
`;

const Icon = styled.img`
    max-width: 20%;
`;

const Description = styled.p`

`
export function FeautureCard (props){
    return (
            <CardContainer>
                <Icon src={props.icon}/>
                <h3>{props.title}</h3>
                <Description>{props.description}</Description>
            </CardContainer>
    )
};