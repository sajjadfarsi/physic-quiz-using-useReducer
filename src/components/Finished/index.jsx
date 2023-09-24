import { useEffect } from "react";
import "./style.css";
function Finished({ score, totalScore, dispatch, bestScore }) {
  useEffect(() => {
    localStorage.setItem(
      "bestScore",
      Math.max(score, +localStorage.getItem("bestScore") || 0)
    );
    dispatch({
      type: "saveLocalStorage",
      payload: localStorage.getItem("bestScore"),
    });
  }, [dispatch, score]);

  return (
    <div className="finished-result">
      <h2>
        نمره شما از {score}،{totalScore} است.({(score / totalScore) * 100}%)
      </h2>
      <h3>بهترین رکورد شما {bestScore} است.</h3>

      <button
        className="nextQ"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        شروع مجدد
      </button>
    </div>
  );
}

export default Finished;
