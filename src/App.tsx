import { useState } from "react";
import "./style/App.scss";

interface LengthWeakness {
  message?: string;
  deduction?: number;
}

function App() {
  const [weakness, setWeakness] = useState<LengthWeakness>({});
  const [weaknesses, setWeaknesses] = useState<LengthWeakness[]>([]);

  const calculatePasswordStrength = (password: string): LengthWeakness[] => {
    setWeaknesses([...weaknesses, lengthWeakness(password)]);
    return weaknesses;
  };

  const lengthWeakness = (password: string): LengthWeakness => {
    const length: number = password.length;
    if (length < 5) {
      setWeakness({ message: "Your password is too short", deduction: 40 });
      return weakness;
    }

    if (length < 10) {
      setWeakness({ message: "Your password could be longer", deduction: 15 });
      return weakness;
    } else {
      setWeakness({ message: "Your password is solid", deduction: 0 });
      return weakness;
    }
  };

  // const updateStrengthMeter = () => {};

  const handleInput = (e: any) => {
    calculatePasswordStrength(e.target.value);
    console.log(weaknesses);
  };

  return (
    <div className="container">
      <h1 className="header">Password Strength Test</h1>
      <div className="strengh-meter"></div>
      <input
        type="text"
        id="input-password"
        className="input-password"
        autoFocus
        aria-labelledby="password"
        placeholder="password"
        onInput={handleInput}
      />
      <div id="reasons" className="reasons"></div>
    </div>
  );
}

export default App;
