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
  Sparkles,
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
    <section>
      {/* Header Info */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HelpCircle className="text-pink" size={28} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Live Tech <span className="text-pink">Quiz</span></h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className={`badge ${isInternetConnected ? 'badge-cyan' : 'badge-amber'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem' }}>
              <Globe size={14} />
              <span>{isInternetConnected ? '🌐 Live Internet Questions' : '⚡ Local IT Bank'}</span>
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)' }}>
          Practice computer science, hardware, networking, and system questions automatically fetched from live internet question sources.
        </p>
      </div>

      {/* Control Bar: Difficulty Filters & Quiz Stats */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Difficulty Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>Difficulty:</span>
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'easy', label: 'Easy' },
              { id: 'medium', label: 'Medium' },
              { id: 'hard', label: 'Hard' }
            ].map((diff) => (
              <button
                key={diff.id}
                onClick={() => handleDifficultyChange(diff.id)}
                className={`btn btn-sm ${difficulty === diff.id ? 'btn-primary' : 'btn-outline'}`}
                disabled={loading}
              >
                {diff.label}
              </button>
            ))}
          </div>

          {/* Cumulative Score Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.9rem' }}>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Batch: </span>
              <strong className="text-purple">#{batchCount}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Total Answered: </span>
              <strong className="text-cyan">{totalAttempted}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Total Score: </span>
              <strong className="text-green">{cumulativeScore}</strong>
            </div>
          </div>

        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <Loader2 size={44} className="text-cyan animate-pulse" style={{ margin: '0 auto 1.5rem auto' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fetching Live Questions from Internet...</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Connecting to global computer science & IT question databases...
          </p>
        </div>
      ) : !quizFinished && currentQ ? (
        /* Question Card */
        <div className="glass-card" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Header Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-purple">Question {currentIndex + 1} of {questions.length}</span>
              {currentQ.difficulty && (
                <span className="badge badge-cyan" style={{ textTransform: 'uppercase' }}>
                  {currentQ.difficulty}
                </span>
              )}
            </div>

            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Round Score: <strong className="text-cyan">{currentRoundScore}</strong> / {questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginBottom: '2rem', overflow: 'hidden' }}>
            <div style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
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
                  EXPLANATION & SOURCE
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
                <span>{currentIndex + 1 === questions.length ? 'See Round Summary' : 'Next Question'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Round Complete Summary */
        <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
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

          <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Batch #{batchCount} Completed!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Round Score Performance:</p>

          <div style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: 'var(--cyan)',
            marginBottom: '1rem',
            textShadow: '0 0 20px var(--cyan-glow)'
          }}>
            {currentRoundScore} / {questions.length}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', background: 'rgba(6,9,19,0.5)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'block' }}>Total Cumulative Score</span>
              <strong style={{ fontSize: '1.2rem', color: 'var(--green)' }}>{cumulativeScore} / {totalAttempted}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={handleLoadNextBatch}>
              <Zap size={18} />
              <span>Load Next Internet Batch</span>
            </button>

            <button className="btn btn-outline" onClick={() => fetchQuestions(difficulty)}>
              <RotateCcw size={18} />
              <span>Re-try Current Batch</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
