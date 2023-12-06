import "./managerNavBar.scss";

interface Props {
  children: string;
  onClick: () => void;
}

  /**
 * Manager categories component
 * @param {string} children Children string
 * @param {function} onClick to show when clicked
 */
const managerCategories = ({ children, onClick }: Props) => {
  return (
    <button className="nav-category" onClick={onClick}>
      {children}
    </button>
  );
};

export default managerCategories;