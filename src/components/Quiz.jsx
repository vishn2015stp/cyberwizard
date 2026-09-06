import React, { useState, useEffect, useCallback } from 'react';
import { fallbackQuizQuestions, decodeHTML, shuffleArray } from '../data/quizData';
import { 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Lightbulb, 
  Globe, 
  Loader2, 
  Zap
} from 'lucide-react';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentRoundScore, setCurrentRoundScore] = useState(0);
  const [cumulativeScore, setCumulativeScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('all');
  const [batchCount, setBatchCount] = useState(1);
  const [isInternetConnected, setIsInternetConnected] = useState(true);

  const fetchQuestions = useCallback(async (selectedDiff = difficulty) => {
    setLoading(true);
    setQuizFinished(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentRoundScore(0);

    try {
      let url = `https://opentdb.com/api.php?amount=10&category=18&type=multiple`;
      if (selectedDiff !== 'all') {
        url += `&difficulty=${selectedDiff}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.response_code === 0 && data.results && data.results.length > 0) {
        const formatted = data.results.map((q, idx) => {
          const decodedQ = decodeHTML(q.question);
          const decodedCorrect = decodeHTML(q.correct_answer);
          const decodedIncorrect = q.incorrect_answers.map(decodeHTML);
          const allOptions = shuffleArray([decodedCorrect, ...decodedIncorrect]);
          const correctIndex = allOptions.indexOf(decodedCorrect);

          return {
            id: `internet-${Date.now()}-${idx}`,
            question: decodedQ,
            options: allOptions,
            correctAnswer: correctIndex,
            explanation: `Correct Answer: "${decodedCorrect}". Category: Science Computers (${q.difficulty.toUpperCase()} level).`,
            source: 'Live Internet API (OpenTDB)',
            difficulty: q.difficulty
          };
        });

        setQuestions(formatted);
        setIsInternetConnected(true);
      } else {
        throw new Error("API limit or no results");
      }
    } catch (err) {
      console.warn("Internet API fetch fallback to local IT question bank:", err);
      setIsInternetConnected(false);
      const shuffledFallback = shuffleArray(fallbackQuizQuestions);
      setQuestions(shuffledFallback);
    } finally {
      setLoading(false);
    }
  }, [difficulty]);

  useEffect(() => {
    fetchQuestions(difficulty);
  }, []);

  const handleDifficultyChange = (newDiff) => {
    setDifficulty(newDiff);
    setBatchCount(1);
    fetchQuestions(newDiff);
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    setTotalAttempted(prev => prev + 1);
    if (selectedOption === currentQ.correctAnswer) {
      setCurrentRoundScore(prev => prev + 1);
      setCumulativeScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleLoadNextBatch = () => {
    setBatchCount(prev => prev + 1);
    fetchQuestions(difficulty);
  };

  return (
    <section style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Info & Control Bar (Fit to Screen Compact Layout) */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <HelpCircle className="text-pink" size={24} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Live Tech <span className="text-pink">Quiz</span></h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={`badge ${isInternetConnected ? 'badge-cyan' : 'badge-amber'}`} style={{ fontSize: '0.75rem' }}>
              <Globe size={13} />
              <span>{isInternetConnected ? '🌐 Live Internet' : '⚡ Local IT Bank'}</span>
            </span>
          </div>
        </div>

        {/* Compact Controls & Stats Bar */}
        <div className="glass-card" style={{ padding: '0.75rem 1.25rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
            
            {/* Difficulty Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Level:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'easy', label: 'Easy' },
                { id: 'medium', label: 'Medium' },
                { id: 'hard', label: 'Hard' }
              ].map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => handleDifficultyChange(diff.id)}
                  className={`btn btn-sm ${difficulty === diff.id ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '0.25rem 0.65rem', fontSize: '0.8rem' }}
                  disabled={loading}
                >
                  {diff.label}
                </button>
              ))}
            </div>

            {/* Score Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Batch: </span>
                <strong className="text-purple">#{batchCount}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Total Answered: </span>
                <strong className="text-cyan">{totalAttempted}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Score: </span>
                <strong className="text-green">{cumulativeScore}</strong>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <Loader2 size={36} className="text-cyan animate-pulse" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem' }}>Fetching Live Questions...</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Connecting to computer science & IT question database...
          </p>
        </div>
      ) : !quizFinished && currentQ ? (
        /* Screen-Optimized Question & Option Container */
        <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
          
          {/* Header Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>Q{currentIndex + 1} of {questions.length}</span>
              {currentQ.difficulty && (
                <span className="badge badge-cyan" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                  {currentQ.difficulty}
                </span>
              )}
            </div>

            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Round Score: <strong className="text-cyan">{currentRoundScore}</strong> / {questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '1rem', overflow: 'hidden' }}>
            <div style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--cyan), var(--purple))',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.4, minHeight: '2.5rem' }}>
            {currentQ.question}
          </h3>

          {/* Options Grid (2x2 Fit to Screen Grid) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
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
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isAnswered ? 'default' : 'pointer',
                    transition: 'var(--transition)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    minHeight: '52px',
                    ...optionStyle
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{optText}</span>
                  </div>

                  {isAnswered && (
                    optIdx === currentQ.correctAnswer ? (
                      <CheckCircle2 className="text-green" size={18} style={{ flexShrink: 0 }} />
                    ) : (selectedOption === optIdx && (
                      <XCircle className="text-pink" size={18} style={{ flexShrink: 0 }} />
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
              borderLeft: '3px solid var(--cyan)',
              padding: '0.65rem 1rem',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem'
            }}>
              <Lightbulb size={18} className="text-cyan" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: 'var(--cyan)', display: 'block', fontSize: '0.8rem', marginBottom: '0.1rem' }}>
                  EXPLANATION & SOURCE
                </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{currentQ.explanation}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            {!isAnswered ? (
              <button 
                className="btn btn-primary btn-sm" 
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                style={{ opacity: selectedOption === null ? 0.5 : 1, cursor: selectedOption === null ? 'not-allowed' : 'pointer' }}
              >
                <span>Submit Answer</span>
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={handleNextQuestion}>
                <span>{currentIndex + 1 === questions.length ? 'See Summary' : 'Next Question'}</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Round Complete Summary */
        <div className="glass-card" style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 0 25px var(--cyan-glow)'
          }}>
            <Award size={32} color="#040914" />
          </div>

          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.35rem' }}>Batch #{batchCount} Completed!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>Round Score Performance:</p>

          <div style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'var(--cyan)',
            marginBottom: '0.75rem',
            textShadow: '0 0 15px var(--cyan-glow)'
          }}>
            {currentRoundScore} / {questions.length}
          </div>

          <div style={{ display: 'inline-flex', justifyContent: 'center', gap: '1.25rem', marginBottom: '1.5rem', background: 'rgba(6,9,19,0.5)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-sm)' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block' }}>Total Cumulative Score</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--green)' }}>{cumulativeScore} / {totalAttempted}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-sm" onClick={handleLoadNextBatch}>
              <Zap size={16} />
              <span>Load Next Internet Batch</span>
            </button>

            <button className="btn btn-outline btn-sm" onClick={() => fetchQuestions(difficulty)}>
              <RotateCcw size={16} />
              <span>Re-try Current Batch</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
