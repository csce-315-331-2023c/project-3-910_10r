import DrinkCategory from "./drinkCategories";
import "../styles/drinkNavbar.scss";

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
    <div className="nav">
      <div className="nav-bar">
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
