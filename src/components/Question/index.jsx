import Option from "../Option";
import "./style.css";

function Question({
  question,
  numOfQuestions,
  dispatch,
  presentQuestionNum,
  totalScores,
  selectedOption,
  score
}) {
    const isCorrect = selectedOption == question.correctOption;
  return (
    <div className="question-container">
      <div className="q-info">
        <span>
          {numOfQuestions} / {presentQuestionNum}
        </span>
        <span>{totalScores} / {score}({score/totalScores*100})%</span>
      </div>
      <div className="question-box">
        <h3>{question.question}</h3>
        <ul className="options">
          {question.options.map((option, index) => {
            return (
              <Option
                dispatch={dispatch}
                selectedOption={selectedOption}
                id={option}
                option={option}
                index={index}
                isCorrect={isCorrect}
                score={question.score}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Question;
