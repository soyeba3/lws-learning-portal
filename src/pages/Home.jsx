import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../admin/components/spinner/Spinner";
import Modal from "../components/modal/Modal";
import Navbar from "../components/navbar/Navbar";
import VideosList from "../components/vidoesList/VideosList";
import { useGetAssignmentMarksQuery } from "../features/admin/assignment-mark/assignmentMarkApi";
import { useGetAdminAssignmentsQuery } from "../features/admin/assignment/assignmentApi";
import { useGetQuizzesMarksQuery } from "../features/admin/quizzes-mark/quizzesMarksApi";
import { useGetQuizzesQuery } from "../features/admin/quizzes/quizzeApi";
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from "../features/admin/videos/VideosApi";

const Home = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth) || {};
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  const { data: assignments } = useGetAdminAssignmentsQuery();
  const { data: assignmentMarks } = useGetAssignmentMarksQuery();
  const { data: video, isLoading: singleVideoLoading } = useGetVideoQuery(id);
  const { data: quizzes } = useGetQuizzesQuery();
  const { data: getQuizzesMarks } = useGetQuizzesMarksQuery() || [];
  const { title, description, url, createdAt } = video || {};
  const [open, setOpen] = useState(false);

  const handleAssignmentClick = () => {
    setOpen(!open);
  };

  // const selectUser =

  const findAssignment = assignments?.find(
    (item) => item?.video_id == video?.id
  );

  const findAssignmentMark = assignmentMarks?.find((item) => {
    if (item?.student_id === user?.id) {
      return item?.assignment_id === findAssignment?.id;
    }
  });

  let assignmentBtn;

  if (findAssignment?.id) {
    assignmentBtn = (
      <button
        onClick={handleAssignmentClick}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        এসাইনমেন্ট
      </button>
    );
  }
  if (findAssignmentMark?.status === "pending") {
    assignmentBtn = (
      <div className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
        Pending
      </div>
    );
  } else if (findAssignmentMark?.status === "published") {
    assignmentBtn = (
      <div className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
        প্রাপ্ত নাম্বার {findAssignmentMark?.mark}
      </div>
    );
  }

  const isQuiz = quizzes?.find((quiz) => quiz.video_id === video?.id);

  const findQuizMark = getQuizzesMarks?.find((quizMark) => {
    if (quizMark?.video_id == video?.id) {
      return quizMark?.student_id === user?.id;
    }
  });

  let quizBtn;

  if (isQuiz) {
    quizBtn = (
      <Link
        to={`/quiz/${id}`}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        কুইজে অংশগ্রহণ করুন
      </Link>
    );
  }
  if (findQuizMark) {
    quizBtn = (
      <div className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
        কুইজ দিয়েছেন
      </div>
    );
  }

  //decide what to render
  let content;

  if (isLoading || singleVideoLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError) {
    content = <div>There was an error occured</div>;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <div>No vidoes found</div>;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = (
      <section className={`py-6 bg-primary relative`}>
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            {video ? (
              <div className="col-span-full w-full space-y-8 lg:col-span-2">
                <iframe
                  width="100%"
                  className="aspect-video"
                  src={url}
                  title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                <div>
                  <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                    {title}
                  </h1>
                  <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                    Uploaded on {moment(createdAt).format("DD MMMM YYYY")}
                  </h2>

                  <div className="flex gap-4">
                    {assignmentBtn}

                    {quizBtn}
                  </div>
                  <p className="mt-4 text-sm text-slate-400 leading-6">
                    {description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="col-span-full w-full space-y-8 lg:col-span-2">
                <div className="not-found">Please select a video</div>
              </div>
            )}
            <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
              {videos.map((item) => (
                <VideosList key={item.id} video={item} />
              ))}
            </div>
          </div>
        </div>
        <Modal
          open={open}
          control={handleAssignmentClick}
          assignment={findAssignment}
        />
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

export default Home;
