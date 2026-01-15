import React from 'react';
import { PackagesPage } from './pages/PackagesPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">CG Recruiting</h1>
          <div className="nav-links">
            <a href="#packages">Packages</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        <PackagesPage />
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2026 CG Recruiting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
