import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../admin/components/spinner/Spinner";
import Navbar from "../components/navbar/Navbar";
import Quiz from "../components/quiz/Quiz";
import { useAddQuizzeMarkMutation } from "../features/admin/quizzes-mark/quizzesMarksApi";
import { useGetQuizzesQuery } from "../features/admin/quizzes/quizzeApi";
import { useGetVideoQuery } from "../features/admin/videos/VideosApi";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "initalize": {
      return action.payload.map(({ id, options }) => {
        return {
          id,
          options: options.map(({ id, isCorrect }) => ({
            id,
            isCorrect,
            selected: false,
          })),
        };
      });
    }

    case "choose": {
      const draft = structuredClone(state);

      const { qid, oid, value } = action.payload;

      for (let { id, options } of draft) {
        if (id == qid) {
          for (let option of options) {
            if (option.id == oid) option.selected = value;
          }
        }
      }

      return draft;
    }

    default:
      return state;
  }
};

// calculate the obtained marks.
const calculateMark = (answers) => {
  const correct = answers.reduce((acc, { options }) => {
    const check = options.every(
      ({ isCorrect, selected }) => isCorrect === selected
    );

    return check ? acc + 1 : acc;
  }, 0);

  const totalQuiz = answers.length;
  const totalMark = totalQuiz * 5;
  const totalCorrect = correct;
  const totalWrong = totalQuiz - correct;
  const mark = totalCorrect * 5;

  return {
    totalQuiz,
    totalMark,
    totalCorrect,
    totalWrong,
    mark,
  };
};

const Quizzes = () => {
  const { id } = useParams();
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery() || [];
  const { data: video } = useGetVideoQuery(id);
  const { user } = useSelector((state) => state.auth);
  const [
    addQuizzeMark,
    { isLoading: quizMarkLoading, isSuccess: submitted, isError: submitError },
  ] = useAddQuizzeMarkMutation();
  const [filterQuiz, setFilterQuiz] = useState([]);
  const navigate = useNavigate();
  const [answers, dispatch] = useReducer(reducer, initialState);

  const chooseOption = (qid, oid, value) => {
    dispatch({ type: "choose", payload: { qid, oid, value } });
  };

  useEffect(() => {
    if (filterQuiz) dispatch({ type: "initalize", payload: filterQuiz });
  }, [filterQuiz]);

  useEffect(() => {
    if (id) {
      const filteredQuizzes = quizzes?.filter(
        (quiz) => quiz?.video_id === video?.id
      );
      setFilterQuiz(filteredQuizzes);
    }
  }, [video, quizzes]);

  const submitQuiz = () => {
    const result = calculateMark(answers);

    const quizMark = {
      ...result,
      student_id: user.id,
      student_name: user.name,
      video_id: filterQuiz[0]["video_id"],
      video_title: filterQuiz[0]["video_title"],
    };

    const confirmation = confirm("Are you sure you want to submit this quiz?");

    if (confirmation) addQuizzeMark(quizMark);
  };

  useEffect(() => {
    if (submitted) {
      navigate("/leaderboard", { replace: true });
    }
  }, [submitted]);

  //Decide what to render
  let content;

  if (isLoading || quizMarkLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError) {
    content = <div>There was an error occured</div>;
  } else if (!isLoading && !isError && filterQuiz?.length === 0) {
    content = (
      <div style={{ textAlign: "center", color: "red" }}>No Quiz Found</div>
    );
  } else if (!isLoading && !isError && filterQuiz?.length > 0) {
    content = (
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for "{video?.title}"</h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">
            {filterQuiz?.map((quiz, index) => (
              <Quiz
                key={quiz.id}
                quiz={quiz}
                index={index}
                chooseOption={chooseOption}
              />
            ))}
          </div>

          <button
            onClick={submitQuiz}
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
          >
            Submit
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <Navbar />

      {content}
    </>
  );
};

export default Quizzes;
