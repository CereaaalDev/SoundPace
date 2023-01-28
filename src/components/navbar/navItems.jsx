import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../util/Colors";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { CustomButton } from "../button";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const ListContainer = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  flex: 2;
  @media (max-width: 768px) {
    display: none;
  }
`;
const NavLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS["text-dark"]};
  cursor: pointer;
  text-decoration: none;
  :hover {
    color: ${COLORS.primary};
  }
  &.active{
    text-decoration: underline;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuContainer = styled.div`
  position: absolute;
  top: 60px;
  width: 100vw;
  margin-left: -5vw;
  background-color: ${COLORS["bg-grey"]};
`;

const MobileNavList = styled.ul`
  align-items: center;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0;
`;

export function NavItems() {
  const { loggedIn } = useSelector((state) => state.auth);
  const [showMenu, toggleMenu] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {loggedIn ? (
        <ListContainer>
          <li>
            <NavLink to="/dashboard" >Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/pacecreator">PaceCreator</NavLink>
          </li>
          <li>
            <CustomButton
              type="secondary"
              onClick={() => {
                toggleMenu(false);
                dispatch(logout());
              }}
            >
              Logout
            </CustomButton>
          </li>
          <li></li>
        </ListContainer>
      ) : (
        <ListContainer>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ListContainer>
      )}

      <Hamburger onClick={() => toggleMenu(!showMenu)}>
        {showMenu ? <ImCross /> : <FaBars />}
      </Hamburger>
      {showMenu ? (
        <MobileMenuContainer>
          {loggedIn ? (
            <MobileNavList>
              <li>
                <NavLink onClick={() => toggleMenu(false)} to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleMenu(false)} to="/pacecreator">
                  PaceCreator
                </NavLink>
              </li>
              <li>
              <CustomButton
              type="secondary"
              onClick={() => {
                toggleMenu(false);
                dispatch(logout());
              }}
            >
              Logout
            </CustomButton>
              </li>
            </MobileNavList>
          ) : (
            <MobileNavList>
              <li>
                <NavLink onClick={() => toggleMenu(false)} to="/">
                  Home
                </NavLink>
              </li>
            </MobileNavList>
          )}
        </MobileMenuContainer>
      ) : (
        <></>
      )}
    </>
  );
}
