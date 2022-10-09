import React, { useEffect, useState } from "react";
import "./style/App.scss";

interface LengthWeakness {
  message: string;
  deduction: number;
}

function App() {
  const [inputPassword, setInputPassword] = useState<string>("");
  const [weaknesses, setWeaknesses] = useState<LengthWeakness[]>([
    { message: "Enter your password", deduction: 100 },
  ]);

  const lengthWeakness = (password: string) => {
    const length: number = password.length;
    if (length === 0) {
      setWeaknesses([{ message: "Enter your password", deduction: 100 }]);
    } else if (length < 5) {
      setWeaknesses([{ message: "Your password is too short", deduction: 40 }]);
    } else if (length < 10) {
      setWeaknesses([
        { message: "Your password could be longer", deduction: 15 },
      ]);
    } else {
      setWeaknesses([
        { message: "Your password length is good", deduction: 0 },
      ]);
    }
  };

  const characterTypeWeakness = (
    password: string,
    regex: RegExp,
    type: string
  ) => {
    const test = regex.test(password);
    if (!test) {
      setWeaknesses((weaknesses) => [
        ...weaknesses,
        {
          message: `Your password need at least one ${type}`,
          deduction: 10,
        },
      ]);
    }
  };

  const repeatedCharacterWeakness = (password: string) => {
    const regex = /(.)\1/;
    const test = regex.test(password);
    if (test) {
      setWeaknesses((weaknesses) => [
        ...weaknesses,
        {
          message: `Your password has repeated characters`,
          deduction: 20,
        },
      ]);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setInputPassword(passwordValue);
  };

  useEffect(() => {
    lengthWeakness(inputPassword);
    characterTypeWeakness(inputPassword, /[a-z]/, "lowercase");
    characterTypeWeakness(inputPassword, /[A-Z]/, "uppercase");
    characterTypeWeakness(inputPassword, /\d/, "number");
    characterTypeWeakness(inputPassword, /[^\w\s]/, "special character");
    repeatedCharacterWeakness(inputPassword);
  }, [inputPassword]);

  return (
    <div className="container">
      <h1 className="header">Password Strength Test</h1>
      <div className="strengh-meter">
        <div
          style={{
            width: `${
              100 - weaknesses.reduce((prev, curr) => prev + curr.deduction, 0)
            }%`,
          }}
          className="strength-meter-bar"
        ></div>
      </div>
      <input
        type="text"
        id="input-password"
        className="input-password"
        autoFocus
        aria-labelledby="password"
        placeholder="password"
        onChange={handleInput}
      />
      <div id="reasons" className="reasons">
        {weaknesses.map((weakness, index) => (
          <div key={`weakness ${index}`}>{weakness.message}</div>
        ))}
        <div style={{ fontWeight: "bold" }}>
          {weaknesses.length === 1 && "Your password is strong"}
        </div>
      </div>
    </div>
  );
}

export default App;
