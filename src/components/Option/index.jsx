import "./style.css";

function Option({ option, index, selectedOption, isCorrect, dispatch, score }) {
  return (
    <li className="option-container">
      <button
        className={`option ${selectedOption === index ? "picked" : ""} ${
          selectedOption === null ? "" : isCorrect ? "correct" : "incorrect"
        } `}
        onClick={() =>
          dispatch({ type: "selectItem", payload: { index, score } })
        }
        disabled={selectedOption !== null}
      >
        {option}
      </button>
    </li>
  );
}

export default Option;
