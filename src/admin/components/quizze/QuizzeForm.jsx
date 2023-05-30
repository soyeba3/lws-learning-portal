import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAddQuizzeMutation,
  useEditQuizzeMutation,
  useGetQuizzeQuery,
} from "../../../features/admin/quizzes/quizzeApi";
import { useGetVideosQuery } from "../../../features/admin/videos/VideosApi";
import Spinner from "../spinner/Spinner";
import "./QuizzeForm.css";

const QuizzeForm = () => {
  const { id } = useParams();
  const { data: quizze } = useGetQuizzeQuery(id, { skip: !id });
  const navigate = useNavigate();
  const { data: videos } = useGetVideosQuery();
  const [addQuizze, { isLoading, isError, isSuccess }] = useAddQuizzeMutation();
  const [
    editQuize,
    { isLoading: editLoading, isError: editError, isSuccess: editSuccess },
  ] = useEditQuizzeMutation();
  const [error, setError] = useState("");
  const [videoTitle, setVideoTitle] = useState();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { id: 1, option: "", isCorrect: false },
    { id: 2, option: "", isCorrect: false },
    { id: 3, option: "", isCorrect: false },
    { id: 4, option: "", isCorrect: false },
  ]);

  useEffect(() => {
    if (quizze) {
      setVideoTitle(quizze.video_title);
      setQuestion(quizze.question);
      setOptions(quizze.options);
    }
    if (isError || editError) {
      setError("There was an response Error");
    } else if ((!isError || editError) && (isSuccess || editSuccess)) {
      navigate("/admin/quizzes");
    }
  }, [isError, isSuccess, navigate, quizze, editError, editSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const findVideo = videos?.find((video) => video.title === videoTitle);
    if (id) {
      editQuize({
        id,
        data: {
          question,
          video_id: findVideo?.id,
          video_title: findVideo?.title,
          options,
        },
      });
    } else {
      addQuizze({
        question,
        video_id: findVideo?.id,
        video_title: findVideo?.title,
        options,
      });
    }
  };

  return (
    <div className="mx-auto px-5 lg:px-0">
      <div>
        <Link to="/admin">
          <img
            className="h-12 mx-auto"
            src="/assets/image/learningportal.svg"
            alt="Logo"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          {quizze ? "Edit" : "Add"} Quizze
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label className="sr-only">Question</label>
            <input
              name="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="login-input rounded-t-md"
              placeholder="Enter Question"
            />
          </div>

          <div className="video-div">
            <label className="sr-only">Video Title</label>
            <select
              name="videoTitle"
              id="videoTitle"
              className="login-input rounded-t-md"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            >
              <option value="" hidden>
                Select Video
              </option>
              {videos?.map((video) => (
                <option key={video.id} value={video?.video_title}>
                  {video.title}
                </option>
              ))}
            </select>
          </div>

          {/* Option Start */}
          {options?.map((opt, idx) => (
            <div className="option-div" key={idx}>
              <div className="option-input">
                <label className="sr-only">Option {idx + 1}:</label>
                <input
                  type="text"
                  className="login-input rounded-t-md"
                  placeholder={`Option ${idx + 1}`}
                  value={opt.option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx] = {
                      ...newOptions[idx],
                      option: e.target.value,
                    };
                    setOptions(newOptions);
                  }}
                />
              </div>
              <div className="checkbox-div">
                <label className="">Correct Answer:</label>
                <input
                  type="checkbox"
                  className="checkbox"
                  style={{ transform: "scale(1.3)" }}
                  checked={opt.isCorrect}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx] = {
                      ...newOptions[idx],
                      isCorrect: e.target.checked,
                    };
                    setOptions(newOptions);
                  }}
                />
              </div>
            </div>
          ))}

          {/* Option End */}
        </div>

        {error && (
          <div style={{ color: "red" }}>There was an Error occured</div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading || editLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            {isLoading || editLoading ? "Loading" : quizze ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      {(isLoading || editLoading) && <Spinner />}
    </div>
  );
};

export default QuizzeForm;
