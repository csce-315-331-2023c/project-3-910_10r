// Button.tsx
import React from "react";
import "./header.scss";
interface Props {
  setWhichPage1: React.Dispatch<React.SetStateAction<boolean>>;
  setWhichPage2: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * button that returns to home page
 * @param {React.Dispatch<React.SetStateAction<boolean>>} Props.setWhichPage1
 * @param {React.Dispatch<React.SetStateAction<boolean>>} Props.setWhichPage2
 */
function IntroButton({ setWhichPage1, setWhichPage2 }: Props) {
  const navigateHome = () => {
    setWhichPage1(false);
    setWhichPage2(false);
  };

  return (
    <button className="home-button" onClick={navigateHome}>
      Home
    </button>
  );
}

export default IntroButton;
