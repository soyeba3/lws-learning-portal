import apiSlice from "../../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => "/assignmentMark",
      providesTags: ["AssignmentsMark"],
    }),

    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AssignmentsMark"],
    }),

    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "AssignmentsMark",
        { type: "SingleAssignmentMark", id: arg.id },
      ],
    }),

    // deleteAssignmentMark: builder.mutation({
    //   query: (id) => ({
    //     url: `/assignmentMark/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["AssignmentsMark"],
    // }),
  }),
});

export const {
  useGetAssignmentMarksQuery,
  useAddAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
  useDeleteAssignmentMarkMutation,
} = assignmentMarkApi;
