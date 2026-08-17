import React, { useState } from 'react';
import { quizQuestions } from '../data/quizData';
import { HelpCircle, Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = quizQuestions[currentIndex];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <HelpCircle className="text-pink" size={28} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Student & Tech <span className="text-pink">Quiz</span></h2>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>
          Test your computer fundamentals, networking protocols, hardware troubleshooting, and OS knowledge.
        </p>
      </div>

      {!quizFinished ? (
        <div className="glass-card" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {/* Progress Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="badge badge-purple">Question {currentIndex + 1} of {quizQuestions.length}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Current Score: <strong className="text-cyan">{score}</strong> / {quizQuestions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '2rem', overflow: 'hidden' }}>
            <div style={{
              width: `${((currentIndex + 1) / quizQuestions.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--cyan), var(--purple))',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.75rem', lineHeight: 1.4 }}>
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            {currentQ.options.map((optText, optIdx) => {
              let optionStyle = {
                background: 'rgba(6, 9, 19, 0.6)',
                border: '1px solid var(--border)',
                color: 'var(--text-main)'
              };

              if (selectedOption === optIdx) {
                optionStyle.border = '1px solid var(--cyan)';
                optionStyle.background = 'rgba(0, 243, 255, 0.08)';
              }

              if (isAnswered) {
                if (optIdx === currentQ.correctAnswer) {
                  optionStyle.border = '1px solid var(--green)';
                  optionStyle.background = 'rgba(16, 185, 129, 0.15)';
                  optionStyle.color = 'var(--green)';
                } else if (selectedOption === optIdx && selectedOption !== currentQ.correctAnswer) {
                  optionStyle.border = '1px solid var(--pink)';
                  optionStyle.background = 'rgba(236, 72, 153, 0.15)';
                  optionStyle.color = 'var(--pink)';
                }
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isAnswered ? 'default' : 'pointer',
                    transition: 'var(--transition)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    fontWeight: 500,
                    fontSize: '0.98rem',
                    ...optionStyle
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{optText}</span>
                  </div>

                  {isAnswered && (
                    optIdx === currentQ.correctAnswer ? (
                      <CheckCircle2 className="text-green" size={20} />
                    ) : (selectedOption === optIdx && (
                      <XCircle className="text-pink" size={20} />
                    ))
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div style={{
              background: 'rgba(0, 243, 255, 0.08)',
              borderLeft: '4px solid var(--cyan)',
              padding: '1rem 1.25rem',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <Lightbulb size={20} className="text-cyan" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--cyan)', display: 'block', fontSize: '0.88rem', marginBottom: '0.2rem' }}>
                  EXPLANATION
                </strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{currentQ.explanation}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            {!isAnswered ? (
              <button 
                className="btn btn-primary" 
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                style={{ opacity: selectedOption === null ? 0.5 : 1, cursor: selectedOption === null ? 'not-allowed' : 'pointer' }}
              >
                <span>Submit Answer</span>
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNextQuestion}>
                <span>{currentIndex + 1 === quizQuestions.length ? 'See Results' : 'Next Question'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Complete Score Card */
        <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 0 30px var(--cyan-glow)'
          }}>
            <Award size={40} color="#040914" />
          </div>

          <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Quiz Completed!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Here is how you performed on Computer Fundamentals:</p>

          <div style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: 'var(--cyan)',
            marginBottom: '1rem',
            textShadow: '0 0 20px var(--cyan-glow)'
          }}>
            {score} / {quizQuestions.length}
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '2rem' }}>
            {score === quizQuestions.length 
              ? "🌟 Perfect Score! You have mastered Computer Fundamentals & Technician Skills!" 
              : score >= Math.ceil(quizQuestions.length / 2)
              ? "👍 Good Job! You have a solid grasp on fundamentals. Review the guides to get 100%!"
              : "📚 Keep learning! Explore the Fundamentals section and retry the quiz to sharpen your tech skills."}
          </p>

          <button className="btn btn-primary" onClick={handleRestartQuiz}>
            <RotateCcw size={18} />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}
    </section>
  );
}
