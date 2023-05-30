import React from "react";
import Spinner from "../admin/components/spinner/Spinner";
import MyPosition from "../components/leaderBoard/MyPosition";
import TopTwenty from "../components/leaderBoard/TopTwenty";
import Navbar from "../components/navbar/Navbar";
import { useGetAssignmentMarksQuery } from "../features/admin/assignment-mark/assignmentMarkApi";
import { useGetQuizzesMarksQuery } from "../features/admin/quizzes-mark/quizzesMarksApi";

const Leaderborad = () => {
  const { data: assignmentsMarks, isLoading } = useGetAssignmentMarksQuery();
  const { data: quizMarks } = useGetQuizzesMarksQuery();

  const combinedMarks = {};

  // Combine marks from both arrays based on student ID
  assignmentsMarks?.forEach((assignment) => {
    if (!combinedMarks[assignment.student_id]) {
      combinedMarks[assignment.student_id] = {
        id: assignment.id,
        student_id: assignment.student_id,
        student_name: assignment.student_name,
        quiz_mark: 0,
        assignment_mark: 0,
        totalCalMark: 0,
      };
    }
    if (assignment.status === "published") {
      combinedMarks[assignment.student_id].assignment_mark +=
        assignment.mark || 0;
    }
  });

  quizMarks?.forEach((quiz) => {
    if (!combinedMarks[quiz.student_id]) {
      combinedMarks[quiz.student_id] = {
        id: quiz.id,
        student_id: quiz.student_id,
        student_name: quiz.student_name,
        quiz_mark: 0,
        assignment_mark: 0,
        totalCalMark: 0,
      };
    }

    combinedMarks[quiz.student_id].quiz_mark += quiz.mark || 0;
  });

  // Calculate total marks and create leader board
  const leaderBoard = Object.values(combinedMarks).map((student) => ({
    id: student.id,
    student_id: student.student_id,
    student_name: student.student_name,
    quiz_mark: student.quiz_mark,
    assignment_mark: student.assignment_mark,
    totalCalMark: student.quiz_mark + student.assignment_mark,
  }));

  leaderBoard?.sort((a, b) => b.totalCalMark - a.totalCalMark);

  let currentRank = 1;
  let previousMark = null;

  // Assign ranks to the students
  leaderBoard.forEach((student, index) => {
    if (previousMark === null || student.totalCalMark !== previousMark) {
      student.rank = currentRank;
      currentRank++;
    } else {
      student.rank = leaderBoard[index - 1].rank;
    }

    previousMark = student.totalCalMark;
  });

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <MyPosition leaderBoard={leaderBoard} />
          <TopTwenty leaderBoard={leaderBoard} />
        </div>
        {isLoading && <Spinner />}
      </section>
    </>
  );
};

export default Leaderborad;
