import { useRouteError } from "react-router-dom";

export default function LoginError() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="login-error-page">
      <h1>Das ist der Fehler falls ich nicht eingeloggt bin</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}