import apiSlice from "../../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/quizzes",
      providesTags: ["Quizzes"],
    }),

    getQuizze: builder.query({
      query: (id) => `/quizzes/${id}`,
      providesTags: (result, error, arg) => [{ type: "quizze", id: arg }],
    }),

    addQuizze: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizzes"],
    }),

    editQuizze: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Quizzes",
        { type: "quizze", id: arg.id },
      ],
    }),

    deleteQuizze: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
  }),
});

export const {
  useAddQuizzeMutation,
  useGetQuizzeQuery,
  useEditQuizzeMutation,
  useGetQuizzesQuery,
  useDeleteQuizzeMutation,
} = quizzesApi;
