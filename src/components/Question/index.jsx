import { useEffect } from "react";
import Option from "../Option";
import "./style.css";

function Question({
  question,
  numOfQuestions,
  dispatch,
  presentQuestionNum,
  totalScores,
  selectedOption,
  score,
  secondsRemaining,
}) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="question-container">
      <div className="q-info">
        <span>
          {numOfQuestions} /{" "}
          {presentQuestionNum >= numOfQuestions
            ? numOfQuestions
            : presentQuestionNum}
        </span>
        <span>
          {totalScores} / {score}({(score / totalScores) * 100})%
        </span>
      </div>
      <div className="question-box">
        <h3>{question.question}</h3>
        <ul className="options">
          {question.options.map((option, index) => {
            return (
              <Option
                key={option}
                dispatch={dispatch}
                selectedOption={selectedOption}
                id={option}
                option={option}
                index={index}
                isCorrect={question.correctOption === index}
                score={question.score}
              />
            );
          })}
        </ul>
      </div>
      <div className="footer-container">
        <button
          className="nextQ"
          onClick={() => {
            if (numOfQuestions === presentQuestionNum) {
              dispatch({ type: "lastQ" });
            } else {
              dispatch({ type: "nextQ" });
            }
          }}
          disabled={selectedOption === null}
        >
          {numOfQuestions === --presentQuestionNum ? "پایان" : "سوال بعد"}
        </button>
        <span>
          {(secondsRemaining) % 60} : {Math.floor(secondsRemaining / 60)}
        </span>
      </div>
    </div>
  );
}

export default Question;
