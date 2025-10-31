import { apiSlice } from "../slices/apiSlice";
import { RECOMMENDATION_URL } from "../constants";

export const recommendVehiclesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendations: builder.mutation({
      query: (data) => ({
        url: `${RECOMMENDATION_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Recommendations"],
    }),
  }),
});

export const { useGetRecommendationsMutation } = recommendVehiclesApiSlice;
