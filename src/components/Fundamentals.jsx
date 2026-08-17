import React, { useState } from 'react';
import { 
  fundamentalsCategories, 
  fundamentalsContent 
} from '../data/fundamentalsData';
import { 
  Cpu, 
  HardDrive, 
  Globe, 
  ShieldCheck, 
  Server, 
  Layers, 
  FolderTree, 
  Power, 
  Network, 
  ShieldAlert, 
  CheckCircle2, 
  Lightbulb, 
  BookOpen 
} from 'lucide-react';

const iconMap = {
  Cpu, HardDrive, Globe, ShieldCheck, Server, Layers, FolderTree, Power, Network, ShieldAlert
};

export default function Fundamentals() {
  const [activeCategory, setActiveCategory] = useState('hardware');

  const currentItems = fundamentalsContent[activeCategory] || [];

  return (
    <section>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BookOpen className="text-cyan" size={28} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Computer <span className="text-cyan">Fundamentals</span></h2>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>
          Essential architectural principles, networking models, OS mechanics, and security standards for IT technicians & students.
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {fundamentalsCategories.map((cat) => {
          const IconComponent = iconMap[cat.icon] || BookOpen;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, minWidth: '180px', justifyContent: 'center' }}
            >
              <IconComponent size={18} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {currentItems.map((item, index) => {
          const Icon = iconMap[item.icon] || Cpu;
          return (
            <div key={index} className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0, 243, 255, 0.1)',
                  color: 'var(--cyan)',
                  border: '1px solid var(--border-cyan)'
                }}>
                  <Icon size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--purple)', fontWeight: 600 }}>{item.subtitle}</div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '1rem', lineHeight: 1.6 }}>
                {item.summary}
              </p>

              {/* Specs Grid */}
              <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
                {item.specs.map((spec, sIdx) => (
                  <div 
                    key={sIdx} 
                    style={{
                      background: 'rgba(6, 9, 19, 0.6)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      <CheckCircle2 size={15} className="text-cyan" />
                      <span>{spec.label}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {spec.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technician Tip Box */}
              {item.techTips && (
                <div style={{
                  background: 'rgba(168, 85, 247, 0.1)',
                  borderLeft: '4px solid var(--purple)',
                  padding: '1rem 1.25rem',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <Lightbulb size={20} className="text-purple" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--purple)', display: 'block', fontSize: '0.88rem', marginBottom: '0.2rem' }}>
                      PRO TECHNICIAN TIP
                    </strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.techTips}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
