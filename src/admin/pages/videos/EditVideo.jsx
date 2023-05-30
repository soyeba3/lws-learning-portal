import React from "react";
import EditVideoForm from "../../components/video/EditVideoForm";

const EditVideo = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <EditVideoForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default EditVideo;
