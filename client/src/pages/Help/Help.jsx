import React from 'react'
import './Help.css'
import Navbar from '../../components/navbar/Navbar'
import img from './help.jpg'
function Help() {
  return (
    <div>
        <Navbar/>
      <div className="help">
        <div className="help-first">
            <h2>
                We are here to help!
            </h2>
            <input type="text" placeholder="Search"/>
        </div>
        <div className="help-second">
            <div className="help-card">
                <img src={img} width="200px" align="center" alt=""/>
                <h2>Email Support</h2>
                <p>healerji.company@gmail.com</p>

            </div>
           
            <div className="help-card">
                <img src={img} width="200px" alt=""/>
                <h2>Phone Support</h2>
                <p>+91 7644887997</p>

            </div>
            
            
        </div>
    </div>
    </div>
  )
}

export default Help
