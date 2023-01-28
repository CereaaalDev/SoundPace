import styled from "styled-components";
import { COLORS } from "../../util/Colors";
import {GiPartyFlags} from 'react-icons/gi'

const StatCardContainer = styled.div`
    width: 300px;
    background-color: ${COLORS["bg-white"]};
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const IconSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        font-size: 50px;
    }

    @media (max-width: 768px){
        display: none;
    }
`

const DataSection = styled.div`
    flex: 2;

`





export function Statcard(props){
    return(
        <StatCardContainer>
            <IconSection>
            <span><GiPartyFlags/></span>
            </IconSection>
            <DataSection>
            <h3>Energie</h3>
            <h1>163%</h1>

            </DataSection>
        </StatCardContainer>

    )
}