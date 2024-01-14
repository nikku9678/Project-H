import React, { useState } from 'react';
import './Popup.css';

const Popup = (title, content) => {
   const [isOpen, setIsOpen] = useState(true);

   const togglePopup = () => {
      setIsOpen(false);
   };

   return (
      <div>
      {isOpen && (
            <div className="popup">
               <div className="popup-content">
                  <h3>dddf</h3>
                  <p>ffff</p>
                  <button onClick={togglePopup}>Close</button>
               </div>
            </div>
         )}
      </div>
   );
};

export default Popup;
