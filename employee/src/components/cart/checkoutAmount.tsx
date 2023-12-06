interface Props {
  price: string;
  tax: string;
  total: string;
}

/**
 * Checkout amount component
 * @param {string} props.price Price before tax
 * @param {string} props.tax  Tax total
 * @param {string} props.total Price total after tax
 */
const checkoutAmount = ({ price, tax, total }: Props) => {
  return (
    <>
      <div className="checkout">
        <div className="checkout-title">Amount: </div>
        <div>{price}</div>
        <div className="checkout-title">Tax: </div>
        <div>{tax}</div>
        <div className="checkout-title checkout-title-total">Total: </div>
        <div className="checkout-price">{total}</div>
      </div>
    </>
  );
};

export default checkoutAmount;
