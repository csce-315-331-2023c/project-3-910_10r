import "../styles/cart.scss";

interface Props {
  name: string;
  ice: string;
  sugar: string;
  topping: string[];
  price: string;
  onRemove: () => void;
}

const order = ({ name, ice, sugar, topping, price, onRemove }: Props) => {
  return (
    <>
      <div className="order">
        <div className="order-text">
          <p className="order-text-title">{name}</p>
          <p>{ice}</p>
          <p>{sugar}</p>
          <div>
            {topping.map((topping) => (
              <div key={topping}>{topping}</div>
            ))}
          </div>
        </div>
        <div className="order-price">{price}</div>
        <button className="order-cancel" onClick={onRemove}>
          X
        </button>
      </div>
    </>
  );
};

export default order;
