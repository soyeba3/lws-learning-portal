import apiSlice from "../../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["Videos"],
    }),

    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),

    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.id },
      ],
    }),

    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useEditVideoMutation,
  useAddVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
