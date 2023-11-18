// IntroPage.jsx
import './landing.scss'; // Import the CSS file
import CustomerHeader from "../../components/header/header.tsx";
import { Carousel } from '../../components/carousel/Carousel.tsx';
import {slides} from "../../assets/carouselData.json";

function IntroPage() {
  return (
    <div className="intro-page">
        <CustomerHeader></CustomerHeader>
      <div className="customer-header">
        <div className="intro-grid-main">
        
          <h1>Welcome!</h1>
          <p>Discover a world of flavors with our delicious boba tea drinks.</p>
          {/* Your buttons or additional content can go here */}
        </div>
        <div>
            <Carousel data = {{slides}}/>
            <button>Ready to order?</button>
        </div>
      </div>
      
    </div>
  );
}

export default IntroPage;
