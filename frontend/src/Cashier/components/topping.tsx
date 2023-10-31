import "../styles/drinkCustomize.scss";

interface Props {
  name: string;
  count: number;
}

const Topping = ({ name, count }: Props) => {
  return (
    <>
      <div>
        <div className="topping">
          <div className="topping-name">{name}</div>
          <button className="topping-button">+</button>
          <button className="topping-button">-</button>
        </div>
        <div className="topping-count">{count}</div>
      </div>
    </>
  );
};

export default Topping;
