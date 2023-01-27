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
  margin: 5px;

  :hover{
    border-color: ${COLORS["primary-light"]};
    background-color: ${COLORS["primary-light"]};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${COLORS.primary};
  border: 2px solid ${COLORS.primary};
  backdrop-filter: blur(10px);

  :hover{
    background-color: ${COLORS["secondary-light"]};
  }


`;

export function CustomButton(props) {

  return props.type == "secondary" ? (
    <SecondaryButton onClick={props.onClick}> { props.children} </SecondaryButton>
  ) : (
    <Button onClick={props.onClick}> {props.children} </Button>
  );
}
