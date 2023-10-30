import "../styles/cart.scss";

interface Props {
  name: string;
  ice: string;
  sugar: string;
  topping: string;
  price: string;
}

const order = ({ name, ice, sugar, topping, price }: Props) => {
  return (
    <>
      <div className="order">
        <div className="order-text">
          <p className="order-text-title">{name}</p>
          <p>{ice}</p>
          <p>{sugar}</p>
          <p>{topping}</p>
        </div>
        <div className="order-price">{price}</div>
      </div>
    </>
  );
};

export default order;
