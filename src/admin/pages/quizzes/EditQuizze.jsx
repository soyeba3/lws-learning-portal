import React from "react";
import QuizzeForm from "../../components/quizze/QuizzeForm";

const EditQuizze = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <QuizzeForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default EditQuizze;