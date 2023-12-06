interface Props {
  price: string;
  tax: string;
  total: string;
}

const checkoutAmount = ({ price, tax, total }: Props) => {
  return (
    <>
      <div className="checkout">
        <div className="checkout-title">Amount: </div>
        <div className="numbas">{price}</div>
        <div className="checkout-title">Tax: </div>
        <div className="numbas">{tax}</div>
        <div className="checkout-title checkout-title-total">Total: </div>
        <div className="checkout-price">{total}</div>
      </div>
    </>
  );
};

export default checkoutAmount;
