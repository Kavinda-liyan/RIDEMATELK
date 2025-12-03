import { apiSlice } from "../slices/apiSlice.js";
import { USERS_URL } from "../constants.js";
import { logout } from "../slices/authSlice.js";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
      provideTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/profile`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    addTrustedBatch: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/trusted/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    removeTrustedBatch: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/untrusted/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddTrustedBatchMutation,
  useRemoveTrustedBatchMutation,
} = usersApiSlice;
