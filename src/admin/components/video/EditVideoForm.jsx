import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditVideoMutation,
  useGetVideoQuery,
} from "../../../features/admin/videos/VideosApi";
import Spinner from "../spinner/Spinner";

const EditVideoForm = () => {
  const { id } = useParams();
  const {
    data: video,
    isLoading: getLoading,
    isError: getError,
  } = useGetVideoQuery(id);
  const [editVideo, { isLoading, isError, isSuccess }] = useEditVideoMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setUrl(video.url);
      setViews(video.views);
      setDuration(video.duration);
    }
    if (isError) {
      setError("There was an response Error");
    } else if (!isError && isSuccess) {
      navigate("/admin/videos");
    }
  }, [isError, isSuccess, video, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({
      id,
      data: {
        title,
        description,
        url,
        views,
        duration,
        createdAt: new Date(),
      },
    });
  };

  return (
    <div className="mx-auto px-5 lg:px-0">
      <div>
        <img
          className="h-12 mx-auto"
          src="/assets/image/learningportal.svg"
          alt="Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Video
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              name="title"
              type="text"
              required
              className="login-input rounded-t-md"
              placeholder="Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only">Description</label>
            <textarea
              name="description"
              type="text"
              rows={4}
              required
              className="login-input rounded-t-md"
              placeholder="Video description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only">Video Url</label>
            <input
              name="videoUrl"
              type="text"
              required
              className="login-input rounded-b-md"
              placeholder="Video URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only">Views</label>
            <input
              name="views"
              type="text"
              required
              className="login-input rounded-b-md"
              placeholder="Views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only">Duration</label>
            <input
              name="duration"
              type="text"
              required
              className="login-input rounded-b-md"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div style={{ color: "red" }}>There was an Error occured</div>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Update
          </button>
        </div>
      </form>
      {(isLoading || getLoading) && <Spinner />}
    </div>
  );
};

export default EditVideoForm;
