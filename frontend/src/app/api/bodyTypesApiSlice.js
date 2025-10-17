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
  }),
});

export const { useGetBodyTypesQuery } = bodyTypesApiSlice;
