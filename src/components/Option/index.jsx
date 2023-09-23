import "./style.css";

function Option({ option, index, selectedOption, isCorrect, dispatch, score }) {
  const scoreOfQuestion = isCorrect ? score : 0;
  return (
    <li>
      <button
        className={`option${selectedOption === index && "active"} ${
          isCorrect ? "correct" : "incorrect"
        } `}
        onClick={() =>
          dispatch({ type: "selectItem", payload: { index, scoreOfQuestion } })
        }
      >
        {option}
      </button>
    </li>
  );
}

export default Option;
