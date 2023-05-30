import apiSlice from "../../api/apiSlice";

export const quizzesMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzesMarks: builder.query({
      query: () => "/quizMark",
      providesTags: ["QuizMarks"],
    }),
    addQuizzeMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["QuizMarks"],
    }),
  }),
});

export const { useGetQuizzesMarksQuery, useAddQuizzeMarkMutation } =
  quizzesMarksApi;
