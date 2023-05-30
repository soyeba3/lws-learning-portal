import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddAssignmentMarkMutation } from "../../features/admin/assignment-mark/assignmentMarkApi";
import "./Modal.css";

const Modal = ({ open, control, assignment }) => {
  const [addAssignmentMark, { isError }] = useAddAssignmentMarkMutation();
  const { user } = useSelector((state) => state.auth) || {};
  const [repo_link, setRepoLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignmentMark({
      student_id: user?.id,
      student_name: user?.name,
      assignment_id: assignment?.id,
      title: assignment?.title,
      createdAt: new Date(),
      totalMark: assignment?.totalMark,
      mark: 0,
      repo_link,
      status: "pending",
    });
    control();
  };
  return (
    open && (
      <div className="parent-div">
        <div className="modal rounded">
          <div>
            <img
              className="h-12 mx-auto"
              src="../assets/image/learningportal.svg"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Submit Assignment
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            method="POST"
          >
            <div className="rounded-md shadow-sm -space-y-px repo-input">
              <div>
                <label htmlFor="name" className="sr-only">
                  Github Repository Link
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={repo_link}
                  onChange={(e) => setRepoLink(e.target.value)}
                  autoComplete="name"
                  required
                  className="login-input rounded-t-md repo-input"
                  placeholder="Enter Github Repository Link"
                />
              </div>
            </div>
            <div className="flex justify-center gap-5">
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={control}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
