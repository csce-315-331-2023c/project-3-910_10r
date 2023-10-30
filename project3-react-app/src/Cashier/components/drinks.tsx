import Drink from "./drink.tsx";
import "../styles/drinksMainSection.scss";

function drinks() {
  let drinkNames = [
    "Classic milk tea",
    "Honey milk tea",
    "Matcha milk tea",
    "Fresh milk tea",
    "Fresh honey milk tea",
    "Fresh matcha milk tea",
  ];
  return (
    <main className="drinks-grid">
      {drinkNames.map((item, index) => (
        <Drink key={item}>{item}</Drink>
      ))}
    </main>
  );
}

export default drinks;
