// import React, { useState } from "react";
// import translateText from "./translate.tsx";

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [targetLanguage, setTargetLanguage] = useState("es"); // Default: Spanish
//   const [translatedText, setTranslatedText] = useState<string>("");

//   const handleTranslate = async () => {
//     if (inputText) {
//       setTranslatedText(await translateText(inputText, targetLanguage));
//       // Do something with the translatedText, e.g., display it on the page.
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={inputText}
//         onChange={(e) => setInputText(e.target.value)}
//       />
//       <select
//         value={targetLanguage}
//         onChange={(e) => setTargetLanguage(e.target.value)}
//       >
//         <option value="es">Spanish</option>
//         <option value="fr">French</option>
//         {/* Add more language options */}
//       </select>
//       <button onClick={handleTranslate}>Translate</button>
//       <p>{translatedText}</p>
//     </div>
//   );
// }

// export default App;
