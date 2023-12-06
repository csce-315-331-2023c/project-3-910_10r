import "./managerNavBar.scss";

interface Props {
  children: string;
  onClick: () => void;
}

/**
 * represent a category in manager nav bar
 * @param {string} Props.children
 * @param {function} Props.onClick
 */
const managerCategories = ({ children, onClick }: Props) => {
  return (
    <button className="nav-category" onClick={onClick}>
      {children}
    </button>
  );
};

export default managerCategories;
