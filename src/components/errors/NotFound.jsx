import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import { CustomButton } from "/src/components/button";

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
`;

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate()
  console.error(error);

  return (
    <ErrorContainer>
      <div>
        
        <h1>Ooops... </h1>

        <p>Da ging was schief   :(</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <CustomButton onClick={()=>navigate('/')}>Home</CustomButton>
      </div>
    </ErrorContainer>
  );
}
