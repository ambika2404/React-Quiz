import "./App.css";
import { useState } from "react";

function App() {
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: ["Paris", "Berlin", "Rome", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      questionText: 'Who wrote "To Kill a Mockingbird"?',
      answerOptions: [
        "Harper Lee",
        "F. Scott Fitzgerald",
        "Mark Twain",
        "Jane Austen",
      ],
      correctAnswer: "Harper Lee",
    },
    {
      questionText: "What is the chemical symbol for water?",
      answerOptions: ["H2O", "CO2", "NaCl", "O2"],
      correctAnswer: "H2O",
    },
  ];
  const [selectedAnswer, setSelectedAnswer] = useState(
    Array(questions.length).fill(null)
  );
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  function handleOptionChange(e, index) {
    let updatedSelectedAnswers = [...selectedAnswer];
    updatedSelectedAnswers[index] = e.target.value;
    setSelectedAnswer(updatedSelectedAnswers);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowCorrectAnswer(true);
  }

  function calculateScore() {
    let score = 0;
    selectedAnswer.forEach((ans, index) => {
      if (ans === questions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  }

  function restartQuiz() {
    setSelectedAnswer(Array(questions.length).fill(null));
    setShowCorrectAnswer(false);
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Quiz</h1>
        {questions.map((question, index) => {
          return (
            <div className="questionText">
              <h3>{question.questionText}</h3>
              <div className="answerOptions">
                {question.answerOptions.map((options, optionIndex) => {
                  return (
                    <div>
                      <input
                        type="radio"
                        value={options}
                        id={`question${index}-option${optionIndex}`}
                        name={`question${index}`}
                        checked={selectedAnswer[index] === options}
                        onChange={(e) => {
                          handleOptionChange(e, index);
                        }}
                      />
                      <label>{options}</label>
                    </div>
                  );
                })}
                {showCorrectAnswer &&
                  selectedAnswer[index] !== question.correctAnswer && (
                    <div style={{ color: "red" }}>
                      Correct Answer: {question.correctAnswer}
                    </div>
                  )}
              </div>
            </div>
          );
        })}
        {!showCorrectAnswer && (
          <div className="buttonSection">
            <button>Submit</button>
          </div>
        )}
        {showCorrectAnswer && (
          <div className="scoreSection">
            <div style={{ color: "green" }}>
              Your score is {calculateScore()} out of {questions.length}
            </div>
            <button onClick={restartQuiz}>Restart Quiz</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
