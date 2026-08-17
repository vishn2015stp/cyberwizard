import React, { useState } from 'react';
import { commandCategories, commandsList } from '../data/commandsData';
import { Terminal, Copy, Check, Search, Monitor, Shield, HardDrive, Network } from 'lucide-react';

export default function CommandCheatsheet() {
  const [selectedOS, setSelectedOS] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (cmd, id) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCommands = commandsList.filter((item) => {
    const matchesOS = selectedOS === 'All' || item.os.includes(selectedOS);
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOS && matchesCat && matchesSearch;
  });

  return (
    <section>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Terminal className="text-cyan" size={28} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Technician <span className="text-cyan">CLI Cheatsheet</span></h2>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>
          Essential Windows CMD/PowerShell and Linux terminal commands for quick troubleshooting, network diagnosis, and system repairs.
        </p>
      </div>

      {/* Control Bar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* OS Switcher Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>OS:</span>
            {['All', 'Windows', 'Linux'].map((osName) => (
              <button
                key={osName}
                onClick={() => setSelectedOS(osName)}
                className={`btn btn-sm ${selectedOS === osName ? 'btn-primary' : 'btn-outline'}`}
              >
                {osName}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {commandCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-secondary' : 'btn-outline'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ minWidth: '240px', flex: 1, maxWidth: '300px' }}>
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input 
                type="text"
                className="search-input"
                placeholder="Search commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '0.5rem 1rem 0.5rem 2.5rem', fontSize: '0.88rem' }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Commands List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredCommands.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <Terminal size={40} className="text-cyan" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.2rem' }}>No Commands Found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try broadening your search term or changing the OS filter.</p>
          </div>
        ) : (
          filteredCommands.map((item) => (
            <div key={item.id} className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{item.title}</span>
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{item.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{item.os}</span>
                  <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{item.category}</span>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="code-block">
                <div className="code-header">
                  <span>Terminal Command</span>
                  <button 
                    onClick={() => handleCopy(item.command, item.id)}
                    className="btn btn-sm btn-outline"
                    style={{ padding: '0.2rem 0.6rem', fontSize: '0.78rem' }}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check size={14} className="text-green" />
                        <span className="text-green">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre style={{ margin: 0, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                  <code>{item.command}</code>
                </pre>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
