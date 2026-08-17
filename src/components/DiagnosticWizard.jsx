import React, { useState } from 'react';
import { diagnosticSymptoms } from '../data/wizardData';
import { softwareList } from '../data/softwareData';
import { 
  Stethoscope, 
  MonitorOff, 
  AlertTriangle, 
  Flame, 
  WifiOff, 
  ChevronRight, 
  CheckSquare, 
  Download, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

const iconMap = {
  MonitorOff, AlertTriangle, Flame, WifiOff
};

export default function DiagnosticWizard({ setActiveTab }) {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (stepNumber) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const handleReset = () => {
    setSelectedSymptom(null);
    setCompletedSteps({});
  };

  return (
    <section>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Stethoscope className="text-green" size={28} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Tech Diagnostic <span className="text-green">Wizard</span></h2>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>
          Interactive step-by-step troubleshooter to diagnose and repair hardware, boot failures, thermals, and network issues.
        </p>
      </div>

      {!selectedSymptom ? (
        /* Symptom Selector Grid */
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>Select the Hardware/Software Issue:</h3>
          <div className="grid-2">
            {diagnosticSymptoms.map((sym) => {
              const Icon = iconMap[sym.icon] || Stethoscope;
              return (
                <div 
                  key={sym.id} 
                  className="glass-card" 
                  style={{ padding: '1.5rem', cursor: 'pointer' }}
                  onClick={() => setSelectedSymptom(sym)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(16, 185, 129, 0.12)',
                      color: 'var(--green)',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <Icon size={26} />
                    </div>
                    <div>
                      <span className="badge badge-green" style={{ fontSize: '0.7rem', marginBottom: '0.3rem' }}>{sym.category}</span>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{sym.title}</h4>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    {sym.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem', color: 'var(--green)', fontWeight: 600, fontSize: '0.9rem' }}>
                    <span>Start Guided Diagnostics</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Step-by-Step Diagnostic View */
        <div>
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>{selectedSymptom.category}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedSymptom.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{selectedSymptom.summary}</p>
              </div>

              <button className="btn btn-outline btn-sm" onClick={handleReset}>
                <RotateCcw size={15} />
                <span>Select Different Issue</span>
              </button>
            </div>
          </div>

          {/* Diagnostic Steps List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {selectedSymptom.steps.map((st) => {
              const isDone = !!completedSteps[st.step];
              return (
                <div 
                  key={st.step} 
                  className="glass-card" 
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderColor: isDone ? 'var(--green)' : 'var(--border)',
                    background: isDone ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <button
                      onClick={() => toggleStep(st.step)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: isDone ? 'var(--green)' : 'var(--text-dim)',
                        cursor: 'pointer',
                        padding: 0,
                        marginTop: '2px'
                      }}
                      title="Mark step completed"
                    >
                      <CheckSquare size={24} />
                    </button>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                        <span style={{ fontWeight: 800, color: isDone ? 'var(--green)' : 'var(--cyan)', fontSize: '0.9rem' }}>
                          STEP {st.step}
                        </span>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-muted)' : 'var(--text-main)' }}>
                          {st.title}
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.93rem', color: isDone ? 'var(--text-dim)' : 'var(--text-muted)', lineHeight: 1.5 }}>
                        {st.action}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommended Diagnostics Software */}
          {selectedSymptom.recommendedTools && (
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Sparkles className="text-purple" size={20} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recommended Diagnostic Software for this Issue:</h4>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {selectedSymptom.recommendedTools.map((toolId) => {
                  const toolObj = softwareList.find(s => s.id === toolId);
                  if (!toolObj) return null;
                  return (
                    <div 
                      key={toolId} 
                      style={{
                        background: 'rgba(6, 9, 19, 0.7)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.85rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        gap: '1rem',
                        flex: 1,
                        minWidth: '220px'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.95rem', display: 'block' }}>{toolObj.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{toolObj.tagline}</span>
                      </div>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setActiveTab('software')}
                      >
                        <Download size={14} />
                        <span>Get Tool</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
