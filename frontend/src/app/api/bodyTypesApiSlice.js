import { apiSlice } from "../slices/apiSlice.js";
import { BODY_TYPES_URL } from "../constants.js";

export const bodyTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBodyTypes: builder.query({
      query: () => ({
        url: `${BODY_TYPES_URL}`,
        method: "GET",
      }),
      providesTags: ["BodyType"],
      keepUnusedDataFor: 5,
    }),
    addBodyTypes: builder.mutation({
      query: (formData) => ({
        url: `${BODY_TYPES_URL}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["BodyType"],
    }),
    deleteBodyType: builder.mutation({
      query: (id) => ({
        url: `${BODY_TYPES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BodyType"],
    }),
  }),
});

export const {
  useGetBodyTypesQuery,
  useAddBodyTypesMutation,
  useDeleteBodyTypeMutation,
} = bodyTypesApiSlice;
