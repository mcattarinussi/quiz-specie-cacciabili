import { useState } from 'react';
import { getRandomQuestions } from './questions';
import './App.css';


const questions = getRandomQuestions();


const App = () => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false)
  const [results, setResults] = useState<{ isCorrectAnswer: boolean, userAnswer: string, correctAnswer: string, imageUrl: string }[] | []>([]);

  const { choices, correctAnswer, imageUrl } = questions[activeQuestionIdx];

  const onClickNext = () => {
    setResults(prev => [
      ...prev,
      {
        isCorrectAnswer: selectedAnswer === correctAnswer,
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

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">{activeQuestionIdx + 1}</span>
            <span className="total-question">/{questions.length}</span>
          </div>
          <img src={imageUrl} alt="" style={{maxWidth: '100%'}}/>
          <ul>
            {choices.map((answer: string) => (
              <li
                onClick={() => setSelectedAnswer(answer)}
                key={answer}
                className={selectedAnswer === answer ? 'selected-answer' : ''}>
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button
              onClick={onClickNext}
              disabled={selectedAnswer === ''}>
              {activeQuestionIdx === questions.length - 1 ? 'Fine' : 'Avanti'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Risultato: {questions.length - results.filter(({ isCorrectAnswer }) => !isCorrectAnswer).length} / {questions.length}</h3>
          {results.map(({ isCorrectAnswer, correctAnswer, userAnswer, imageUrl }, questionIdx) => (
             <div>
              <p style={{textDecoration: 'underline'}}>Domanda {questionIdx + 1}</p>
              {isCorrectAnswer ? (
                  <p>La tua risposta: <span style={{color: 'green'}}>{userAnswer}</span></p>
                ) : (
                  <div>
                    <p>La tua risposta: <span style={{color: 'red'}}>{userAnswer}</span></p>
                    <p>Risposta corretta: <span style={{color: 'green'}}>{correctAnswer}</span></p>
                  </div>
                )
              }
              <img src={imageUrl} alt="" style={{maxWidth: '100%'}}/>
            </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default App;