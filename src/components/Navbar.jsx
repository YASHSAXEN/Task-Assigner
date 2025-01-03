import React, { useContext } from 'react';
import './Navbar.css';
import { authcontext } from '../store/ContextProvider';

const Navbar = () => {
    const context_value = useContext(authcontext);
  return (
    <div className="main-container-navbar">
        <div className="upper-conatiner-navbar">
            <p className='hello'>Hello</p>
        </div>
        <div className="lower-conatiner-navbar">
            <div className="lower-div-first">
                <p>{context_value.session.username}</p> 
                <img src="../src/assets/wavyhand.webp" alt="" width='90px' height='60px' className='nav-img'/>
            </div>
            { context_value.session.value === 'admin' && <h1>Admin Panel</h1>}
            <div className="lower-div-second">
                <button className='logout' onClick={() => context_value.changeSessionOnLogout({username:null,value:null})}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar