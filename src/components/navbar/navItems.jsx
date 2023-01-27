import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../util/Colors";

const ListContainer = styled.ul`
  display: flex;
  list-style: none;
`;
const NavLink = styled(Link)`
  margin-left: 1rem;
  text-decoration: none;
  color: ${COLORS["text-dark"]};
  cursor: pointer;
  text-decoration: none;
  :hover {
    color: ${COLORS.primary};
  }
`;

export function NavItems() {
  const { loggedIn } = useSelector((state) => state.auth);

  return (
    <ListContainer>
      {loggedIn ? (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/pacecreator">PaceCreator</NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/dashboard">Keine Navigation möglich</NavLink>
        </li>
      )}
    </ListContainer>
  );
}
