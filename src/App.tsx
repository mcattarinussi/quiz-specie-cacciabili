import { useState } from 'react';
import { getRandomQuestions } from './questions';
import { slugify } from './utils';
import './App.css';


const QUESTIONS_COUNT = 10;


const App = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showDifficultySelection, setShowDifficultySelection] = useState(true);
  const [questions, setQuestions] = useState(getRandomQuestions(QUESTIONS_COUNT));
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false)
  const [results, setResults] = useState<{ isCorrectAnswer: boolean, userAnswer: string, correctAnswer: string, imageUrl: string }[] | []>([]);

  const { choices, correctAnswer, imageUrl } = questions[activeQuestionIdx];

  const onClickStart = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultySelection(false);
  };

  const onClickNext = (event: any) => {
    event.preventDefault();
    setResults(prev => [
      ...prev,
      {
        isCorrectAnswer: slugify(selectedAnswer) === slugify(correctAnswer),
        userAnswer: selectedAnswer,
        correctAnswer,
        imageUrl
      }
    ]);

    setSelectedAnswer('');

    if (activeQuestionIdx !== questions.length - 1) {
      setActiveQuestionIdx((prev: number) => prev + 1);
    } else {
      setShowResult(true);
    }
  }

  const onClickRestart = () => {
    setShowResult(false);
    setShowDifficultySelection(true);
    setQuestions(getRandomQuestions(QUESTIONS_COUNT));
    setActiveQuestionIdx(0);
    setSelectedAnswer('');
    setResults([]);
  };

  return (
    <div className="quiz-container">
      {showDifficultySelection &&
        <div>
          <h3>Scegli difficoltà</h3>
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => onClickStart('easy')}>Facile</button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => onClickStart('hard')}>Difficile</button>
            </div>
        </div>
      }
      {!showResult && !showDifficultySelection &&
        <div>
          <div>
            <span className="active-question-no">{activeQuestionIdx + 1}</span>
            <span className="total-question">/{questions.length}</span>
          </div>
          <img src={imageUrl} alt="" style={{ maxWidth: '100%' }} />
          <form onSubmit={onClickNext}>
            {selectedDifficulty === 'easy' ?
              <ul>
                {choices.map((answer: string) => (
                  <li
                    onClick={() => setSelectedAnswer(answer)}
                    key={answer}
                    className={selectedAnswer === answer ? 'selected-answer' : ''}>
                    {answer}
                  </li>
                ))}
              </ul> :
              <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <input style={{ fontSize: 20, width: '100%'}} type="text" placeholder="Scrivi nome qui.." onChange={e => setSelectedAnswer(e.target.value)} value={selectedAnswer}/>
              </div>
            }
            <div className="flex-right">
              <button
                type="submit"
                disabled={selectedAnswer === ''}>
                {activeQuestionIdx === questions.length - 1 ? 'Fine' : 'Avanti'}
              </button>
            </div>
          </form>
        </div>
      }
      {showResult &&
        <div className="result">
          <h3>Risultato: {questions.length - results.filter(({ isCorrectAnswer }) => !isCorrectAnswer).length} / {questions.length}</h3>
          {results.map(({ isCorrectAnswer, correctAnswer, userAnswer, imageUrl }, questionIdx) => (
            <div>
              <p style={{ textDecoration: 'underline' }}>Domanda {questionIdx + 1}</p>
              {isCorrectAnswer ? (
                <p>La tua risposta: <span style={{ color: 'green' }}>{userAnswer}</span></p>
              ) : (
                <div>
                  <p>La tua risposta: <span style={{ color: 'red' }}>{userAnswer}</span></p>
                  <p>Risposta corretta: <span style={{ color: 'green' }}>{correctAnswer}</span></p>
                </div>
              )
              }
              <img src={imageUrl} alt="" style={{ maxWidth: '100%' }} />
            </div>
          ))}
          <div style={{ textAlign: 'center' }}>
            <button style={{ marginTop: '30px' }} onClick={onClickRestart}>Riprova</button>
          </div>
        </div>
      }
    </div>
  )
}

export default App;