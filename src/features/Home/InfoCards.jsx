import styled from "styled-components"
import { COLORS } from "../../util/Colors"

const SectionContainer = styled.div`
    height: 200px;
    max-width: 100vw;
    width: 100vw;
    background-color: ${COLORS["bg-white"]};
`

export function InfoCards(){
    return <SectionContainer>
        <h1>Hier kommen die Daten</h1>
    </SectionContainer>
}