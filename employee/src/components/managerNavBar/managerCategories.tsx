import "./managerNavBar.scss";

interface Props {
  children: string;
  onClick: () => void;
}

const managerCategories = ({ children, onClick }: Props) => {
  return (
    <button className="nav-category" onClick={onClick}>
      {children}
    </button>
  );
};

export default managerCategories;