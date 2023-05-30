import moment from "moment/moment";
import React, { useState } from "react";
import { useEditAssignmentMarkMutation } from "../../../features/admin/assignment-mark/assignmentMarkApi";
import { shortenFunc } from "../../../utils/shortenFunc";

const AssignmentMarkRow = ({ item }) => {
  const {
    id,
    title,
    student_name,
    createdAt,
    repo_link,
    status,
    mark,
    totalMark,
  } = item || {};
  const [editAssignmentMark, { isLoading }] = useEditAssignmentMarkMutation(id);
  const [inputValue, setInputValue] = useState(0);

  const createdTime = moment(createdAt).format("DD MMM YYYY, hh:mm:ss a");

  const handleClick = () => {
    if (inputValue > totalMark) {
      alert(`You can't give mark above ${totalMark}`);
    } else if (inputValue < 0) {
      alert(`You can't give negative mark`);
    } else {
      editAssignmentMark({
        id,
        data: {
          ...item,
          mark: Number(inputValue),
          status: "published",
        },
      });
    }
  };

  return (
    <tr>
      <td className="table-td">{shortenFunc(title)}</td>
      <td className="table-td">{createdTime}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{shortenFunc(repo_link)}</td>
      {status === "pending" ? (
        <td className="table-td input-mark">
          <input
            max={totalMark}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <svg
            onClick={handleClick}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </td>
      ) : (
        <td className="flex justify-center">{mark}</td>
      )}
      <td className="table-td" style={{ color: "white" }}>
        {totalMark}
      </td>
    </tr>
  );
};

export default AssignmentMarkRow;
