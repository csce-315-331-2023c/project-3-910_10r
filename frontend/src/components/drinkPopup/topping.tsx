import "./drinkCustomize.scss";
// import { useState } from "react";

interface Props {
  name: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Topping = ({ name, count, setCount }: Props) => {
  //const [count, setCount] = useState(0);

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    count - 1 >= 0 ? setCount(count - 1) : setCount(0);
  };

  return (
    <>
      <div>
        <div className="topping">
          <div className="topping-name">{name}</div>
          <button className="topping-button" onClick={handlePlus}>
            +
          </button>
          <button className="topping-button" onClick={handleMinus}>
            -
          </button>
        </div>
        <div className="topping-count">{count}</div>
      </div>
    </>
  );
};

export default Topping;
