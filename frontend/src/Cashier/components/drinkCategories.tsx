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
import "../styles/drinkNavbar.scss";

interface Props {
  children: string;
  onClick: () => void;
}

const drinkCategories = ({ children, onClick }: Props) => {
  return (
    <button className="nav-category" onClick={onClick}>
      {children}
    </button>
  );
};

export default drinkCategories;
