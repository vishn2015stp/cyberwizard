import React, { useState } from 'react';
import { softwareCategories, softwareList } from '../data/softwareData';
import { 
  Download, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  HardDrive, 
  Network, 
  Terminal, 
  Monitor, 
  Usb, 
  Archive, 
  Code, 
  PlayCircle 
} from 'lucide-react';

const iconMap = {
  Cpu, Activity, HardDrive, Network, Terminal, Monitor, Usb, Archive, Code, PlayCircle
};

export default function SoftwareHub() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSoftware = softwareList.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Download className="text-purple" size={28} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Software <span className="text-purple">Download Hub</span></h2>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>
          Curated essential utilities, diagnostics, network analyzers, and productivity tools for computer technicians and IT students.
        </p>
      </div>

      {/* Controls Bar: Category Filters & Search */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justify: 'space-between',
        marginBottom: '2rem'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {softwareCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div style={{ maxWidth: '320px', width: '100%' }}>
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input 
              type="text"
              className="search-input"
              placeholder="Search software by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Software Cards Grid */}
      {filteredSoftware.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <ShieldCheck size={48} className="text-purple" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Software Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search query or switching categories.</p>
        </div>
      ) : (
        <div className="grid-2">
          {filteredSoftware.map((item) => {
            const Icon = iconMap[item.icon] || Download;
            return (
              <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(168, 85, 247, 0.12)',
                        color: 'var(--purple)',
                        border: '1px solid var(--border-purple)'
                      }}>
                        <Icon size={26} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.name}</h3>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.version}</span>
                      </div>
                    </div>

                    <span className="badge badge-purple">{item.license}</span>
                  </div>

                  <div style={{ fontWeight: 600, color: 'var(--cyan)', fontSize: '0.92rem', marginBottom: '0.5rem' }}>
                    {item.tagline}
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* OS Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginRight: '0.2rem' }}>Supported OS:</span>
                    {item.os.map((osName, idx) => (
                      <span key={idx} className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                        {osName}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a 
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <Download size={15} />
                      <span>Official Download</span>
                    </a>
                    <a 
                      href={item.officialSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      title="Visit Official Website"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
