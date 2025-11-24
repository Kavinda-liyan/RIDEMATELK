import { apiSlice } from "../slices/apiSlice";
import { RATINGS_URL } from "../constants";

export const ratingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all ratings for a vehicle
    getVehicleRatings: builder.query({
      query: (vehicleId) => `${RATINGS_URL}/${vehicleId}`,
      providesTags: (result, error, vehicleId) => [
        { type: "Rating", id: vehicleId },
      ],
      keepUnusedDataFor: 5,
    }),

    // Fetch average rating for a vehicle
    getVehicleAverage: builder.query({
      query: (vehicleId) => `${RATINGS_URL}/average/${vehicleId}`,
      providesTags: (result, error, vehicleId) => [
        { type: "Rating", id: vehicleId },
      ],
    }),

    // Add or update a rating
    addOrUpdateRating: builder.mutation({
      query: ({ vehicleId, rating, review }) => ({
        url: `${RATINGS_URL}`,
        method: "POST",
        body: { vehicleId, rating, review },
      }),
      invalidatesTags: (result, error, { vehicleId }) => [
        { type: "Rating", id: vehicleId },
      ],
    }),
    getAllRatings: builder.query({
      query: () => ({
        url: `${RATINGS_URL}`,
        method: "GET",
      }),
      providesTags: ["Rating"],
    }),
  }),
});

export const {
  useGetVehicleRatingsQuery,
  useGetVehicleAverageQuery,
  useAddOrUpdateRatingMutation,
  useGetAllRatingsQuery,
} = ratingApiSlice;
