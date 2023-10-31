import DrinkCategory from "./drinkCategories";
import "../styles/drinkNavbar.scss";

interface Props {
  showCustomizationPage: boolean;
}

function Navigationbar({ showCustomizationPage }: Props) {
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
    <div className={`${showCustomizationPage ? "nav-selected" : "nav"}`}>
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
