import { useEffect, useReducer } from "react";
import Box from "../Box";
import Header from "../Header";
import Main from "../Main";
import "./App.css";
import Question from "../Question";
import Loader from "../Loader";
import Finished from "../Finished";
import Error from "../Error";

const TIME_OF_QUIZ = 180;
const initialState = {
  status: "loading",
  questions: [],
  question: null,
  score: 0,
  isCorrect: false,
  selectedOption: null,
  bestScore: 0,
  error: null,
  secondsRemaining: TIME_OF_QUIZ,
};
function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return { ...state, status: "loading" };
      case "receiveData":
        return {
          ...state,
          status: "ready",
          questions: action.payload,
        };
      case "start":
        return {
          ...state,
          status: "active",
          question: state.questions[0],
          presentQuestionNum: 1,
        };
      case "selectItem":
        return {
          ...state,
          presentQuestionNum: state.presentQuestionNum++,
          selectedOption: action.payload.index,
          score:
            state.score +
            (action.payload.index === state.question.correctOption
              ? action.payload.score
              : 0),
        };
      case "nextQ":
        return {
          ...state,
          question: state.questions[state.presentQuestionNum - 1],
          selectedOption: null,
        };
      case "lastQ":
        return {
          ...state,
          status: "finished",
        };
      case "restart":
        return { ...initialState, questions: state.questions, status: "ready" };
      case "saveLocalStorage":
        return { ...state, bestScore: action.payload };
      case "error":
        return { ...state, error: action.payload };
      case "timer":
        return { ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status, };
      default:
        throw new Error("something went wrong");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const totalScores = state.questions.reduce(
    (total, question) => total + question.score,
    0
  );
  useEffect(() => {
    function receiveData() {
      dispatch({ type: "loading" });
      fetch("http://localhost:5000/questions")
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            dispatch({ type: "receiveData", payload: data });
          }, 600);
        })
        .catch((err) => {
          dispatch({
            type: "error",
            payload: "مشکلی در گرفتن سوالات بوجود آمده است",
          });
        });
    }
    receiveData();
  }, []);

  return (
    <div className="App">
      <Header />
      {state.status === "ready" && (
        <Main>
          <Box>
            <h2>آیا برای به چالش کشیدن شدن آماده ای؟...</h2>
            <p> اگه میخوای بفهمی در چه سطحی از فیزیک هستی دکمه شروع را بزن</p>
            <button
              onClick={() => {
                dispatch({ type: "start" });
              }}
              className="active"
            >
              شروع
            </button>
          </Box>
        </Main>
      )}

      {state.status === "loading" && <Loader />}

      {state.status === "active" && (
        <Question
          question={state.question}
          dispatch={dispatch}
          numOfQuestions={state.questions.length}
          presentQuestionNum={state.presentQuestionNum}
          totalScores={totalScores}
          selectedOption={state.selectedOption}
          score={state.score}
          secondsRemaining={state.secondsRemaining}
        />
      )}

      {state.status === "finished" && (
        <Finished
          totalScore={totalScores}
          score={state.score}
          dispatch={dispatch}
          bestScore={state.bestScore}
        />
      )}
      {state.status === "error" && <Error error={state.error} />}
    </div>
  );
}

export default App;
