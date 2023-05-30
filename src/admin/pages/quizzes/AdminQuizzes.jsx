import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../../../components/error/ErrorComponent";
import NotFound from "../../../components/notFound/NotFound";
import { useGetQuizzesQuery } from "../../../features/admin/quizzes/quizzeApi";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import Quizze from "../../components/quizze/Quizze";
import Spinner from "../../components/spinner/Spinner";

const AdminQuizzes = () => {
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
  const navigate = useNavigate();

  //Decide what to render
  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && quizzes?.length === 0) {
    content = <NotFound text={"Quiz"} />;
  } else if (!isLoading && !isError && quizzes?.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Question</th>
              <th className="table-th">Video</th>
              <th className="table-th justify-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {quizzes.map((item) => (
              <Quizze key={item.id} item={item} />
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
                onClick={() => navigate("/admin/quizzes/add")}
                className="btn ml-auto"
              >
                Add Quiz
              </button>
            </div>
            {content}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminQuizzes;
