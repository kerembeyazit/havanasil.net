import React from 'react';
import './index.css';

const SunAnimation = () => (
    <div className="landscape">
        <svg className="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 374.5">
            <circle className="sun-circle" cx="187.5" cy="187" r="77" fill="gold" />
            <path
                className="sun-rays"
                fill="none"
                stroke="gold"
                strokeMiterlimit="0"
                strokeWidth="10"
                d="M187.5 100V0M187.5 374.5v-100M275 187h100M0 187h100M252.1 121.4l70.7-70.7M52.1 326.6l70.7-70.7M122.5 122L51.8 51.3M323.5 323l-70.7-70.7"
            />
        </svg>
    </div>
);

export default SunAnimation;
