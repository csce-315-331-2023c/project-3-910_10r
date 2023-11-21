// Button.tsx
import React from 'react';
import "./header.scss";
interface Props {
    setWhichPage: React.Dispatch<React.SetStateAction<boolean>>;
  }
function IntroButton({setWhichPage}: Props) {

  const navigateHome = () => {
    setWhichPage(false);

  };

  return (
    <button className = "home-button" onClick={navigateHome}>
      Home
    </button>
  );
};

export default IntroButton;
