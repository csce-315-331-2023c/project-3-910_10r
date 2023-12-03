import { useEffect, useRef } from "react";
import "./footer.scss";

declare const window: any;

const GoogleTranslate = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!scriptLoaded.current) {
      scriptLoaded.current = true;
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en" },
            "google_translate_element"
          );
        };
      };

      return () => {
        // Cleanup script and event listener when component unmounts
        document.body.removeChild(script);
        delete window.googleTranslateElementInit;
      };
    }
  }, [scriptLoaded]);

  return <div id="google_translate_element" className="google-translate"></div>;
};

export default GoogleTranslate;
