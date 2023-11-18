// IntroPage.jsx
import './landing.scss'; // Import the CSS file

function IntroPage() {
  return (
    <div className="intro-page">
        <img
            className="header-image"
            src="../../src/assets/drinkImgs/logo.png" // Replace with the actual path to your image
            alt="Boba Tea Image"
          />
      <div className="customer-header">
        <div className="intro-grid-main">
        
          <h1>Welcome!</h1>
          <p>Discover a world of flavors with our delicious boba tea drinks.</p>
          {/* Your buttons or additional content can go here */}
        </div>
        <div>
            <button>Ready to order?</button>
        </div>
      </div>
      
    </div>
  );
}

export default IntroPage;
