import React, { useState } from 'react';
import { 
  Wand2, 
  BookOpen, 
  Download, 
  Terminal, 
  Stethoscope, 
  HelpCircle, 
  Gamepad2,
  Menu, 
  X
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'fundamentals', label: 'Fundamentals', icon: BookOpen },
    { id: 'software', label: 'Software Hub', icon: Download },
    { id: 'commands', label: 'CLI Commands', icon: Terminal },
    { id: 'wizard', label: 'Diagnostics', icon: Stethoscope },
    { id: 'quiz', label: 'Tech Quiz', icon: HelpCircle },
    { id: 'games', label: 'Web Games', icon: Gamepad2 }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <a href="#home" onClick={() => handleTabClick('fundamentals')} className="logo">
          <div className="logo-icon">
            <Wand2 size={22} />
          </div>
          <span>Cyber <span className="text-cyan glow-cyan">Wizard</span></span>
        </a>

        <button 
          className="mobile-nav-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button 
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabClick(item.id)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}


          </ul>
        </nav>
      </div>
    </header>
  );
}
