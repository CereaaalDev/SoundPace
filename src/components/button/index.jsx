import styled from "styled-components";
import { COLORS } from "../../util/Colors";

const Button = styled.button`
  text-align: center;
  padding: 0.75rem 1.5rem;
  background-color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};
  color: ${COLORS["text-white"]};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease-in;

  :hover{
    border-color: ${COLORS["primary-light"]};
    background-color: ${COLORS["primary-light"]};
    transform: translateY(-1px);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${COLORS.primary};
  border: 2px solid ${COLORS.primary};
  backdrop-filter: blur(10px);

  :hover{
    /* background-color: ${COLORS["secondary-light"]}; */
    background-color: transparent;
  }


`;

export function CustomButton(props) {

  return props.type == "secondary" ? (
    <SecondaryButton onClick={props.onClick}> { props.children} </SecondaryButton>
  ) : (
    <Button onClick={props.onClick}> {props.children} </Button>
  );
}