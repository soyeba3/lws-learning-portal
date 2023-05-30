import React from "react";
import ErrorComponent from "../../../components/error/ErrorComponent";
import NotFound from "../../../components/notFound/NotFound";
import { useGetAssignmentMarksQuery } from "../../../features/admin/assignment-mark/assignmentMarkApi";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import AssignmentMarkRow from "../../components/assignmentMark/AssignmentMarkRow";
import Spinner from "../../components/spinner/Spinner";

const AssignmentMark = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarksQuery();

  const countPending = assignmentMarks?.filter(
    (item) => item.status === "pending"
  );

  const countMarkSent = assignmentMarks?.filter(
    (item) => item.status === "published"
  );

  // decide what to render

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <NotFound text={"assignment mark"} />;
  } else if (!isLoading && !isError && assignmentMarks.length > 0) {
    content = (
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-3 lg:px-10">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{assignmentMarks?.length}</span>
              </li>
              <li>
                Pending <span>{countPending?.length}</span>
              </li>
              <li>
                Mark Sent <span>{countMarkSent?.length}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Total Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {assignmentMarks.map((item) => (
                    <AssignmentMarkRow key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <AdminNavbar />
      {content}
    </>
  );
};

export default AssignmentMark;
