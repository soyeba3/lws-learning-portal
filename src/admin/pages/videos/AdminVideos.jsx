import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../../../components/error/ErrorComponent";
import NotFound from "../../../components/notFound/NotFound";
import { useGetVideosQuery } from "../../../features/admin/videos/VideosApi";
import AdminNavbar from "../../components/adminNavbar/AdminNavbar";
import Spinner from "../../components/spinner/Spinner";
import Video from "../../components/video/Video";

const AdminVideos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  const navigate = useNavigate();

  //Decide what to render
  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (!isLoading && isError) {
    content = <ErrorComponent />;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <NotFound text={"Video"} />;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Video Title</th>
              <th className="table-th">Description</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {videos?.map((item) => (
              <Video key={item.id} item={item} />
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
                onClick={() => navigate("/admin/videos/add")}
                className="btn ml-auto"
              >
                Add Video
              </button>
            </div>
            {content}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminVideos;
