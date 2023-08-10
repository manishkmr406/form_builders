import React, { useState } from 'react';
import './McqQuestion.css'

const McqQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const handleQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: e.target.value,
    });
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = e.target.value;

    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    });
  };

  const handleCorrectAnswerChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: parseInt(e.target.value),
    });
  };

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.options.length >= 2) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      });
    }
  };
  const handleDelete=()=>{
    setQuestions([])
  }

  return (
    <div className="mcq-form">
      {questions.map((q, index) => (
        <div className="mcq-question" key={index}>
        <div className='preview-mcq'>
          <h3>{q.question}</h3>
          <button className='delete-btn' onClick={handleDelete}>X</button>
          </div>
          <ol>
            {q.options.map((opt, optIndex) => (
              <li key={optIndex}>{opt}</li>
            ))}
            </ol>
        </div>
      ))}

      <div className="add-question">
        <h3>Add MCQ Question</h3>
        <label>
          Question:
          <input
            type="text"
            value={currentQuestion.question}
            onChange={handleQuestionChange}
          />
        </label>
        <ul>
        <label>Options:</label>
          {currentQuestion.options.map((opt, index) => (
            <li key={index}>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(e, index)}
              />
            </li>
          ))}
        </ul>
        <label>
          Correct Answer:
          <select
            value={currentQuestion.correctAnswer}
            onChange={handleCorrectAnswerChange}
          >
            {currentQuestion.options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button onClick={addQuestion}>Add Question</button>
      </div>
    </div>
  );
};

export default McqQuestion;