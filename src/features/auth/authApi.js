import apiSlice from "../api/apiSlice";
import { adminLoggedIn, userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
              admin: undefined,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
              admin: undefined,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.user?.role === "student") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
                admin: undefined,
              })
            );
            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
                admin: undefined,
              })
            );
          } else {
            alert("user not found");
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.user.role === "admin") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: undefined,
                admin: result.data.user,
              })
            );
            dispatch(
              adminLoggedIn({
                accessToken: result.data.accessToken,
                user: undefined,
                admin: result.data.user,
              })
            );
          } else {
            alert("Admin not found");
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useAdminLoginMutation } =
  authApi;
