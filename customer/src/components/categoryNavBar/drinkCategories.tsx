import "./drinkNavbar.scss";

interface Props {
  children: string;
  onClick: () => void;
}

/**
 * button for one drink category
 * @param {string} Props.children
 * @param {function} Props.onClick
 */
const drinkCategories = ({ children, onClick }: Props) => {
  return (
    <button className="nav-category" onClick={onClick}>
      {children}
    </button>
  );
};

export default drinkCategories;
