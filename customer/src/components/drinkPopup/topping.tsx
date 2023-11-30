import "./drinkCustomize.scss";
// import { useState } from "react";

interface Props {
  index: number;
  name: string;
  count: number;
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  lowStock: boolean;
}

const Topping = ({
  name,
  count,
  onIncrement,
  onDecrement,
  index,
  lowStock,
}: Props) => {
  //const [count, setCount] = useState(0);

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
        <div className="topping-count">{!lowStock && count}</div>
      </div>
    </>
  );
};

export default Topping;
