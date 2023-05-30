import React from "react";
import AddAssignmentForm from "../../components/assignment/AddAssignmentForm";

const AddAssignment = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <AddAssignmentForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default AddAssignment;
