import React, { useState } from 'react';
import { 
  Wand2, 
  BookOpen, 
  Download, 
  Terminal, 
  Stethoscope, 
  HelpCircle, 
  Menu, 
  X,
  Github
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'fundamentals', label: 'Fundamentals', icon: BookOpen },
    { id: 'software', label: 'Software Hub', icon: Download },
    { id: 'commands', label: 'CLI Commands', icon: Terminal },
    { id: 'wizard', label: 'Diagnostics', icon: Stethoscope },
    { id: 'quiz', label: 'Tech Quiz', icon: HelpCircle }
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

            <li>
              <a 
                href="https://github.com/vishn2015stp/cyberwizard.git" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline btn-sm"
                style={{ marginLeft: '0.5rem' }}
              >
                <Github size={16} />
                <span>GitHub Repo</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
