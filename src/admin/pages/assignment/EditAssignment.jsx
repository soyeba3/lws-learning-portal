import React from "react";
import EditAssignmentForm from "../../components/assignment/EditAssignmentForm";

const EditAssignment = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <EditAssignmentForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default EditAssignment;
