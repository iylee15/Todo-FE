import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className='Header'>
            <h3>나의 Plan🎃</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};

export default Header;