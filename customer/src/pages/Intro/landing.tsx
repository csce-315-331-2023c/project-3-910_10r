// IntroPage.jsx
import './landing.scss'; // Import the CSS file
import CustomerHeader from "../../components/header/header.tsx";
import { Carousel } from '../../components/carousel/Carousel.tsx';
import {slides} from "../../assets/carouselData.json";
import OrderButton from './orderButton.tsx';

interface IntroPageProps {
  isReadyToOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setWhichPage : React.Dispatch<React.SetStateAction<boolean>>;
}
function IntroPage({isReadyToOrder, setWhichPage} : IntroPageProps) {
  return (
    <div className="intro-page">
        <CustomerHeader setWhichPage={setWhichPage}></CustomerHeader>
      <div className="customer-header">
        <div className="intro-grid-main">
        
          <h1>Welcome!</h1>
          <p>Discover a world of flavors with our delicious boba tea drinks.</p>
          {/* Your buttons or additional content can go here */}
        </div>
        <div>
            <Carousel data = {{slides}}/>
            <p className='orderParagraph'>Ready to Order?</p>
            <OrderButton  setOrderPage={isReadyToOrder}></OrderButton>
        </div>
      </div>
      
    </div>
  );
}

export default IntroPage;
