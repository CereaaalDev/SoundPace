import styled from "styled-components"
import { COLORS } from "/src/util/Colors"

const Button = styled.button`

    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem;
    border: none;
    background: none;
    :hover{
        color: ${COLORS.primary};
    }
`

const Icon = styled.span`
    font-size: 20px;
`

export function IconButton (props) {
    return(
        <Button onClick={props.onClick}>
            <Icon>{props.icon}</Icon>
            <span>{props.children}</span>
        </Button>
    )
}