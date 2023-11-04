import ManagerCategory from "./managerCategories";
import "./managerNavBar.scss";

interface Props {
  showCustomizationPage: boolean;
  setCatogory: React.Dispatch<React.SetStateAction<string>>;
  category: string[];
}

function Navigationbar({
  showCustomizationPage,
  setCatogory,
  category,
}: Props) {
  // keeps track of the drink categories
  //

  return (
    <div className={`${showCustomizationPage ? "nav-selected" : "nav"}`}>
      <div className="nav-bar">
        {category.map((item) => (
          <ManagerCategory key={item} onClick={() => setCatogory(item)}>
            {item}
          </ManagerCategory>
        ))}
      </div>
    </div>
  );
}

export default Navigationbar;