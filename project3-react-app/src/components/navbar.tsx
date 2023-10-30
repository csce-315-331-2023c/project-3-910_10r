import DrinkCategory from "./drinkCategories";
import "../styles/navbar.scss";

function Navigationbar() {
  let items = [
    "Milk Tea",
    "Fruit Tea",
    "Fresh Milk",
    "Tea",
    "Mojito",
    "Ice Blended",
    "Creama",
  ];

  return (
    <div className="navvvv">
      <div className="navvvv-bar">
        {items.map((item, index) => (
          <DrinkCategory key={item} onClick={() => console.log({ item })}>
            {item}
          </DrinkCategory>
        ))}
      </div>
    </div>
  );
}

export default Navigationbar;
