import styled from "styled-components";


const BackgroundContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 5s ease-in;
  backdrop-filter: blur(10px);
`;

export function LoadingOverlay () {
    return (
        <BackgroundContainer>
            <h1>Logge dich im neuen Fenster ein...</h1>
        </BackgroundContainer>
    )
}