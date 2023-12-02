import React, { useEffect } from "react";

const GoogleTranslate = () => {
  interface window {
    google: {
      translate: {
        TranslateElement: new (
          params: { pageLanguage: string },
          elementId: string
        ) => void;
      };
      translateElementInit: () => void;
    };
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        { pageLanguage: "en" },

        "google_translate_element"
      );
    }

    return () => {
      // Cleanup script and event listener when component unmounts
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
