import React from 'react'
import './landing.scss'; // Import the CSS file

interface Props {
    setMenuPage: React.Dispatch<React.SetStateAction<boolean>>;
}
function MenuBoardButton({setMenuPage}: Props) {
    const navigateToMenuPage = () => {
        setMenuPage(true)
    }

  return (
    <button className = "menu-button" onClick={navigateToMenuPage}>
    </button>
  );
};

export default MenuBoardButton;