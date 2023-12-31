// IntroPage.jsx
import "./landing.scss"; // Import the CSS file
import CustomerHeader from "../../components/header/header.tsx";
import { Carousel } from "../../components/carousel/Carousel.tsx";
import { slides } from "../../assets/carouselData.json";
import OrderButton from "./orderButton.tsx";
import MenuBoardButton from "./menuBoardButton.tsx";
interface IntroPageProps {
  isReadyToOrder: React.Dispatch<React.SetStateAction<boolean>>;
  isLookingAtMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * intro page for customer function
 * @param {function} IntroPageProps.isReadyToOrder
 * @param {function} IntroPageProps.isLookingAtMenu
 */
function IntroPage({ isReadyToOrder, isLookingAtMenu }: IntroPageProps) {
  return (
    <div className="intro-page">
      <CustomerHeader
        setOrderFalse={isReadyToOrder}
        setMenuFalse={isLookingAtMenu}
      ></CustomerHeader>
      <div className="customer-header">
        <div className="intro-grid-main">
          <h1 className="welcome-text">Welcome!</h1>
          <p className="intro-text">
            Discover a world of flavors with our delicious boba tea drinks.
          </p>
          {/* Your buttons or additional content can go here */}
        </div>
        <div>
          <p className="menuParagraph">View Menu</p>
          <MenuBoardButton setMenuPage={isLookingAtMenu}></MenuBoardButton>
          <Carousel data={{ slides }} />
          <p className="adjusted-text orderParagraph">Ready to Order?</p>
          <OrderButton setOrderPage={isReadyToOrder}></OrderButton>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
