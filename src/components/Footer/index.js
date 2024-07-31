import React from 'react';
import githubIcon from "../../images/github-mark-white.svg";
import './index.css';

const Index = () => (
    <footer className="footer">
        <div className="social-links">
            <a href="https://github.com/kerembeyazit" className="social-link">
                <img width={16} src={githubIcon} alt="" />
                <span>kerembeyazit</span>
            </a>
            <a href="https://github.com/savasozcan" className="social-link">
                <img width={16} src={githubIcon} alt="" />
                <span>savasozcan</span>
            </a>
        </div>
        <div className="meteo">
            Veri kaynağı: <a href="https://open-meteo.com" className="source-link"><strong> OpenMeteo</strong></a>
        </div>
    </footer>
);

export default Index;
