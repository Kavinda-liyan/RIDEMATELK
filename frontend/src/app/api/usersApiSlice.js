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
      query: (data) => {
        const formData = new FormData();
        if (data.username) formData.append("username", data.username);
        if (data.email) formData.append("email", data.email);
        if (data.password) formData.append("password", data.password);
        if (data.profilePicture)
          formData.append("profilePicture", data.profilePicture); // File object
        return {
          url: `${USERS_URL}/profile`,
          method: "PATCH",
          body: formData,
        };
      },
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
} = usersApiSlice;
