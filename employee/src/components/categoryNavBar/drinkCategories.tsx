// interface Props {
//   items: string[];
// }

// function drinkCategories({ items }: Props) {
//   //Hook
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   //arr[0] - selectedIndex: variable
//   //arr[1] - setSelectedIndex: updater function

//   return (
//     <>
//       {items.length === 0 && <p>No drink category found</p>}
//       <ul className="list-group">
//         {items.map((item, index) => (
//           <li
//             className={
//               selectedIndex === index
//                 ? "list-group-item active"
//                 : "list-group-item"
//             }
//             key={item}
//             onClick={() => {
//               setSelectedIndex(index);
//             }}
//           >
//             {item}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }
import "./drinkNavbar.scss";

interface Props {
  children: string;
  onClick: () => void;
  index: number;
}

const drinkCategories = ({ children, onClick, index }: Props) => {
  const ClassName = `nav-category nav-category-${index}`;
  return (
    <button className={ClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default drinkCategories;
