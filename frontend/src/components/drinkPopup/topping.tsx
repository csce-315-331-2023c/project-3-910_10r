import "./drinkCustomize.scss";
// import { useState } from "react";

interface Props {
  index: number;
  name: string;
  count: number;
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  // setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Topping = ({ name, count, onIncrement, onDecrement, index }: Props) => {
  //const [count, setCount] = useState(0);

  // const handlePlus = () => {
  //   setCount(count + 1);
  // };

  // const handleMinus = () => {
  //   count - 1 >= 0 ? setCount(count - 1) : setCount(0);
  // };
  console.log("index; " + index + " count " + count);
  return (
    <>
      <div>
        <div className="topping">
          <div className="topping-name">{name}</div>
          <button className="topping-button" onClick={() => onIncrement(index)}>
            +
          </button>
          <button className="topping-button" onClick={() => onDecrement(index)}>
            -
          </button>
        </div>
        <div className="topping-count">{count == undefined ? 0 : count}</div>
      </div>
    </>
  );
};

export default Topping;
