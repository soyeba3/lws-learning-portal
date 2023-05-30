import React from "react";

const Quiz = ({ quiz, index, chooseOption } = {}) => {
  const { id: qid, options, question } = quiz || {};

  return (
    <div className="quiz">
      <h4 className="question">
        Quiz {index + 1} - {question}
      </h4>
      <form className="quizOptions">
        {options?.map(({ id, option }) => (
          <label key={id} htmlFor={`option${id}_q${index + 1}`}>
            <input
              onChange={(e) =>
                chooseOption(chooseOption(qid, id, e.target.checked))
              }
              type="checkbox"
              id={`option${id}_q${index + 1}`}
            />
            {option}
          </label>
        ))}
      </form>
    </div>
  );
};

export default Quiz;
