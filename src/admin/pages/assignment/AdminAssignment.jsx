import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../../../components/error/ErrorComponent";
import NotFound from "../../../components/notFound/NotFound";
import { useGetAdminAssignmentsQuery } from "../../../features/admin/assignment/assignmentApi";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import Assignment from "../../components/assignment/Assignment";
import Spinner from "../../components/spinner/Spinner";

const AdminAssignment = () => {
  const [error, setError] = useState("");
  const {
    data: assignments,
    isLoading,
    isError,
  } = useGetAdminAssignmentsQuery();

  const navigate = useNavigate();

  //decide what to render

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <NotFound text={"Assignment"} />;
  } else if (!isLoading && !isError && assignments?.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Title</th>
              <th className="table-th">Video Title</th>
              <th className="table-th">Mark</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {assignments?.map((assignment) => (
              <Assignment assignment={assignment} key={assignment.id} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                onClick={() => navigate("/admin/assignment/add")}
                className="btn ml-auto"
              >
                Add Assignment
              </button>
            </div>
            {content}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminAssignment;
