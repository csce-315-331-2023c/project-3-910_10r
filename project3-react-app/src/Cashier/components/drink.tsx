import "../styles/drinksMainSection.scss";

interface Props {
  children: string;
}

const drink = ({ children }: Props) => {
  return <button className="drinks-grid-drink">{children}</button>;
};

export default drink;
