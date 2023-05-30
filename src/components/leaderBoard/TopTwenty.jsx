import React from "react";

const TopTwenty = ({ leaderBoard = [] }) => {
  const topTwentyRank = leaderBoard.filter((item) => item.rank <= 20);
  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Top 20 Result</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr className="border-b border-slate-600/50">
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {topTwentyRank?.map((item) => (
            <tr key={item.id} className="border-b border-slate-600/50">
              <td className="table-td text-center">{item.rank}</td>
              <td className="table-td text-center">{item.student_name}</td>
              <td className="table-td text-center">{item.quiz_mark}</td>
              <td className="table-td text-center">{item.assignment_mark}</td>
              <td className="table-td text-center">{item.totalCalMark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTwenty;
