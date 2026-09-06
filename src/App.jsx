import React, { useState } from 'react';
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

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <main className="main-content">
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
        {activeTab === 'games' && <WebGames />}
      </main>

      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}
