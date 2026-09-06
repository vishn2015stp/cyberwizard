import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fundamentals from './components/Fundamentals';
import SoftwareHub from './components/SoftwareHub';
import CommandCheatsheet from './components/CommandCheatsheet';
import DiagnosticWizard from './components/DiagnosticWizard';
import Quiz from './components/Quiz';
import WebGames from './components/WebGames';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('fundamentals');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'games') {
      document.title = 'Cyber Arcade | Free Online Web Games, 3D Racers & Retro Classics';
    } else {
      document.title = 'Cyber Wizard | Computer Fundamentals & Technician Toolkit';
    }
  }, [activeTab]);

  return (
    <div className="app-container">
      {/* Hide main site header completely when in standalone Web Games page */}
      {activeTab !== 'games' && <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />}
      
      <main className="main-content" style={{ padding: activeTab === 'games' ? '1rem 0.75rem 4rem 0.75rem' : undefined }}>
        {activeTab === 'fundamentals' && (
          <>
            <Hero setActiveTab={handleTabChange} />
            <Fundamentals />
          </>
        )}
        {activeTab === 'software' && <SoftwareHub />}
        {activeTab === 'commands' && <CommandCheatsheet />}
        {activeTab === 'wizard' && <DiagnosticWizard setActiveTab={handleTabChange} />}
        {activeTab === 'quiz' && <Quiz />}
        {activeTab === 'games' && <WebGames setActiveTab={handleTabChange} />}
      </main>

      {/* Hide main site footer on standalone gaming page */}
      {activeTab !== 'games' && <Footer setActiveTab={handleTabChange} />}
    </div>
  );
}
