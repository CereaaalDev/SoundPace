import { useEffect } from "react";

export default function Callback() {

//extrahiert die Parameter aus der URL
  const queryToObject = (query) => {
    const parameters = new URLSearchParams(query);
    return Object.fromEntries(parameters.entries());
  };

  useEffect(() => {
    const payload = queryToObject(window.location.search.split("?")[1]);
    window.opener.postMessage({
      type: "callbackmessage",
      payload: payload,
    });
  }, []);

  return <h2>Ja das kommt nach dem Login</h2>;
}
