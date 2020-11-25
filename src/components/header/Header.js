import React, { useState } from 'react';
import 'animate.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="lg-container">
        <div className="header-parent">
          <div>
            <h2 className="header-title">1. Todo App</h2>
          </div>
          <div>
            <button onClick={() => setIsOpen(prevState => !prevState)}>
              <span>
                <i className="logo react fab fa-react"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        style={isOpen ? { display: 'block' } : { display: 'none' }}
        onClick={() => setIsOpen(false)}
        className="mobile-bg"
      ></div>
      <div
        style={isOpen ? { display: 'flex' } : { display: 'none' }}
        className="mobile-nav animate__animated animate__fadeInRight animate__faster"
      >
        <div className="lg-container">
          <h2 className="mobile-nav-title">
            100 <span>React</span> projects <br /> in 100 days challenge!
          </h2>
          <h3>1. Todo App</h3>
          <h3>
            <a
              className="mobile-nav-link"
              href="https://www.ramzibach.com/"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </h3>
          <h3>
            <a
              className="mobile-nav-link"
              href="https://github.com/RamziBach"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </h3>
          <h3>
            <a
              className="mobile-nav-link"
              href="https://codepen.io/ramzibach-the-styleful"
              target="_blank"
              rel="noreferrer"
            >
              Codepen
            </a>
          </h3>
          <h3 className="mobile-nav-signature">- Ramzi Bach</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
