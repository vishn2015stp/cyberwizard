import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fundamentals from './components/Fundamentals';
import SoftwareHub from './components/SoftwareHub';
import CommandCheatsheet from './components/CommandCheatsheet';
import DiagnosticWizard from './components/DiagnosticWizard';
import Quiz from './components/Quiz';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('fundamentals');

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <Hero setActiveTab={setActiveTab} />

        {activeTab === 'fundamentals' && <Fundamentals />}
        {activeTab === 'software' && <SoftwareHub />}
        {activeTab === 'commands' && <CommandCheatsheet />}
        {activeTab === 'wizard' && <DiagnosticWizard setActiveTab={setActiveTab} />}
        {activeTab === 'quiz' && <Quiz />}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
