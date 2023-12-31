import "./drinkCustomize.scss";
// import { useState } from "react";

interface Props {
  index: number;
  name: string;
  count: number;
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  lowStock: boolean;
  // setCount: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Topping Component
 * @param {number} props.index Index of topping
 * @param {string} props.name Name
 * @param {number} props.count Count of topping
 * @param {function} props.onIncrement Function to increment
 * @param {function} props.onDecrement Function to decrement
 * @param {boolean} props.lowStock Boolean for if low
 */
const Topping = ({
  name,
  count,
  onIncrement,
  onDecrement,
  index,
  lowStock,
}: Props) => {
  //const [count, setCount] = useState(0);

  // const handlePlus = () => {
  //   setCount(count + 1);
  // };

  // const handleMinus = () => {
  //   count - 1 >= 0 ? setCount(count - 1) : setCount(0);
  // };
  return (
    <>
      <div>
        <div className={`${lowStock ? "topping-unavailable" : "topping"}`}>
          <div className="topping-name">{name}</div>
          <button
            className={`${
              lowStock ? "topping-button-unavailable" : "topping-button"
            }`}
            onClick={() => onIncrement(index)}
            disabled={lowStock}
          >
            +
          </button>
          <button
            className={`${
              lowStock ? "topping-button-unavailable" : "topping-button"
            }`}
            onClick={() => onDecrement(index)}
            disabled={lowStock}
          >
            -
          </button>
        </div>
        <div className="topping-count">{count}</div>
      </div>
    </>
  );
};

export default Topping;
