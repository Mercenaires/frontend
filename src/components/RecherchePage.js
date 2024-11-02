
import React, { useState } from 'react';
import '../assets/css/main.css'; 

function RecherchePage() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    alert(`Vous avez mis : ${inputValue}`);
  };

  return (
    <div className="text-input-container">
      <h1>Entrez votre texte</h1>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        placeholder="Tapez quelque chose ici..." 
      />
      <button onClick={handleButtonClick}>Afficher le texte</button>
    </div>
  );
}

export default TextInput;
