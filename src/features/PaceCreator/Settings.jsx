import { useState } from "react";

export function Settings() {
  const [minSpeed, setMinSpeed] = useState(90);
  const [maxSpeed, setMaxSpeed] = useState(160);

  return (
    <>
      <h1>Hier kommen die Einstellungen</h1>
      <label>MinSpeed</label>
      <input type="text" onChange={(e)=>setMinSpeed(e.target.value)} />
      <label>MaxSpeed</label>
      <input type="text" onChange={(e) => setMaxSpeed(e.target.value)} />

      <h6>Min: {minSpeed} / Max: {maxSpeed}</h6>
    </>
  );
}
