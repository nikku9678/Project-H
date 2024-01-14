import React, { useState } from 'react';
import './Refresh.css';
import loading from "../../assets/loading.png";

function Refresh() {
  const [show, setShow] = useState(false);

  const reloadPageWithRotation = () => {
    // Add the circular rotation effect by adding the 'rotate' class
    document.querySelector('.img').classList.add('rotate');

    // Reload the page after 1 second (to complete the rotation effect)
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className='refresh'>
      <div className="refresh-btn">
        <button
          onClick={reloadPageWithRotation}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <img className='img' src={loading} alt='Loading' />
        </button>
      </div>
      <div className="content">
        {show ? <span>Click to reload</span> : ""}
      </div>
    </div>
  );
}

export default Refresh;
